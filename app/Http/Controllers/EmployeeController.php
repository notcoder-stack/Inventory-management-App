<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::latest()->paginate(5);
        return Inertia::render("Employees", [
            "employees" => $employees,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @param EmployeeRequest $request
     * @return \Illuminate\Http\RedirectResponce
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "address" => "required|string|max:255",
            "email" => "required|string|max:255",
            "department" => "required|string|max:255",
        ]);

        $data = $request->all();

        Employee::create($data);
        return to_route("employees.index");
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
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "address" => "required|string|max:255",
            "email" => "required|string|max:255",
            "department" => "required|string|max:255",
        ]);

        $data = $request->all();

        $employee->update($data);
        return to_route("employees.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return to_route("employees.index");
    }
}
