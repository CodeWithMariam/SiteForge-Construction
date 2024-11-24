<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TestimonialController extends Controller
{
    // this method will return all testimonials
    public function index(){
        $testimonials = Testimonial::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }
    //this method will return single testimonial
    public function show($id){
        $testimonial = Testimonial::find($id);

        if($testimonial == null){
            return response()->json([
               'status' => false,
               'message' => 'Testimonial not found'
            ]);
        }
        return response()->json([
           'status' => true,
            'data' => $testimonial
        ]);
    }
    // this method will insert all testimonials in database
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
             'testimonials' => 'required',
             'citation' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
               'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimonial = new Testimonial();
        $testimonial->testimonials = $request->testimonials;
        $testimonial->citation = $request->citation;
        $testimonial->designation = $request->designation;
        $testimonial->status = $request->status;
        $testimonial->save();

          // save temp image here
          if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$testimonial->id.'.'.$ext;

                // Check source path exists
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                if (!file_exists($sourcePath)) {
                    return response()->json([
                        'status' => false,
                         'message' => 'Source image not found']);
                }

                // Create small thumbnail
                $thumbnailPath = public_path('uploads/testimonials/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($thumbnailPath);

                // Save image to model
                $testimonial->image = $fileName;
                $testimonial->save();
            }
        }

        return response()->json([
            'status' => true,
             'message' => 'Testimonials created successfully.'
         ]);
    }
    // this method will update testimonial
    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
             'testimonials' => 'required',
             'citation' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
               'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimonial = Testimonial::find($id);

        if($testimonial == null){
            return response()->json([
               'status' => false,
               'message' => 'Testimonial not found'
            ]);
        }

        $testimonial->testimonials = $request->testimonials;
        $testimonial->citation = $request->citation;
        $testimonial->designation = $request->designation;
        $testimonial->status = $request->status;
        $testimonial->save();

                  // save temp image here
                  if($request->imageId > 0){
                  $oldImage = $testimonial->image;
                    $tempImage = TempImage::find($request->imageId);
                    if($tempImage != null){
                        $extArray = explode('.', $tempImage->name);
                        $ext = last($extArray);

                        $fileName = strtotime('now').$testimonial->id.'.'.$ext;

                        // Check source path exists
                        $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                        if (!file_exists($sourcePath)) {
                            return response()->json([
                                'status' => false,
                                 'message' => 'Source image not found']);
                        }

                        // Create small thumbnail
                        $thumbnailPath = public_path('uploads/testimonials/'.$fileName);
                        $manager = new ImageManager(Driver::class);
                        $image = $manager->read($sourcePath);
                        $image->coverDown(300, 300);
                        $image->save($thumbnailPath);

                        // Save image to model
                        $testimonial->image = $fileName;
                        $testimonial->save();

                        if($oldImage != ''){
                            File::delete(public_path('uploads/testimonials/'.$oldImage));
                         }
                    }
                }

         return response()->json([
            'status' => true,
             'message' => 'Testimonials updated successfully.'
         ]);
    }
    // this method will delete testimonial
    public function destroy($id){

        $testimonial = Testimonial::find($id);

        if($testimonial == null){
            return response()->json([
               'status' => false,
               'message' => 'Testimonial not found'
            ]);
        }

        if($testimonial->image != ''){
        File::delete(public_path('uploads/testimonials/'.$testimonial->image));
        }

        $testimonial->delete();

        return response()->json([
           'status' => true,
            'message' => 'Testimonial deleted successfully.'
        ]);
    }
}
