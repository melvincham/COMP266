/*
Form validation script adapted from:
Author: GeeksforGeeks
Source: https://www.geeksforgeeks.org/javascript/form-validation-using-javascript/
Script: Form Validation (Using Regex)
Accessed on: August 17, 2025
*/


// Run this code only after the full HTML document has loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element by its ID
    const form = document.getElementById("myForm");
        
    // Add a submit event listener to the form
    form.addEventListener("submit", function (e) {
        // Stop the form from submitting right away so we can validate the inputs first
        e.preventDefault();

        // Get the values entered into the form fields
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        let isValid = true;

        // Clear any previous error messages
        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("message-error").textContent = "";

        // Name Validation regex allows letters (upper or lower case), special characters and spaces, and 
        // requires at least 1 character but no more than 200.
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/;
        if (!nameRegex.test(name)) {
            document.getElementById("name-error").textContent = 
                "Name must be 1-200 letters.";
            isValid = false;
        }

        // Email Validation regex checks for the general email structure: something@domain.com
        const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
        if (!emailRegex.test(email)) {
            document.getElementById("email-error").textContent = 
                "Invalid email address.";
            isValid = false;
        }

        // Message validation regex checks for at least one non-space character
        const messageRegex = /\S+/;
        if (!messageRegex.test(message)) {
            document.getElementById("message-error").textContent = 
                "Message cannot be empty";
            isValid = false;
        }

        // If all fields pass validation, allow the form to submit
        if (isValid) {
            form.submit(); 
        }
    });
});