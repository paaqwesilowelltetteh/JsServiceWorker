@extends('layouts.app')

@section('content')
    <div class="container mt-5">
    <form id="myForm" method="get">
        <div class="form-group">
            {{-- <label for="poster_images">Select File</label> --}}
            <div id="drop-area" class="form-control">
                <input type="file" id="poster_images" name="poster_images" style="display: none;" accept="image/*, audio/*, video/*">
                <p id="file-info">Drag &amp; Drop files here or click to select files</p>
            </div>
        </div>
        <div class="form-group">
            <label for="title"> Title</label>
            <div >
                 <input type="text" id="title" name="title"  required class="form-control">
            </div>
        </div>

        <button type="submit" id="submitForm" name="submitForm" class="btn btn-primary">Upload</button>
    </form>

    <script>
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('poster_images');
        const fileInfo = document.getElementById('file-info');
        const submitButton = document.getElementById('submitForm');

        // Prevent default behavior when a file is dragged over the drop area
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.classList.add('highlight');
        });

        // Restore the default style when a dragged file leaves the drop area
        dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('highlight');
        });

        // Handle the dropped files
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.classList.remove('highlight');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                displayFileInfo(files[0]);
            }
        });

        // Trigger the file input when the drop area is clicked
        dropArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Handle file selection through the file input element
        fileInput.addEventListener('change', () => {
            const selectedFiles = fileInput.files;
            if (selectedFiles.length > 0) {
                displayFileInfo(selectedFiles[0]);
            } else {
                fileInfo.innerText = 'Drag & Drop files here or click to select files';
            }
        });

        // Function to display file name and size
        function displayFileInfo(file) {
            fileInfo.innerText = `Selected File: ${file.name} (${formatSize(file.size)})`;
        }

        // Function to format file size
        function formatSize(size) {
            if (size < 1024) {
                return `${size} bytes`;
            } else if (size < 1048576) {
                return `${(size / 1024).toFixed(2)} KB`;
            } else {
                return `${(size / 1048576).toFixed(2)} MB`;
            }
        }

    </script>
    </div>
@endsection
