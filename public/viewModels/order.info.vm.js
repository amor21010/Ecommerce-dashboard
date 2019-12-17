
let orderveiwmodel = {
    order: ko.observableArray([])
};
$.getJSON("http://localhost:8088/order/5d1ad905fd9c140e309faab0", (data) => {

    orderveiwmodel.order(data.order);
});

ko.applyBindings(orderveiwmodel);

