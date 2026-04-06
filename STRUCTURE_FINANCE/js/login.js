
// đăng nhập
    inputName.addEventListener("input", function() {
        inputName.classList.remove("error");
        checkEmail.style.display = "none"; 
        document.getElementById("checkEmail").style.display="none";
        document.getElementById("check").style.display="none";

    });

    inputPassword.addEventListener("input", function() {
        inputPassword.classList.remove("error");
        checkPassword.style.display = "none"; 
       document.getElementById("checkPassword").style.display="none";
       document.getElementById("check").style.display="none";
    });
function logIn(event) {
     event.preventDefault();
    let inputName=document.getElementById("inputName");
    let inputPassword=document.getElementById("inputPassword");

    let checkEmail = document.getElementById("checkEmail");
    let checkPassword = document.getElementById("checkPassword");

    let email=inputName.value.trim();
    let password=inputPassword.value.trim();

    let isValid=true;
     // lắng nghe sự kiện ô input 
    

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email===""){
        checkEmail.innerText="Please enter your email ..."
        checkEmail.style.display="block";
        checkEmail.style.color="red";
        checkEmail.style.textAlign="left";
        inputName.classList.add("error");
        inputName.focus();
        isValid=false;
    } else if (!emailRegex.test(email)) {
        checkEmail.innerText = "The email is not in the correct format.";
        checkEmail.style.display="block";
        checkEmail.style.color="red";
        checkEmail.style.textAlign="left";
        inputName.classList.add("error");
        inputName.focus();
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
        }
        isValid=false;
    };

      if (isValid) {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // alert("Đăng nhập thành công");
            document.getElementById("signSuccess").style.display="block";
            // lưu trạng thái đăng nhập
            localStorage.setItem("currentUser", JSON.stringify(user));

            window.location.href = "../pages/index.html";
        } else {
            document.getElementById("check").style.display = "block";
            document.getElementById("check").style.color="red"
            inputName.focus();
        }
    }
}
            
