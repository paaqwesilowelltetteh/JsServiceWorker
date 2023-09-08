// In script.js

const worker = new Worker('../try-service-worker.js');
const form = document.querySelector('#myForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Check if all form fields are filled
  if (isFormValid(form)) {
      // console.log(form)
    // Inside your form submit event listener
const formData = new FormData(form);
    // Get the CSRF token from the meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    console.log(formData.getAll('exampleFormControlSelect2'));

    const formDataObject = {};

    for (const key of formData.keys()){
        if (! formDataObject[key]){
            formDataObject[key] = formData.getAll(key);
        }
    }

    Object.keys(formDataObject).forEach(key => {
        if (formDataObject[key].length === 1){
            formDataObject[key] = formDataObject[key][0];
        }
    });

    const dataToSend = {
      formData: formDataObject, // Pass the plain object representing the FormData
      csrfToken,               // Pass the CSRF token
    };

    // Send the data to the web worker
    worker.postMessage(dataToSend);
  } else {
    // Display an alert message if any field is empty
    alert('Please fill out all form fields before submitting.');
  }
});

// Function to check if all form fields are filled
function isFormValid(form) {
  const inputs = form.querySelectorAll('input, select, textarea');
  for (const input of inputs) {
    if (!input.value.trim()) {
      return false; // Field is empty
    }
  }
  return true; // All fields are filled
}

// Handle the response from the web worker
worker.onmessage = function (event) {
  const responseData = event.data;
  console.log('Response from web worker:', responseData);
  // Handle the response data as needed
  // You can remove the alert and add your own logic here
  alert(`The final sum is ${responseData}`);
};
