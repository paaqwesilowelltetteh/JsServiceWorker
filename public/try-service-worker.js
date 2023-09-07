// In try-service-worker.js
self.onmessage = async function (event) {
    const { formData, csrfToken } = event.data;
  
    // Log the formData to check if it's received in the web worker
    console.log('Received formData in web worker:', formData);
  
    // Construct headers with the CSRF token
    const headers = {
      'X-CSRF-TOKEN': csrfToken,
    };
  
    // Construct the HTTP request
    const url = '/files-upload'; // Adjust the URL
  
    try {
      // Send the formData to the Laravel route
      const response = await postData(url, formData, headers);
      self.postMessage(response); // Send the response back to the main script
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  };
  
  // Function to send data to the server using Fetch API
  async function postData(url, data, headers) {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data), // Convert the plain object to JSON
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }
  