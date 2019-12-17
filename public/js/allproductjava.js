
 function search(){

  
    var pro_list;
    pro_list=document.getElementById("products");
    var products=pro_list.getElementsByTagName("li");
    
   
  
    searchingPlace(products);

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
  
    }
  };