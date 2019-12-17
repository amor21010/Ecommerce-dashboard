$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

    //bar
    // var ctxB = document.getElementById("barChart").getContext('2d');
    // var myBarChart = new Chart(ctxB, {
    //   type: 'bar',
    //   data: {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
    //     datasets: [{
    //       label: 'App selling',
    //       data: [12, 19, 8, 100, 2, 3,10,100,52,30,10,100],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)',
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)',
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)',

    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true,
    //         }
    //       }]
    //     }
    //   }
    // });



 //search in list fun


 function search(){
  document.getElementById("accordion").style.display = "none";

  var pro_list, user_list,order_list;
  pro_list=document.getElementById("products");
  var products=pro_list.getElementsByTagName("li");
  user_list=document.getElementById("user_list");
  var users=user_list.getElementsByTagName("li");
  order_list=document.getElementById("order_list");
  var orders=order_list.getElementsByTagName("li");


  searchingPlace(products);
  searchingPlace(users);
  searchingPlace(orders);
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
Search_input.onfocusout = function(){
  var input= document.getElementById("Search_input");
  if(input.value.length<1){
  document.getElementById("accordion").style.display = "block";
  }
};