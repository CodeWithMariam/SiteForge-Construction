<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    //this method show Article
    public function index(){
        $articles = Article::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }
   // this method will insert a projects in database
    public function store(Request $request){

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
              'title' => 'required',
              'slug' => 'required|unique:articles,slug',
        ]);

        if($validator->fails()){
            return response()->json([
               'status' => false,
               'message' => $validator->errors()
            ]);
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

         // save temp image here
         if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$article->id.'.'.$ext;

                // Check source path exists
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                if (!file_exists($sourcePath)) {
                    return response()->json([
                        'status' => false,
                         'message' => 'Source image not found']);
                }

                // Create small thumbnail
                $thumbnailPath = public_path('uploads/articles/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($thumbnailPath);

                // Create large thumbnail
                $thumbnailPath = public_path('uploads/articles/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($thumbnailPath);

                // Save image to model
                $article->image = $fileName;
                $article->save();
            }
        }

        return response()->json([
           'status' => true,
           'message' => 'Article created successfully',
        ]);

    }
    // this method will show a project
    public function show($id){
        $article = Article::find($id);
        if($article!= null){
            return response()->json([
               'status' => true,
                'data' => $article
            ]);
        }
        return response()->json([
           'status' => false,
           'message' => 'Article not found'
        ]);
    }
    // this method will update a project
    public function update(Request $request, $id){

        $article = Article::find($id);

        if($article == null){
            return response()->json([
               'status' => false,
               'message' => 'Article not found'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
              'title' =>'required',
              'slug' =>'required|unique:articles,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
               'status' => false,
               'message' => $validator->errors()
            ]);
        }

        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        // save temp image here
        if($request->imageId > 0){
            $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$article->id.'.'.$ext;

                // Check source path exists
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                if (!file_exists($sourcePath)) {
                    return response()->json([
                        'status' => false,
                         'message' => 'Source image not found']);
                }

                // Create small thumbnail
                $thumbnailPath = public_path('uploads/articles/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($thumbnailPath);

                // Create large thumbnail
                $thumbnailPath = public_path('uploads/articles/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($thumbnailPath);

                // Save image to model
                $article->image = $fileName;
                $article->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/articles/large/'.$oldImage));
                    File::delete(public_path('uploads/articles/small/'.$oldImage));
                 }
            }
        }

        return response()->json([
           'status' => true,
           'message' => 'Article updated successfully',
        ]);
    }
    // this method will delete a project
    public function destroy($id){
        $article = Article::find($id);

        if($article == null){
            return response()->json([
               'status' => false,
               'message' => 'Article not found'
            ]);
        }

        $article->delete();

        if($article->image!= ''){
            File::delete(public_path('uploads/articles/large/'.$article->image));
            File::delete(public_path('uploads/articles/small/'.$article->image));
        }

        return response()->json([
           'status' => true,
           'message' => 'Article deleted successfully',
        ]);
    }
}
