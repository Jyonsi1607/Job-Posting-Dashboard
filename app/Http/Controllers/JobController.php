<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Job::all();
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
        //
        $data = $request->validate([
            'title' => 'required|string',
            'type' => 'required|in:Full Time,Part Time,Internship',
            'status' => 'required|in:Active,Expired,Draft',
            'applications' => 'integer',
            'duration' => 'required|string',
            'description' => 'required|string',
        ]);
        return Job::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        //
        return $job;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Job $job)
    {
        //
        $data = $request->validate([
            'title' => 'string',
            'type' => 'in:Full Time,Part Time,Internship',
            'status' => 'in:Active,Expired,Draft',
            'applications' => 'integer',
            'duration' => 'string',
            'description' => 'string',
        ]);
        $job->update($data);
        return $job;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        //
        $job->delete();
        return response()->noContent();
    }

    public function dashboard(): JsonResponse
    {
        $stats = [
            'open_jobs' => Job::where('status', 'Active')->count(),
            'saved_candidates' => 2, // Static for demo
            'pending_jobs' => Job::where('status', 'Draft')->count(),
            'active_jobs' => Job::where('status', 'Active')->count(),
            'highlight_jobs' => 8, // Static for demo
            'featured_jobs' => 10, // Static for demo
            'profile_views' => 1500 // Static for demo
        ];

        return response()->json($stats);
    }
}
