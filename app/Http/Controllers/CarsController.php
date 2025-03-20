<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CarsController extends Controller
{
    public function index()
    {
        $cars = Cars::latest()->paginate(5);

        $cars->getCollection()->transform(function ($car) {
            $car->images = json_decode($car->images);
            $car->images = array_map(fn($img) => asset("storage/{$img}"), $car->images);
            return $car;
        });
        return inertia("Frontend/CarsPage", ['cars' => $cars]);
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
                $path = $image->store('car', 'public'); // Store in storage/app/public/car
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = json_encode($imagePaths);

        $car = $request->user()->cars()->create($validated);

        return redirect()->route("car.listing")->with('message', 'Car added successfully.');
    }

    public function update(Request $request, Cars $car)
    {
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
            'images.*' => 'image|mimes:jpg,jpeg,png|max:2048'
        ]);


        if ($validator->fails()) {
            dd("Validation Failed", $validator->errors()->all());
        }

        $validated = $validator->validated(); // Now extract the validated data

        // decode existing images into arry
        $existingImages = json_decode($car->images, true) ?? [];

        // If new images are uploaded, delete old ones and update
        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($existingImages as $oldImage) {
                $oldImagePath = storage_path('app/public/' . $oldImage); // conver path to actual file loc
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath); //delete file
                }
            }

            // Upload new images
            $newImages = [];
            foreach ($request->file('images') as $file) {
                $path = $file->store('car', 'public'); // Save relative path
                $newImages[] = $path;
            }

            // converts new image paths array into a JSON string
            $validated['images'] = json_encode($newImages);
        } else {
            // Keep existing images
            $validated['images'] = $car->images; // No need for json_encode
        }

        $car->update($validated);

        return redirect()->route("car.edit.form")->with("message", "Car updated successfully.");
    }



    public function CarEditForm()
    {
        $carMakes = CarMake::all();
        $model = CarModel::all();

        $userId = Auth::id();

        $cars = Cars::where('user_id', $userId)->get()->map(function ($car) {
            $car->images = json_decode($car->images, true) ?? []; // Decode JSON images

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

        $cars = Cars::where('user_id', $userId)->get()->map(function ($car) {
            $car->images = json_decode($car->images, true) ?? []; // Decode JSON images

            // Generate full URLs for images
            $car->image_urls = array_map(fn($image) => asset('storage/' . $image), $car->images);

            return $car;
        });

        if ($cars->isEmpty()) {
            return redirect()->back()->with('message', 'No cars found.');
        }

        return inertia("User/UserCarsPage", ['cars' => $cars]);
    }


    public function delete($id)
    {

        $car = Cars::findOrFail($id);
        $car->delete();
        return  inertia("User/UserCarsPage");
    }
}
