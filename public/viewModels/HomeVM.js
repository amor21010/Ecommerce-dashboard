
var baseUrl=window.location.href.split("home")[1]

let productveiwmodel = {
    product: ko.observableArray([]),
    order: ko.observableArray([]),
    user: ko.observableArray([]),
    categorys:ko.observableArray([])
    
    
};

$.getJSON(baseUrl+"/product/api/home", (data) => {
    productveiwmodel.categorys(data.categorys)
    productveiwmodel.product(data.product);
});

$.getJSON(baseUrl+"/user/api/home", (USER) => {

    productveiwmodel.user(USER);
});
$.getJSON(baseUrl+"/order/api/home", (ORDER) => {

    productveiwmodel.order(ORDER.order);
});

ko.applyBindings( productveiwmodel);

