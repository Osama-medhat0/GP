<?php

namespace App\Http\Controllers;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;

class CarManagerController extends Controller
{

    public function index()
    {

        $makes = CarMake::with('models')->paginate(5, ['*'], 'makesPage');
        $models = CarModel::with('make')->paginate(3, ['*'], 'modelsPage');

        return inertia('Admin/CarManager', ['makes' => $makes, 'models' => $models]);
    }

    public function storeMake(Request $request)
    {
        $request->merge([
            'name' => ucfirst(strtolower(trim($request->name)))
        ]);

        if (CarMake::where('name', $request->name)->exists()) {
            return redirect()->back()->withErrors(['newMake' => 'This car make already exists.']);
        }

        $request->validate([
            'name' => 'required|string|unique:car_makes,name'
        ], ['name.unique' => 'This car make already exists. Please choose a different name.']);

        CarMake::create($request->only('name'));
        return redirect()->route("manager.index");
    }


    public function storeModel(Request $request)
    {
        $request->merge([
            'name' => ucfirst(strtolower(trim($request->name))),
            'make_name' => ucfirst(strtolower(trim($request->make_name)))
        ]);

        $request->validate([
            'name' => 'required|string|unique:car_models,name',
            'make_name' => 'required|string|exists:car_makes,name'
        ], [
            'name.unique' => 'This car model already exists. Please choose a different name.',
            'make_name.exists' => "The car make doesn't exist."
        ]);

        if (CarModel::where('name', $request->name)->exists()) {
            return redirect()->back()->withErrors(['newModel' => 'This car model already exists.']);
        }

        $make = CarMake::where('name', $request->make_name)->first();

        CarModel::create(['name' => $request->name, 'car_make_id' => $make->id]);

        return redirect()->route("manager.index");
    }

    public function deleteMake($id)
    {
        CarMake::findOrFail($id)->delete();
        return redirect()->route('manager.index');
    }

    public function deleteModel($id)
    {
        CarModel::findOrFail($id)->delete();
        return redirect()->route('manager.index');
    }
}
