@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        {{-- <form id="myForm" method="get">
            <div class="form-group">
                <label for="exampleFormControlInput1">Email address</label>
                <input type="file" class="form-control" id="poster_images" name="poster_images"
                    placeholder="name@example.com">
            </div>

            <button type="submit" id="submitForm" name="submitForm" class="btn btn-primary">Primary</button>
        </form> --}}

        <h2 style="text-align:center">UPLOAD FILES TO THE SERVER WITH UPPY</h2>

        <div class="uppy-container">
        </div>
    @endsection
