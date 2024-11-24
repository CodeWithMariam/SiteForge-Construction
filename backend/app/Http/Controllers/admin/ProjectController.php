<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{
    // this method will show all projects
    public function index(){
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }
    // this method will insert a projects in database
    public function store(Request $request){

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:projects,slug',
        ]);
        if($validator->fails()){
            return response()->json([
               'status' => false,
                'error' => $validator->errors()
            ]);
        }

        $project = new Project();
        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();


         // save temp image here
         if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$project->id.'.'.$ext;

                // Check source path exists
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                if (!file_exists($sourcePath)) {
                    return response()->json([
                        'status' => false,
                         'message' => 'Source image not found']);
                }

                // Create small thumbnail
                $thumbnailPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($thumbnailPath);

                // Create large thumbnail
                $thumbnailPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($thumbnailPath);

                // Save image to model
                $project->image = $fileName;
                $project->save();
            }
        }

        return response()->json([
           'status' => true,
           'message' => 'Project created successfully'
        ]);
    }
    public function show($id){
        $project = Project::find($id);

        if($project == null){
            return response()->json([
               'status' => false,
               'message' => 'Project not found'
            ]);
        }
        return response()->json([
           'status' => true,
            'data' => $project
        ]);
    }
   public function update(Request $request, $id){

        $project = Project::find($id);

        if($project == null){
            return response()->json([
               'status' => false,
               'message' => 'Project not found'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
           'slug' => 'required|unique:projects,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
               'status' => false,
                'error' => $validator->errors()
            ]);
        }

        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();


         // save temp image here
         if($request->imageId > 0){
            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$project->id.'.'.$ext;

                // Check source path exists
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                if (!file_exists($sourcePath)) {
                    return response()->json([
                        'status' => false,
                         'message' => 'Source image not found']);
                }

                // Create small thumbnail
                $thumbnailPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($thumbnailPath);

                // Create large thumbnail
                $thumbnailPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($thumbnailPath);

                // Save image to model
                $project->image = $fileName;
                $project->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/projects/large/'.$oldImage));
                    File::delete(public_path('uploads/projects/small/'.$oldImage));
                 }
            }
        }
        return response()->json([
           'status' => true,
           'message' => 'Project updated successfully'
        ]);
   }
    public function destroy($id){
        $project = Project::find($id);

        if($project == null){
            return response()->json([
               'status' => false,
               'message' => 'Project not found'
            ]);
        }

        if($project->image != ''){
        File::delete(public_path('uploads/projects/large/'.$project->image));
        File::delete(public_path('uploads/projects/small/'.$project->image));
        }

        $project->delete();

        return response()->json([
           'status' => true,
           'message' => 'Project deleted successfully'
        ]);
    }
}
