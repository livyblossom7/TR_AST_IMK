// Toggle show/hide password
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword) {
    togglePassword.addEventListener("click", function () {
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);

        // ganti icon
        this.classList.toggle("bi-eye");
        this.classList.toggle("bi-eye-slash");
    });
}

// Login logic (hardcode)
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        // hardcode login
        if (email === "admin@gmail.com" && pass === "123456") {
            alert("Login berhasil!");

            // pindah ke home
            window.location.href = "home.html";
        } else {
            alert("Email atau password salah!");
        }
    });
}