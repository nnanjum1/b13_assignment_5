const signInbtn = document.querySelector(".btn-signIN");
signInbtn.addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username === "admin" && password === "admin123") {
        alert("Sign In Successful!");
        window.location.href = "issues.html";
    } else {
        alert("Sign In failed");
    }
})
