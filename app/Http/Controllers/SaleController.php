<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::latest()->paginate(5);
        return Inertia::render("Sales", ["sales" => $sales]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "productName" => "required|string|max:255",
            "quantity" => "required|integer|min:1",
            "price" => "required|integer|min:0",
            "revenue" => "required|integer|min:1",
            "date" => "required|date",
        ]);

        $data = $request->all();

        Sale::create($data);
        return to_route("sales.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        $request->validate([
            "productName" => "required|string|max:255",
            "quantity" => "required|integer|min:1",
            "price" => "required|integer|min:0",
            "revenue" => "required|integer|min:1",
            "date" => "required|date",
        ]);

        $data = $request->all();

        $sale->update($data);

        return to_route("sales.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();

        return to_route("sales.index");
    }
}
