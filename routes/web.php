<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

// Public Routes
Route::get('/', function () {
    return inertia('Frontend/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("home");

Route::get("/home", function () {
    return inertia("Frontend/Home", [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
});

// User Routes
Route::middleware(['auth', 'verified'])->prefix("dashboard")->group((function () {

    Route::get('/', function () {
        if (Auth::check() && Auth::user()->role === "admin") {
            return redirect()->route('admin.dashboard');
        } else return inertia("Frontend/Dashboard");
    })->name('dashboard');

    //Profile Routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    //Car Listing
    Route::get('list-your-car', function () {
        return inertia('User/CarListingForm');
    })->name("car.listing");
}));

//Car Page
Route::get('car', function () {
    return inertia('Frontend/CarsPage');
})->name("car.page");

//Admin Route
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'AdminDashboard'])->name('admin.dashboard');

    Route::prefix('dashboard')->group(function () {
        Route::get('/users', [AdminController::class, 'usersList'])->name('admin.users');
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    });
});

// Auth Routes
require __DIR__ . '/auth.php';
