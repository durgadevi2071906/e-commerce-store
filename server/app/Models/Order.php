<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'order_id';
    public $incrementing = false ;
    protected $keyType = 'string';

    public function user(){
        return $this->hasMany(User::class,'user_id','order_id');
    }

    protected $fillable = [
        'order_id',
        'user_id',
        'name',
        'price',
        'quanity',
        'image',
    ];
}
