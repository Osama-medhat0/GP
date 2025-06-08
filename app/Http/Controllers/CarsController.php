<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CarsController extends Controller
{
    public function index()
    {
        $carMakes = CarMake::all();
        $carModels = CarModel::all();
        $cars = Cars::latest()->paginate(16);

        $cars->getCollection()->transform(function ($car) {
            $car->images = json_decode($car->images);
            $car->images = array_map(fn($img) => asset("storage/{$img}"), $car->images);
            return $car;
        });
        return inertia("Frontend/CarsPage", ['cars' => $cars, 'carMakes' => $carMakes, 'carModels' => $carModels]);
    }

    public function create()
    {
        $makes = CarMake::all();
        $models = CarModel::all();

        return inertia("User/CarListingForm", ["carMakes" => $makes, "carModels" => $models]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2025',
            'price' => 'required|numeric|min:10000|max:50000000',
            'mileage' => 'required|integer|min:0',
            'fuelType' => 'required|string|max:50',
            'transmission' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'images.*' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('car', 'public');
                $imagePaths[] = $path;
            }
        }
        $validated['images'] = json_encode($imagePaths);

        // Call price prediction API
        $response = Http::post(env('PRICE_PREDICTION_API'), [
            'make' => $validated['make'],
            'year' => $validated['year'],
            'mileage' => $validated['mileage'],
            'fuelType' => $validated['fuelType'],
            'transmission' => $validated['transmission'],
            'seller_type' => $validated['seller_type'] ?? 'Individual',
        ]);

        if ($response->successful() && isset($response->json()['predicted_price'])) {

            $predictedPrice = $response->json()['predicted_price'];
            $priceStatus = 'lower';

            $confirmedOverpriced = filter_var($request->input('confirmed_overpriced'), FILTER_VALIDATE_BOOLEAN);

            // Determine price status (overpriced or lower)
            if ($validated['price'] > $predictedPrice * 1.1 && !$confirmedOverpriced) {
                return redirect()->back()->with([
                    'flash' => [
                        'type' => 'warning',
                        'message' => "Your price is significantly higher than our AI-predicted price of " . number_format($predictedPrice) . ". Click again to confirm listing.",
                        'price_status' => 'overpriced',
                    ],
                    'predicted_price' => $predictedPrice,
                ]);
            }

            if ($validated['price'] >= $predictedPrice * 1.1 && $confirmedOverpriced) {
                $priceStatus = 'overpriced';
            } elseif ($validated['price'] === $predictedPrice * 1.1) {
                $priceStatus = 'fair';
            } else {
                if (!$confirmedOverpriced) {

                    $priceStatus = "lower";
                    // dd($priceStatus);
                    return redirect()->back()->with([
                        'flash' => [
                            'type' => 'warning',
                            'message' => "Your price is lower than our AI-predicted price of " . number_format($predictedPrice) . ". Click again to confirm listing.",
                            'price_status' => 'lower',
                        ],
                        'predicted_price' => $predictedPrice,
                    ]);
                }
            }
            // dd($priceStatus);
            // dd($request->all());

            if ($request->input('use_ai_price') === 'true' || $confirmedOverpriced) {
                // Create car listing

                if ($request->input('use_ai_price') === 'true') {
                    $price = $predictedPrice;
                    $priceStatus = 'fair';
                } else {
                    $price = $validated['price'];
                    // $priceStatus remains as already determined
                }

                $car = Cars::create([
                    ...$validated,
                    'user_id' => Auth::id(),
                    'price' => $price,
                    'predicted_price' => $predictedPrice,
                    'price_status' => $priceStatus,
                ]);

                if ($priceStatus === "lower") {
                    $message = "Car listed at a lower price than the AI-predicted price of " . number_format($predictedPrice) . ".";
                    // dd($priceStatus);
                } elseif ($priceStatus === 'overpriced') {
                    $message = "Car listed as 'overpriced' despite being higher than the AI-predicted price of " . number_format($predictedPrice) . ".";
                } else {
                    $message = "Car listed using the AI-predicted price of " . number_format($predictedPrice) . ".";
                    // dd($priceStatus);
                }

                // Flash message
                $flash = [
                    'type' => $priceStatus === 'overpriced' ? 'warning' : 'success',
                    'message' => $message,
                    'price_status' => $priceStatus,
                ];

                return redirect()->route('car.edit')->with('flash', $flash);
            }
        }

        return redirect()->back()->withErrors(['error' => 'Price prediction service is unavailable.']);
    }

    public function update(Request $request, Cars $car)
    {
        // deecode JSON string if it's sent as a string
        if ($request->has('deletedImages') && is_string($request->deletedImages)) {
            $request->merge(['deletedImages' => json_decode($request->deletedImages, true)]);
        }

        $validator = Validator::make($request->all(), [
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2025',
            'price' => 'required|numeric|min:10000|max:50000000',
            'mileage' => 'required|integer|min:0',
            'fuelType' => 'required|string|max:50',
            'transmission' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'deletedImages' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $validated = $validator->validated();

        $existingImages = json_decode($car->images, true) ?? [];

        // Handle removed images
        if ($request->has('deletedImages')) {
            $deletedImages = $request->input('deletedImages');

            // Convert full URLs to relative storage paths
            $deletedPaths = array_map(function ($image) {
                return str_replace(asset('storage') . '/', '', $image);
            }, $deletedImages);

            //Remove images fom the datbase list
            $existingImages = array_filter($existingImages, function ($image) use ($deletedPaths) {
                return !in_array($image, $deletedPaths);
            });

            foreach ($deletedPaths as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('car', 'public');
                $imagePaths[] = $path;
            }
        }

        $finalImages = array_merge($existingImages, $imagePaths);

        $validated['images'] = json_encode(array_values($finalImages)); // array_values Reset array keys after array_filters 0, 2 to 0 , 1

        $car->update($validated);
        return redirect()->back()->with([
            'message' => 'Car has been updated!',
            'type' => 'success'
        ]);
    }

    public function CarEditForm($id)
    {
        $carMakes = CarMake::all();
        $model = CarModel::all();

        $userId = Auth::id();

        $cars = Cars::where('id', $id)->where('user_id', $userId)->get()->map(function ($car) {
            $car->images = json_decode($car->images, true) ?? []; // Decode JSON images into an arrayy

            // Generate full URLs for images
            $car->image_urls = array_map(fn($image) => asset('storage/' . $image), $car->images);

            return $car;
        });

        if ($cars->isEmpty()) {
            return redirect()->route("dashboard")->with('message', 'No cars found.');
        }

        return inertia("User/CarEditForm", ["car" => $cars, "carMakes" => $carMakes, "carModels" => $model]);
    }

    public function edit()
    {
        $userId = Auth::id();

        $cars = Cars::where('user_id', $userId)->orderBy('created_at', 'desc')->get()->map(function ($car) {
            $car->images = json_decode($car->images, true) ?? []; // Decode JSON images

            // Generate full URLs for images
            $car->image_urls = array_map(fn($image) => asset('storage/' . $image), $car->images);

            return $car;
        });

        // if ($cars->isEmpty()) {
        //     return redirect()->back()->with('message', 'No cars found.');
        // }

        return inertia("User/UserCarsPage", ['cars' => $cars]);
    }

    public function delete($id)
    {
        $car = Cars::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $car->delete();
        return redirect()->back()->with([
            'message' => 'Car has been deleted!',
            'type' => 'success' // Can be success, error, info, warning]);
        ]);
    }

    public function compare(Request $request)
    {
        $carIds = $request->input('cars', []);

        if (!is_array($carIds) || count($carIds) < 2) {
            return redirect()->back()->with('error', 'Select at least two cars to compare.');
        }

        $cars = Cars::whereIn('id', $carIds)->get();

        return inertia('User/CarComparison', ['cars' => $cars]);
    }

    public function detail($id)
    {
        $car = Cars::with('user')->findOrFail($id);
        // dd($car);

        return inertia('User/CarDetails', ['car' => $car->toArray()]);
    }

    public function featured()
    {
        return Cars::latest()->take(4)->get();
    }

    public function search(Request $request)
    {
        $carMakes = CarMake::all();
        $carModels = CarModel::all();

        $query = Cars::query();

        if ($request->make) {
            $query->where('make', $request->make);
        }

        if ($request->model) {
            $query->where('model', $request->model);
        }

        if ($request->year_min) {
            $query->where('year', '>=', $request->year_min);
        }
        if ($request->year_max) {
            $query->where('year', '<=', $request->year_max);
        }


        if ($request->price_min) {
            $query->where('price', '>=', $request->price_min);
        }
        if ($request->price_max) {
            $query->where('price', '<=', $request->price_max);
        }

        if ($request->mileage_min) {
            $query->where('mileage', '>=', $request->mileage_min);
        }
        if ($request->mileage_max) {
            $query->where('mileage', '<=', $request->mileage_max);
        }


        if ($request->transmission) {
            $query->where('transmission', $request->transmission);
        }


        $cars = $query->latest()->paginate(5);
        return inertia("Frontend/CarsPage", ['cars' => $cars, 'carMakes' => $carMakes, 'carModels' => $carModels]);
    }
}
