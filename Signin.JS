const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const role = document.getElementById("select");

const mail_SignUp = document.getElementById("mailSignUp");
const pass_SignUp = document.getElementById("passSignUp");


const checkMail = document.getElementById("txtMail");
const checkPass = document.getElementById("txtPass");


let is_Organize = undefined;


let clicked=false;



signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
    clicked = true
    
    
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    clicked = false

});


if(clicked == false){
    document.getElementById("head").innerHTML = "Emergency Sign In";
}else{
    document.getElementById("head").innerHTML = "Emergency Sign Up";


}






let dataMail = ["mostafa@gmail.com", "belal@gmail.com", "poula@gmail.com", "abdelrahman@gmail.com", "aya@gmail.com"]
let dataPass = [12345, 12345, 12345, 12345, 12345]


/*------------------------------------------ add sign up data to array -------------------------------------------- */
document.forms[0].onsubmit = function () {
   
    dataMail.push(mail_SignUp.value);
    dataPass.push(pass_SignUp.value);
    alert("Congratolations.. you can get our services by signing in now")

    console.log(dataMail)
    console.log(dataPass)

}




/*------------------------------------------ Validate Role -------------------------------------------- */

role.addEventListener("change", function () {
    if (role.value == "organization") {
        is_Organize = true;
        console.log(is_Organize)

    }
    else if (role.value == "client") {
        is_Organize = false;
        console.log(is_Organize);

    }
    else {
        is_Organize = undefined;

        alert("you must select your role")
    }

})


/*---------------------------------------------- validation Function for form ---------------------------------------------------------- */

document.forms[1].onsubmit = function (event) {

    let userValid = false;
    let passValid = false;

    /**------------------------------------------ Validate mail & pass  -------------------------------------------- */



    for (var i = 0; i < dataMail.length; i++) {
        for (var x = 0; x < dataPass.length; x++) {

            if (checkMail.value == dataMail[i] && checkPass.value == dataPass[x]) {
                userValid = true; passValid = true;

            }

        }

    }

/**----------------------------------------------------abdelrahman test ------------------------------------- */

//     let userValid ,passValid = false;
//     const dataMails = [
//         {user:'mostafa@gmail.com',pass:'12345'},
//         {user:'belal@gmail.com',pass:'67890'},
//         {user:'aya@gmail.com',pass:'13579'},
//         {user:'poula@gmail.com',pass:'24680'},
//         {user:'abdelrahman@gmail.com',pass:'00000'}];

//         document.forms[0].onsubmit = function () {
   
//             dataMails.user.push(mail_SignUp.value);
//             dataMails.pass.push(pass_SignUp.value);
//             alert("Congratolations.. you can get our services by signing in now")
        
//             console.log(dataMail)
//             console.log(dataPass)
//         }

//     for(let i=0;i< dataMails.length;i++){
//         if (checkMail.value == dataMails[i].user && checkPass.value ==dataMails[i].pass) {   
//             userValid, passValid = true;
//     }
// }
/*----------------------------------------------------------------------------------------------*/
    // if (checkMail.value == dataMail[0] && checkPass.value == dataPass[0]) {
    //     userValid = true; passValid = true;

    // } else if (checkMail.value == dataMail[1] && checkPass.value == dataPass[1]) {
    //     userValid = true; passValid = true;

    // }
    // else if (checkMail.value == dataMail[2] && checkPass.value == dataPass[2]) {

    //     userValid = true; passValid = true;

    // } else if (checkMail.value == dataMail[3] && checkPass.value == dataPass[3]) {

    //     userValid = true; passValid = true;

    // } else if (checkMail.value == dataMail[4] && checkPass.value == dataPass[4]) {
    //     userValid = true; passValid = true;

    // }


    if (userValid == false || passValid == false) {
        event.preventDefault();
        alert("InValid User Name Or Password")
    }

    else if (userValid == true && passValid == true && is_Organize == true) {
        event.preventDefault();
        console.log("you are organizer")
        window.open("AppOrganization.html", '_self');

    }
    else if (userValid == true && passValid == true && is_Organize == undefined) {
        event.preventDefault();
        alert("you should select your Role")

    }
    else if (userValid == true && passValid == true && is_Organize == false) {
        console.log("you are client")

    }



}


