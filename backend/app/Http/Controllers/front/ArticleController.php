<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // this method shows articles in fontend
    public function index(){
        // fetch all articles from database
        $articles = Article::where('status', 1)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    // this method shows latest articles in fontend
    public function latestArticle(Request $request){
        // fetch latest article from database
        $latestArticle = Article::where('status', 1)
                                 ->limit($request->limit)
                                 ->orderBy('created_at', 'desc')
                                 ->get();

        return response()->json([
            'status' => true,
            'data' => $latestArticle
        ]);
    }
}
