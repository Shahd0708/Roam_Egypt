function popup_message(text) {

    const overlay = document.querySelector('#overlay'); //the div itself
    const popuptext = document.querySelector('#popup-text'); 
    popuptext.textContent = text;
    overlay.classList.add('show');
}

document.querySelector('#close-popup').addEventListener('click', function () {
    document.querySelector('#overlay').classList.remove('show');
});

// switching forms 
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

document.querySelector('#showRegister').addEventListener('click', function () {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

document.querySelector('#showLogin').addEventListener('click', function () {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});


// Register
registerForm.addEventListener('submit', function (event_info) {
    event_info.preventDefault(); //prevents reloading the page after submit

    const name = document.querySelector('#registerName').value.trim();
    const email = document.querySelector('#registerEmail').value.trim();
    const password = document.querySelector('#registerPassword').value;

    if (name === "" || email === "" || password === "") {
        popup_message('Please fill in all fields!');
        return;
    }

    if (password.length < 5) {
        popup_message("Password must be at least 5 characters!");
        return;
    }

    let users = JSON.parse(sessionStorage.getItem('users')) || [];

    const email_exists = users.some(function (user) {
        return user.email === email;
    })

    if (email_exists) {
        popup_message("An account with this email already exists");
        return
    }

    users.push({ name, email, password, role: "user" });
    sessionStorage.setItem('users', JSON.stringify(users));

    popup_message("Account created sucessfully! You can now log in.");
    registerForm.reset(); //empties the input place

    // auto-switch to login after 3 seconds

    setTimeout(function () {
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    }, 3000)

})


// Login
loginForm.addEventListener('submit', function (event_info) {
    event_info.preventDefault();

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value;

    if (email === "" || password === "") {
        popup_message('Please fill in all fields!');
        return;
    }

    if (password.length < 5) {
        popup_message("Password must be at least 5 characters!");
        return;
    }
//admin check

if(email === "admin@roamegypt.com" && password === "admin"){
    sessionStorage.setItem('logged_in_user', JSON.stringify({
        email: email,
        role: "admin"
    }));
    popup_message("Welcome, Admin!");
    setTimeout(function(){window.location.href = "admin.html"}, 2000);
    return;
}


    // check if account exists 
    let users = JSON.parse(sessionStorage.getItem('users')) || [];
    const found_user = users.find(function (user) {
        return user.email === email;
    })
console.log(found_user)

    if (!found_user) {
        popup_message("No account found with this email!");
        return;
    }

    if (found_user.password !== password) {
        popup_message("Incorrect password!");
        return;
    }
    sessionStorage.setItem('logged_in_user', JSON.stringify(found_user));
    popup_message(`Welcome back, ${found_user.name}!`);
    loginForm.reset();

    setTimeout(function(){window.location.href = "home.html"}, 2000)

})