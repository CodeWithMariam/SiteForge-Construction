<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(){
        $projects = Project::where('status', 1)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    public function latestProject(Request $request){
        $projects = Project::where('status', 1)
                    ->take($request->get('limit'))
                    ->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }
}
