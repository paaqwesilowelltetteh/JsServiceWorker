<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormDataEntry;

class UploadController extends Controller
{
    public function uploadChunks(Request $request) {
        $content = $request->getContent();
        // info('Received request content:', ['content' => $content]);
    
        // Parse the JSON data
        $formData = json_decode($content, true);
    
        info($formData);
        // Create a new FormDataEntry instance and save it
        // $formDataEntry = new FormDataEntry([
        //     'field1' => $formData['exampleFormControlInput1'],
        //     'field2' => $formData['exampleFormControlSelect1'],
        //     'field3' => $formData['exampleFormControlSelect2'],
        //     'field3' => $formData['exampleFormControlTextarea1'],
            
        // ]);
    
        // info($formDataEntry);
    
        // Optionally, you can return a response to the client
        return response()->json(['message' => 'Data received and saved successfully']);
    }
}
