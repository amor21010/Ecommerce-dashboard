$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});


function total() {
    var items = document.getElementsByName("Quantitys");
    var price = document.getElementsByName("price");
    var itemCount = items.length;
    
    var total = 0;
    var deliveryfee =20;
    for (var i = 0; i < itemCount; i++) {
        var Quantity=items[i].innerText;
        total = total +  Math.abs(Quantity * Math.abs(price[i].innerText));
    }
    document.getElementById('totalPrice').value = total + deliveryfee;
};

$(document).ready(function () {
    var check = function(){
        if( document.getElementsByName("price").length!=0){
            total()
        }
        else {
            setTimeout(check, 1000); // check again in a second
        }
    }
    check();
})



function put(url) {
        var url = url + "/update/api/?_method=PATCH";
        document.getElementById("save").onclick(document.getElementById("formid").action = (url));

        document.getElementById("cancel").onclick(document.getElementById("formid").action = ("./"));

    }

$(document).on('click', '.number-spinner button', function () {
        var btn = $(this),
            oldValue = btn.closest('.number-spinner').find('input').val().trim(),
            newVal = 0;

        if (btn.attr('data-dir') == 'up') {
            newVal = parseInt(oldValue) + 1;
        } else {
            if (oldValue >= 1) {
                newVal = parseInt(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        btn.closest('.number-spinner').find('input').val(newVal);
    });
function patch(url) {
    var url = url + "/updateQ/api/?_method=PATCH";
    document.getElementById("save").onclick(document.getElementById("updateQ").action = (url));

}