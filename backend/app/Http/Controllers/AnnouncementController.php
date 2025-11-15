<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the announcements.
     */
    public function index()
    {
        $announcements = Announcement::with(['author:id,first_name,last_name'])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($announcement) => $this->formatAnnouncement($announcement));

        return response()->json([
            'success' => true,
            'announcements' => $announcements,
        ], 200);
    }

    /**
     * Store a newly created announcement.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Only administrators can create announcements.',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $announcement = Announcement::create([
            'title' => $request->title,
            'description' => $request->description,
            'author_id' => $user->id,
        ]);

        $announcement->load('author:id,first_name,last_name');

        return response()->json([
            'success' => true,
            'message' => 'Announcement posted successfully.',
            'announcement' => $this->formatAnnouncement($announcement),
        ], 201);
    }

    /**
     * Shape the announcement payload for responses.
     */
    protected function formatAnnouncement(Announcement $announcement): array
    {
        return [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'description' => $announcement->description,
            'author' => $announcement->author ? [
                'id' => $announcement->author->id,
                'first_name' => $announcement->author->first_name,
                'last_name' => $announcement->author->last_name,
            ] : null,
            'created_at' => $announcement->created_at?->format('c'),
            'updated_at' => $announcement->updated_at?->format('c'),
        ];
    }
}
