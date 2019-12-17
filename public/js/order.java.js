$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

 //search in list fun


 function search(){
  order_list=document.getElementById("order_list");
  var order=order_list.getElementsByTagName("li");

  searchingPlace(order);
 }

function searchingPlace(li) {
  var input, filter, h, i, txtValue ;


 
  input = document.getElementById("Search_input");

  
  filter = input.value.toUpperCase();

  for (i = 0; i < li.length; i++) {
 
          h = li[i].getElementsByTagName("h5")[0];
          txtValue =h.innerText;
      

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
