<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use Inertia\Inertia;

use Illuminate\Http\Request;

class CarsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2025' . date('Y'),
            'price' => 'required|numeric|min:10000',
            'mileage' => 'required|integer|min:0',
            'fuelType' => 'required|string|max:50',
            'transmission' => 'required|string|max:50',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048' // Validate individual files
        ]);


        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('car', 'public'); // Store in storage/app/public/cars
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = json_encode($imagePaths);
        $car = Cars::create($validated);

        return redirect()->route("car.listing")->with('message', 'Car added successfully.');
        // return Inertia::render('User/CarListingForm', [
        //     'message' => 'Car added successfully.'
        // ]);
    }
}
