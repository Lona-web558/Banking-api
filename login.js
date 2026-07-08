const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    if(email === "" || password === ""){

        alert("Please complete all fields.");

        return;

    }

    alert("Login request ready to send.");

});