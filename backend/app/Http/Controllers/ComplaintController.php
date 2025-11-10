<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComplaintController extends Controller
{
    /**
     * Get all complaints for the authenticated user
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $complaints = Complaint::where('user_id', $user->id)
            ->with('admin')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'complaints' => $complaints->map(function ($complaint) {
                return [
                    'id' => $complaint->id,
                    'subject' => $complaint->subject,
                    'description' => $complaint->description,
                    'type' => $complaint->type,
                    'status' => $complaint->status,
                    'remarks' => $complaint->remarks,
                    'admin' => $complaint->admin ? [
                        'id' => $complaint->admin->id,
                        'first_name' => $complaint->admin->first_name,
                        'last_name' => $complaint->admin->last_name,
                    ] : null,
                    'created_at' => $complaint->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $complaint->updated_at->format('Y-m-d H:i:s'),
                ];
            }),
        ], 200);
    }

    /**
     * Store a new complaint
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $complaint = Complaint::create([
            'user_id' => $request->user()->id,
            'subject' => $request->subject,
            'description' => $request->description,
            'type' => $request->type,
            'status' => 'submitted',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Complaint submitted successfully',
            'complaint' => [
                'id' => $complaint->id,
                'subject' => $complaint->subject,
                'description' => $complaint->description,
                'type' => $complaint->type,
                'status' => $complaint->status,
                'created_at' => $complaint->created_at->format('Y-m-d H:i:s'),
            ],
        ], 201);
    }

    /**
     * Get a specific complaint
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        
        $complaint = Complaint::where('id', $id)
            ->where('user_id', $user->id)
            ->with('admin')
            ->first();

        if (!$complaint) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'complaint' => [
                'id' => $complaint->id,
                'subject' => $complaint->subject,
                'description' => $complaint->description,
                'type' => $complaint->type,
                'status' => $complaint->status,
                'remarks' => $complaint->remarks,
                'admin' => $complaint->admin ? [
                    'id' => $complaint->admin->id,
                    'first_name' => $complaint->admin->first_name,
                    'last_name' => $complaint->admin->last_name,
                ] : null,
                'created_at' => $complaint->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $complaint->updated_at->format('Y-m-d H:i:s'),
            ],
        ], 200);
    }

    /**
     * Update a complaint (only if status is still 'submitted')
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        
        $complaint = Complaint::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$complaint) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint not found'
            ], 404);
        }

        // Only allow updates if complaint is still in 'submitted' status
        if ($complaint->status !== 'submitted') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot update complaint that is already being processed'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'subject' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $complaint->update($request->only(['subject', 'description', 'type']));

        return response()->json([
            'success' => true,
            'message' => 'Complaint updated successfully',
            'complaint' => [
                'id' => $complaint->id,
                'subject' => $complaint->subject,
                'description' => $complaint->description,
                'type' => $complaint->type,
                'status' => $complaint->status,
                'updated_at' => $complaint->updated_at->format('Y-m-d H:i:s'),
            ],
        ], 200);
    }

    /**
     * Delete a complaint (only if status is still 'submitted')
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        
        $complaint = Complaint::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$complaint) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint not found'
            ], 404);
        }

        // Only allow deletion if complaint is still in 'submitted' status
        if ($complaint->status !== 'submitted') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete complaint that is already being processed'
            ], 403);
        }

        $complaint->delete();

        return response()->json([
            'success' => true,
            'message' => 'Complaint deleted successfully'
        ], 200);
    }
}
