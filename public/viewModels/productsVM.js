
let productveiwmodel = {
    product: ko.observableArray([]),
    categorys:ko.observableArray([])
};
$.getJSON(window.location.href +"/api/dash", (data) => {

    productveiwmodel.product(data.product);
    productveiwmodel.categorys(data.categorys)
});


ko.applyBindings( productveiwmodel);

