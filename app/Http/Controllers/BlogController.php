<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class BlogController extends Controller
{
    use AuthorizesRequests;

    // Show all blog posts (public)
    public function index()
    {
        $blogs = Blog::with(['user', 'comments'])->withCount('comments')->latest()->paginate(5);
        return Inertia::render('Frontend/Blog', [
            'blogs' => $blogs
        ]);
    }

    public function homeBlogs()
    {
        $blogs = Blog::latest()->take(3)->get();
        return Inertia::render('Frontend/Home', [
            'blogs' => $blogs
        ]);
    }
    // Show single post by slug (public)
    public function show($slug)
    {
        $blogs = Blog::withCount("comments")->latest()->take(5)->get();

        $blog = Blog::with(['user', 'comments.user'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('Frontend/BlogSingle', [
            'blog' => $blog,
            'blogs' => $blogs
        ]);
    }

    // Show create form (dashboard)
    public function create()
    {
        return Inertia::render('Admin/CreateBlog');
    }

    // Store new blog post
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        // Generate base slug
        $slug = Str::slug($request->title);
        $originalSlug = $slug;

        $counter = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath, // Save the path
            'slug' => $slug,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('blog')->with('success', 'Blog created successfully!');
    }

    // Show edit form (dashboard)
    public function edit(Blog $blog)
    {
        $this->authorize('update', $blog); // optional: check ownership
        return Inertia::render('Blog/Edit', [
            'blog' => $blog
        ]);
    }

    // Update blog post
    public function update(Request $request, Blog $blog)
    {
        $this->authorize('update', $blog);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $blog->update([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->image,
            'slug' => Str::slug($request->title),
        ]);

        return redirect()->route('blog')->with('success', 'Blog updated successfully!');
    }

    // Delete blog post
    public function destroy(Blog $blog)
    {
        $this->authorize('delete', $blog);

        $blog->delete();

        return redirect()->route('blog')->with('success', 'Blog deleted successfully.');
    }
    public function addComment(Request $request, Blog $blog)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $blog->comments()->create([
            'user_id' => Auth::id(),
            'blog_id' => $blog->id,
            'body' => $request->body,
        ]);

        return back();
    }
}
