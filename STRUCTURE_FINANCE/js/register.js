

function register(event) {

    event.preventDefault();
    let inputName=document.getElementById("input-name");
    let inputPassword=document.getElementById("input-password");
    let confirmPassword=document.getElementById("confirm-password");

    let checkEmail = document.getElementById("checkEmail");
    let checkPassword = document.getElementById("checkPassword");
    let checkConfirm = document.getElementById("checkConfirm");

    let email=inputName.value.trim();
    let password=inputPassword.value.trim();
    let confirm=confirmPassword.value.trim();

    // inputName.classList.remove("error");
    // inputPassword.classList.remove("error");
    // confirmPassword.classList.remove("error");

     // lắng nghe sự kiện ô input 
    inputName.addEventListener("input", function() {
        inputName.classList.remove("error");
        checkEmail.style.display = "none"; 
    });

    inputPassword.addEventListener("input", function() {
        inputPassword.classList.remove("error");
        checkPassword.style.display = "none"; 
    });

    confirmPassword.addEventListener("input",function () {
        confirmPassword.classList.remove("error");
        checkConfirm.style.display="none";
    });
    let isValid=true;


    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(email===''){
        checkEmail.innerText="Please enter your email ..."
        checkEmail.style.display="block";
        checkEmail.style.color="red";
        checkEmail.style.textAlign="left";
        inputName.classList.add("error");
        inputName.focus();
        isValid=false;
    } else if (!emailRegex.test(email)) {
        checkEmail.innerText = "The email is not in the correct format...";
         checkEmail.style.display="block";
        checkEmail.style.color="red";
        checkEmail.style.textAlign="left";
        inputName.classList.add("error");
        isValid=false;
    };

    if (password==="") {
        checkPassword.innerText="Please enter your password ...";
        checkPassword.style.color="red";
        checkPassword.style.display="block";
        checkPassword.style.textAlign="left";
        inputPassword.classList.add("error");
        if (isValid === true) { 
                    inputPassword.focus();
                        }    
         isValid=false;
    } else if(password.length<6){
         checkPassword.innerText="The password must be more than 6 characters.";
        checkPassword.style.display="block";
        checkPassword.style.color="red";
        checkPassword.style.textAlign="left";
        inputPassword.classList.add("error");
        if (isValid === true) { 
            inputPassword.focus();
                        } ;
        isValid=false;
    };

    if (confirm === "") {
        checkConfirm.innerText = "Please confirm your password...";
        checkConfirm.style.color="red";
        checkConfirm.style.display = "block";
        checkConfirm.style.textAlign="left";
        confirmPassword.classList.add("error");
         if (isValid === true) { 
            checkConfirm.focus();
                } ;
        isValid = false;
    } else if (password !== confirm) {
        checkConfirm.innerText = "Password doesn't match.";        
        checkConfirm.style.color="red";
        checkConfirm.style.display = "block";
        checkConfirm.style.textAlign="left";
        confirmPassword.classList.add("error");
       if (isValid === true) { 
            confirmPassword.focus();
                } ;
        isValid = false;
    };

    if (isValid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exist = users.find(u => u.email === email);
    if (exist) {
        checkEmail.innerText = "The email already exists...";
        checkEmail.style.display = "block";
        return;
    }
    let newUser = {
        id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
        fullName: email,
        email: email,
        password: password,
        phone: "",
        gender: true,
        status: true
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    // alert("Đăng ký thành công!");
    document.getElementById("signUpSuccess").style.display="block";
    setTimeout(() => {
            window.location.href = "../pages/login.html";
        }, 1500);
}

}