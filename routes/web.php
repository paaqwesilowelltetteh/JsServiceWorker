<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UploadController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/uppy', function () {
    return view('uppy-upload');
})->name('uppy');

Route::get('/file-upload', function () {
    return view('file-upload');
})->name('file-upload');

Route::get('/drap-and-drop', function () {
    return view('drag-and-drop');
})->name('drag');

// Route::post('/files-upload', [UploadController::class, 'uploadChunks'])->name('files.upload.large');


