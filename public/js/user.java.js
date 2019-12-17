$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

 //search in list fun


 function search(){
  

  var user_list;

  user_list=document.getElementById("user_list");
  var users=user_list.getElementsByTagName("li");

 
  searchingPlace(users);
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
