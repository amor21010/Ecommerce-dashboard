$("#toggle-fields").click(function () {
    $("#main-section").toggleClass("advanced");
});
$("#toggle-fields2").click(function () {
    $("#main-section").toggleClass("advanced");
});


var base = window.location.href;


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

function setCookie( cvalue) {
    deleteAllCookies()
    document.cookie =  cvalue;
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
$(document).ready(()=>{
deleteAllCookies()
})