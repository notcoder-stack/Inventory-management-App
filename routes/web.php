<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

Route::resources([
    "products" => ProductController::class,
    "sales" => SaleController::class,
    "suppliers" => SupplierController::class,
    "employees" => EmployeeController::class,
]);

Route::get("/", [DashboardController::class, "index"])->name("dashboard");

Route::post("/products", [ProductController::class, "store"]);
Route::get("/products", [ProductController::class, "index"])->name(
    "products.index"
);

Route::delete("/products/{product}", [ProductController::class, "destroy"]);
Route::put("/products/{product}", [ProductController::class, "update"]);

Route::get("/employees", [EmployeeController::class, "index"])->name(
    "employees.index"
);

Route::delete("/employees/{employee}", [EmployeeController::class, "destroy"]);

Route::put("/employees/{employee}", [EmployeeController::class, "update"]);

Route::post("/employees", [EmployeeController::class, "store"]);
