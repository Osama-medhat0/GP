<?php

namespace App\Http\Controllers;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;

class CarManagerController extends Controller
{

    public function index()
    {

        $makes = CarMake::with('models')->get();
        $models = CarModel::with('make')->get();
        return inertia('Admin/CarManager', ['makes' => $makes, 'models' => $models]);
    }

    public function storeMake(Request $request)
    {

        if (CarMake::where('name', $request->name)->exists()) {
            return redirect()->back()->withErrors(['newMake' => 'This car make already exists.']);
        }

        $request->validate([
            'name' => 'required|string|unique:car_makes,name'
        ], ['name.unique' => 'This car make already exists. Pllease choose a different name.']);

        CarMake::create($request->only('name'));
        return redirect()->route("manager.index");
    }

    public function storeModel(Request $request)
    {
        if (CarModel::where('name', $request->name)->exists()) {
            return redirect()->back()->withErrors(['newModel' => 'This car model already exists.']);
        }

        $request->validate([
            'name' => 'required|string|unique:car_models,name',
            'car_make_id' => 'required|exists:car_makes,id'
        ], ['name.unique' => 'This car model already exists. Pllease choose a different name.']);

        CarModel::create($request->only('name', 'car_make_id'));
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
