const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event){

    event.preventDefault();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){

        alert("Passwords do not match.");

        return;

    }

    alert("Registration request ready to send.");

});