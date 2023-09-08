// Import Axios in your web worker script
importScripts('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');

self.onmessage = async function (event) {
  const { formData, csrfToken } = event.data;

  // Log the formData to check if it's received in the web worker
  console.log('Received formData in web worker:', formData);

  // Construct headers with the CSRF token
  const headers = {
    'X-CSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json', // Set the content type to JSON
  };

  // Construct the URL
  const url = '/files-upload'; // Adjust the URL

  try {
    // Send the formData to the Laravel route using Axios
    const response = await axios.post(url, formData, { headers });

    // Send the response back to the main script
    self.postMessage(response.data); // Assuming the response contains JSON data
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
  }
};
