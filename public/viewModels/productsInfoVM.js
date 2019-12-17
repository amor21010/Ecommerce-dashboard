
let productveiwmodel = {
    product: ko.observableArray([]),
    categors:ko.observableArray([])
};
$.getJSON(window.location.href +"/api/dash", (data) => {

    productveiwmodel.product(data.product);
    productveiwmodel.categors(data.category)
});


ko.applyBindings( productveiwmodel);

