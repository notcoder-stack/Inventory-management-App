<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

Route::resources([
    "products" => ProductController::class,
    "sales" => SaleController::class,
    "suppliers" => SupplierController::class,
    "employees" => EmployeeController::class,
]);

Route::get("/dashboard", [DashboardController::class, "index"])->name(
    "dashboard"
);

Route::post("/products", [ProductController::class, "store"]);
Route::get("/products", [ProductController::class, "index"])->name(
    "products.index"
);

Route::delete("/products/{product}", [ProductController::class, "destroy"]);
Route::put("/products/{product}", [ProductController::class, "update"]);

Route::get("/employees", [EmployeeController::class, "index"])->name(
    "employees.index"
);

Route::get("/suppliers", [SupplierController::class, "index"])->name(
    "suppliers.index"
);

Route::delete("/employees/{employee}", [EmployeeController::class, "destroy"]);

Route::put("/employees/{employee}", [EmployeeController::class, "update"]);

Route::post("/employees", [EmployeeController::class, "store"]);

Route::post("/suppliers", [SupplierController::class, "store"]);

Route::put("/suppliers/{supplier}", [SupplierController::class, "update"]);

Route::delete("/suppliers/{supplier}", [SupplierController::class, "destroy"]);

Route::get("/sales", [SaleController::class, "index"])->name("sales.index");

Route::post("/sales", [SaleController::class, "store"]);

Route::put("/sales/{sale}", [SaleController::class, "update"]);

Route::delete("/sales/{sale}", [SaleController::class, "destroy"]);

Route::get("/settings", [SettingsController::class, "index"])->name(
    "settings.index"
);

Route::get("/", [HomePageController::class, "index"]);

Route::get("/register", [RegisterController::class, "index"]);

Route::post("/register", [RegisterController::class, "store"])->name(
    "register"
);

Route::get("/login", [LoginController::class, "index"]);

Route::post("/login", [LoginController::class, "store"])->name("login");
