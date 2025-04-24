<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id', 'blog_id', 'body'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    // A comment may have many replies (children)
    // public function children()
    // {
    //     return $this->hasMany(Comment::class, 'parent_id')->with('children', 'user');
    // }

    // // A comment may be a reply to another comment
    // public function parent()
    // {
    //     return $this->belongsTo(Comment::class, 'parent_id');
    // }
}
