<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function uploadChunks(Request $request){
        // Log the entire request to check what data is being received
        info('Received request:', ['request' => $request->all()]);
    
        // Access specific field names based on the provided data
        $formData = [
            'exampleFormControlInput1' => $request->input('exampleFormControlInput1'),
            'exampleFormControlSelect1' => $request->input('exampleFormControlSelect1'),
            'exampleFormControlSelect2' => $request->input('exampleFormControlSelect2'),
            'exampleFormControlTextarea1' => $request->input('exampleFormControlTextarea1'),
        ];
    
        // Log the specific formData to check its content
        info('Received formData:', ['formData' => $formData]);
    
        // Your further processing logic here
    
        return response()->json(['message' => 'Data received successfully']);
    }
}
