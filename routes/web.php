<?php

use App\Http\Controllers\CarsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarManagerController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ContactController;
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
})->name("home");

//contact us Routes
Route::get('/contact-us', [ContactController::class, 'index'])->name('contact');
Route::post('/contact-us', [ContactController::class, 'store'])->name('contact.store');

//AI Estimate Price route
Route::get('estimate-price', function () {
    return inertia('User/CarPriceEstimate');
})->name('estimate.price');

// User Routes
Route::middleware(['auth', 'verified'])->prefix("dashboard")->group(function () {

    Route::get('/', function () {
        if (Auth::check() && Auth::user()->role === "admin") {
            return redirect()->route('admin.dashboard');
        } else
            return inertia("Frontend/Dashboard");
    })->name('dashboard');

    //Chat post
    Route::get('/live/chat', [ChatController::class, 'LiveChat'])->name('live.chat');
    Route::post('/send-message', [ChatController::class, 'SendMessage'])->name('chat.store');
    Route::get('/user-all', [ChatController::class, 'GetAllUsers'])->name('chat.users');
    Route::get('/user-message/{id}', [ChatController::class, 'UserMsgById'])->name('chat.messages');
    Route::get('/user-car/{user}', [ChatController::class, 'getUserCar'])->name('user.car');
    //Profile Routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    //Car Listing
    Route::get('list-your-car', [CarsController::class, "create"])->name("car.listing");
    Route::post('list-your-car', [CarsController::class, 'store'])->name('car.store');

    // Route::post('car/update', [CarsController::class, 'update'])->name('car.update');

    //Listed Cars
    Route::get("user/car", [CarsController::class, "edit"])->name("car.edit");
    //Delete Listed Cars
    Route::delete("user/car/{id}", [CarsController::class, "delete"])->name("car.delete");
    //Car Edit Form Page
    Route::get("user/car/edit/{id}", [CarsController::class, "CarEditForm"])->name("car.edit.form");
    //Update Listed Car
    Route::post('user/car/update/{car}', [CarsController::class, 'update'])->name('car.update');
});

//Cars Page
Route::prefix('car')->group(function () {
    Route::get('/', [CarsController::class, 'index'])->name("cars.page");
    Route::get('/compare', [CarsController::class, 'compare'])->name('car.compare');
    Route::get('/{id}', [CarsController::class, 'detail'])->name('car.detail');
});

//Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'AdminDashboard'])->name('admin.dashboard');

    //Manage Users Routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/users', [AdminController::class, 'usersList'])->name('admin.users');
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    });

    //Car Manager Routes
    Route::prefix('manager')->group(function () {
        Route::get('/', [CarManagerController::class, 'index'])->name('manager.index');
        Route::post('/make', [CarManagerController::class, 'storeMake'])->name('manager.storeMake');
        Route::post('/model', [CarManagerController::class, 'storeModel'])->name('manager.storeModel');
        Route::delete('/make/{id}', [CarManagerController::class, 'deleteMake'])->name('manager.deleteMake');
        Route::delete('/model/{id}', [CarManagerController::class, 'deleteModel'])->name('manager.deleteModel');
    });
});

// Auth Routes
require __DIR__ . '/auth.php';
