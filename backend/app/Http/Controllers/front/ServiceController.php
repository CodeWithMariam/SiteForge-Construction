<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // this method will show all actice services
    public function index(){
        $services = Service::where('status', 1)->orderBy('created_at' , 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    // this method will show latest actice services
    public function latestServices(Request $request){
        $services = Service::where('status', 1)
                            ->take($request->get('limit'))
                            ->orderBy('created_at' , 'desc')->get();
                            return response()->json([
                                'status' => true,
                                'data' => $services
                            ]);
    }
}
