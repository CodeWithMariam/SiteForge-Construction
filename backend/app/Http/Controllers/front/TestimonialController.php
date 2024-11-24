<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
        // this method shows Testimonial in fontend
        public function index(){
            // fetch all Testimonial from database
            $testimonials = Testimonial::where('status', 1)->orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => true,
                'data' => $testimonials
            ]);
        }

        // this method shows latest Testimonial in fontend
        public function latestTestimonial(Request $request){
            // fetch latest article from database
            $testimonials = Testimonial::where('status', 1)
                                     ->limit($request->limit)
                                     ->orderBy('created_at', 'desc')
                                     ->get();

            return response()->json([
                'status' => true,
                'data' => $testimonials
            ]);
        }
}
