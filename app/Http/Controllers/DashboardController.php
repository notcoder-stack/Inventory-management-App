<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::count();
        $sales = Sale::count();
        $employees = Employee::count();
        $revenue = Sale::sum("revenue");

        return Inertia::render("Dashboard", [
            "products" => $products,
            "sales" => $sales,
            "employees" => $employees,
            "revenue" => $revenue,
        ]);
    }
}
