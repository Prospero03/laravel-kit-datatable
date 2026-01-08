<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request){
        $perPage= $request->input('per_page', 10);
        $search= $request->input('search','');
        $sort= $request->input('sort', 'id');
        $direction= $request->input('direction','asc');

        $query= User::query()
            ->when($search, function($query, $search){
                $query->where('name','like',"%$search%")
                    ->orWhere('email', 'like', "%$search%");
            });

        $query->orderBy($sort, $direction);
        $users= $query->paginate($perPage)->withQueryString();

        return Inertia::render('Users/Index',[
            'users'=>$users,
            'filters'=>[
                'search' => $search,
                'direction' => $direction,
                'per_page'=> $perPage,
                'page'=> $request->input('page', 1),
                'sort'=>$sort,
            ],
            'can'=>[
                'create'=> true,
                'edit'=> true,
                'delete'=> true,
            ] 
        ]);
    }
}
