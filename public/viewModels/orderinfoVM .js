
let orderveiwmodel = {
  order: ko.observableArray([]),
  product: ko.observableArray([])


};
$.getJSON(window.location.href + "/dash/api/", (data) => {
  orderveiwmodel.order(data);
  orderveiwmodel.product(data.order.products)
});
let updateQ=(id,value)=>{
  $("#productID").val(id);
  $("#Quantity").val(value);

}

ko.applyBindings(orderveiwmodel);

