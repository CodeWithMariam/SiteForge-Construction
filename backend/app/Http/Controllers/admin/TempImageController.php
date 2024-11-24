<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'image' =>'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        //save the image in table
        $image = $request->file('image');
        $ext = $image->getClientOriginalExtension();
        $imageName = time(). '.'. $ext;

        $model = new TempImage();
        $model->name = $imageName;
        $model->save();

        //store the image in public folder
     $image->move(public_path('uploads/temp'), $imageName);

     //create small thumbnail here
     $sourcePath = public_path('uploads/temp/'.$imageName);
     $thumbnailPath = public_path('uploads/temp/thumbnails/'.$imageName);
     $manager = new ImageManager(Driver::class);
     $image = $manager->read($sourcePath);
     $image->coverDown(300, 300);
     $image->save($thumbnailPath);

     return response()->json([
       'status' => true,
       'data' => $model,
        'message' => 'Image uploaded successfully'
    ]);
    }
}
