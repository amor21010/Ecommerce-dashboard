$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });
});

function search() {


  var pro_list;
  pro_list = document.getElementById("products");
  var products = pro_list.getElementsByTagName("li");



  searchingPlace(products);

}

function searchingPlace(li) {
  var input, filter, h, i, txtValue;
  input = document.getElementById("Search_input");
  filter = input.value.toUpperCase();
  for (i = 0; i < li.length; i++) {

    h = li[i].getElementsByTagName("h5")[0];
    txtValue = h.innerText;


    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//restiting search results

function resetsearch(li) {
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
}
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$(document).on('click', '.number-spinner button', function () {
  var btn = $(this),

  oldValue = btn.closest('.number-spinner').find('input').val().trim(),

  newVal = 0;
  if(oldValue==null||oldValue==""||oldValue==NaN) oldValue=0;
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
