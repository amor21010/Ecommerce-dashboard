
let orderveiwmodel = {
    order: ko.observableArray([]),

};
$.getJSON(window.location.href +"/api/", (data) => {
    orderveiwmodel.order(data.order);
  
});

ko.applyBindings(orderveiwmodel);

