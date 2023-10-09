// In script.js
const worker = new Worker("../service-worker.js");
const mainPodcastForm = document.querySelector("#mainPodcastForm");
const episodeForm = document.querySelector("#episodeForm");
const createPodcastButton = document.querySelector("#createPodcastButton");

// Function to submit a form
async function submitForm(formId) {
    const form = document.querySelector(`#${formId}`);
    
    if (!form) {
        console.error(`Form with ID "${formId}" not found.`);
        return;
    }

    // Disable the button to prevent multiple clicks
    createPodcastButton.disabled = true;

    try {
        const formData = new FormData(form);
        
        // Get the CSRF token from the meta tag
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        const formDataObject = {};

        for (const key of formData.keys()) {
            if (!formDataObject[key]) {
                formDataObject[key] = formData.getAll(key);
            }
        }

        Object.keys(formDataObject).forEach((key) => {
            if (formDataObject[key].length === 1) {
                formDataObject[key] = formDataObject[key][0];
            }
        });

        // Check for empty fields, including poster image and audio
        const emptyFields = Object.entries(formDataObject)
            .filter(([fieldName, value]) => {
                if (fieldName === "poster_images" || fieldName === "audio") {
                    return !value || (Array.isArray(value) && value.length === 0);
                } else {
                    return !value;
                }
            })
            .map(([fieldName, value]) => fieldName);

        if (emptyFields.length > 0) {
            // Display an alert with a list of empty fields
            alert(
                `Please fill out the following fields before submitting:\n${emptyFields.join(
                    "\n"
                )}`
            );
            return; // Exit the function and don't send the data to the worker
        }

        const dataToSend = {
            formData: formDataObject, // Pass the plain object representing the FormData
            bearerToken,
            appURL,
            csrfToken,
        };

        // Send the data to the web worker
        await new Promise((resolve) => {
            worker.postMessage(dataToSend);
            worker.onmessage = (event) => {
                resolve(event.data);
            };
        });

        // Log the non-empty fields and their values
        const nonEmptyFieldsData = Object.entries(formDataObject)
            .filter(([fieldName, value]) => !!value)
            .map(([fieldName, value]) => ({ fieldName, value }));

        if (nonEmptyFieldsData.length > 0) {
            console.log("Fields with values:");
            nonEmptyFieldsData.forEach(({ fieldName, value }) => {
                console.log(`${fieldName}: ${value}`);
            });
        }
    } catch (error) {
        console.error("An error occurred while submitting the form:", error);
    } finally {
        // Re-enable the button after the request is complete
        createPodcastButton.disabled = false;
    }
}

// Attach an event listener to the "Create Podcast" button
if (createPodcastButton) {
    createPodcastButton.addEventListener("click", async () => {
        await submitForm("mainPodcastForm");
    });
}

// Handle the response from the web worker
worker.onmessage = function (event) {
    const responseData = event.data;
    // Handle the response data as needed
};
