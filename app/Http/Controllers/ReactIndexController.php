<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ReactIndexController extends Controller
{
    public function index()
    {
        return view('react-index.index');
    }
}
