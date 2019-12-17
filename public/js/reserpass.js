function passrest(){
    var form =document.getElementById("restform").preventDefault();
    var username=document.getElementById("username").value;
    var email=document.getElementById("email").value;
    if (email==/*user email*/"amor2.1010@gmail.com"&& /*user name*/ username=="admin"){
 
        newpass=generatePassword();
        alert("check your email for new password " +newpass);
        sendmail(email,newpass);
        return true;
    }else{
        alert ("user name or email you enterd doesnot match to eny user");
        return false;
    }
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
function sendmail(email,newpass){
    //send email from api
}