function readURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('#blah').attr('src', e.target.result);
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#imgInp").change(function() {
    readURL(this);
  });
  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
  });

  function put(url){
    var url=url+"/patch/api/dash/?_method=PATCH";
    document.getElementById("save").onclick(document.getElementById("formid").action=(url));

    document.getElementById("cancel").onclick( document.getElementById("formid").action=("./"));
  
}


function category(){
  var category=document.getElementById("category");
  var option =category.childNodes;
  option.setSelected
}


$(document).ready(function () {
  var check = function(){
      if( document.getElementsByName("category").length!=0){
        category()
      }
      else {
          setTimeout(check, 1000); // check again in a second
      }
  }
  check();
})


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
