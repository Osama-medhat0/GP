<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function AdminDashboard()
    {
        return inertia('Frontend/Dashboard');
    }

    public function usersList()
    {
        $users = User::paginate(5);
        return Inertia::render('Admin/UsersTable', [
            'users' => $users
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with([
            'message' => 'User deleted successfully.',
            'type' => 'success' // Can be success, error, info, warning]);
        ]);
    }
}
