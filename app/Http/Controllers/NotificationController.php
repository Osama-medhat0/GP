<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\DatabaseNotification;


class NotificationController extends Controller
{
    public function markAsRead(Request $request)
    {

        try {
            $user = Auth::user();

            $notificationIds = $request->input('notification_ids');

            if (!$notificationIds || !is_array($notificationIds)) {
                return response()->json(['error' => 'Invalid or missing notification IDs'], 400);
            }

            // FIXED: Use the relationship as a query builder
            DatabaseNotification::whereIn('id', $notificationIds)
                ->where('notifiable_id', $user->id)
                ->update(['read_at' => now()]);

            return response()->json(['status' => 'Notifications marked as read']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
