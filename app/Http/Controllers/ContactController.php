<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function index()
    {
        return inertia("Frontend/contactUs");
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        Contact::create($request->all());
        return redirect()->back()->with([
            'message' => 'Message sent successfully!',
            'type' => 'success' // Can be success, error, info, warning]);
        ]);
    }
}
