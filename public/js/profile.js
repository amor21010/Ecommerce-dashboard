
function cancel() {

}
function savenewdata(){
    validatdata();

}

function validatdata() {
    var username = document.getElementById("username").value;
    var oldpassword = document.getElementById("oldpassword").value;
    var password = document.getElementById("password").value;
    var confpassword = document.getElementById("confpassword").value;

    if (oldpassword == "admin") {
        if (username == null || username == "" && password == confpassword) {
            alert("username not changed");
            return true;
        }
    
            
         else if (password != confpassword) {
            alert("confirm password doesn't match");
            return false;
        }
        else{
            alert("changes saved");
            return true;
        }
    } else {
        alert("password doesn't match");
        return false;
    }
}
$("#loggin").submit(event => {
    event.preventDefault();
    var form = $(this),
        userName = $("#userName").val(),
        password = $("#Password").val(),
        url = base + "emp/loggin/api";
    console.log(url, userName, password)

    var pst = $.post(url, { userName: userName, password: password });
    pst.done((res) => {
        console.log(res);
        if (res.success) {
            setCookie(res.token);
            window.location.assign("home")

        } else {
            $("#msg").empty().append("user name and password dosen't match to any user")
        }
    })
})