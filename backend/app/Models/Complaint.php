<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Complaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
        'description',
        'type',
        'status',
    ];

    public function user(): BelongsTo
    {
        // This links this complaint to a User via the 'user_id' column
        return $this->belongsTo(User::class, 'user_id');
    }

    public function admin(): BelongsTo
    {
        // This links this complaint to a User via the 'admin_id' column
        return $this->belongsTo(User::class, 'admin_id');
    }
}
