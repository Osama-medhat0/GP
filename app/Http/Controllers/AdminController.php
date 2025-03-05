<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{

    public function AdminDashboard()
    {
        return inertia('Frontend/Dashboard');
    }

    public function usersList()
    {
        return Inertia::render('Frontend/Dashboard', [
            'users' => User::all()
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with('message', 'User deleted successfully.');
    }
}
