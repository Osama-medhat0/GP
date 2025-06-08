<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\ChatMessage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Notifications\NewMessageNotification;

class ChatController extends Controller
{
    public function SendMessage(Request $request)
    {
        $request->validate([
            'msg' => 'required',
            'receiver_id' => 'required|exists:users,id',  // Add validation for receiver
        ]);

        ChatMessage::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $request->receiver_id,
            'msg' => $request->msg,
            'created_at' => Carbon::now()
        ]);


        //Send notification to the user
        $receiver = User::find($request->receiver_id);

        if ($receiver && $receiver->email) {
            $receiver->notify(new NewMessageNotification(Auth::user()));
        }

        return redirect()->back()->with([
            'message' => 'Message sent succesfully',
            'type' => 'success'
        ]);
    }

    public function UserMsgById($userId)
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $messages = ChatMessage::where(function ($query) use ($userId) {
                $query->where('sender_id', Auth::id())
                    ->where('receiver_id', $userId);
            })->orWhere(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->where('receiver_id', Auth::id());
            })->orderBy('created_at', 'asc')->get();

            return response()->json(['messages' => $messages]);
        } catch (\Exception $e) {
            Log::error("Chat Error: " . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }


    public function LiveChat(Request $request)
    {
        $users = $this->GetAllUsers();
        $selectedUser = null;
        $car = null;

        if ($request->has('car')) {
            $car = Cars::find($request->car);
        }

        if ($request->has('user_id')) {
            $seller = User::find($request->user_id);

            // Set the selected user
            $selectedUser = $seller;
        }

        // Check if there is an old selectedUser (to clear it if necessary)
        if ($selectedUser && $selectedUser->id === Auth::user()->id) {
            $selectedUser = null;  // Reset selectedUser if it's the authenticated user
        }

        $unreadNotifications = Auth::user()->unreadNotifications->where('type', NewMessageNotification::class);

        return inertia("User/Chat", ['users' => $users, 'selectedUser' => $selectedUser, 'selectedCar' => $car, 'unreadNotifications' => $unreadNotifications]);
    }



    public function GetAllUsers()
    {
        $authUser = Auth::user();

        // Fetch chat messages involving the current user
        $chats = ChatMessage::with(['sender', 'receiver'])
            ->orderBy('id', 'DESC')
            ->where('sender_id', $authUser->id)
            ->orWhere('receiver_id', $authUser->id)
            ->get();

        // Collect unique users from chat messages
        $users = $chats->flatMap(function ($chat) {
            return [$chat->sender, $chat->receiver];
        })->filter()->unique('id')->filter(function ($user) use ($authUser) {
            return $user->id !== $authUser->id; // Exclude self
        });

        // Always include the admin user
        $admin = User::where('role', 'admin')->first(); // Make sure your admin has a 'role' column or another identifier

        if ($admin && $admin->id !== $authUser->id) {
            $users->prepend($admin);
            $users = $users->unique('id');
        }

        return $users->values(); // Reset keys
    }


    public function getUserCar(User $user)
    {
        $cars = $user->cars;
        // dd($cars);
        if ($cars) {
            return response()->json([
                'cars' => $cars,
                'type' => 'success'
            ]);
        }
        return response()->json([
            'message' => 'No cars found for this user',
            'type' => 'error'
        ]);
    }
}
