<?php

namespace App\Http\Controllers;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CarManagerController extends Controller
{

    public function index()
    {

        $makes = CarMake::with('models')->paginate(5, ['*'], 'makesPage');
        $models = CarModel::with('make')->paginate(5, ['*'], 'modelsPage');

        return inertia('Admin/CarManager', ['makes' => $makes, 'models' => $models]);
    }

    public function storeMake(Request $request)
    {
        $request->merge([
            'name' => ucfirst(strtolower(trim($request->name)))
        ]);

        $request->validate([
            'name' => 'required|string|unique:car_makes,name'
        ], ['name.unique' => 'This car make already exists. Please choose a different name.']);

        CarMake::create($request->only('name'));
        return redirect()->back()->with([
            'message' => 'Car make added successfully!',
            'type' => 'success'
        ]);
    }

    public function storeModel(Request $request)
    {
        $request->merge([
            'name' => ucfirst(strtolower(trim($request->name))),
            'make_name' => ucfirst(strtolower(trim($request->make_name)))
        ]);

        $request->validate([
            'name' => 'required|string|unique:car_models,name',
            'make_name' => ['required', 'string', Rule::exists('car_makes', 'name')],
        ], [
            'name.unique' => 'This car model already exists. Please choose a different name.',
            'make_name.exists' => "The car make doesn't exist."
        ]);

        $make = CarMake::where('name', $request->make_name)->first();

        CarModel::create(['name' => $request->name, 'car_make_id' => $make->id]);

        return redirect()->back()->with([
            'message' => 'Car model added successfully!',
            'type' => 'success'
        ]);
    }

    public function deleteMake($id)
    {
        CarMake::findOrFail($id)->delete();
        return redirect()->back()->with([
            'message' => 'Car make deleted successfully!',
            'type' => 'success'
        ]);
    }

    public function deleteModel($id)
    {
        CarModel::findOrFail($id)->delete();
        return redirect()->back()->with([
            'message' => 'Car model deleted successfully!',
            'type' => 'success'
        ]);
    }
}
