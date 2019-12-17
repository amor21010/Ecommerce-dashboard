
let userveiwmodel = {
    user: ko.observableArray([])
};
$.getJSON(window.location.href +"/api/", (user) => {
    userveiwmodel.user(user);
});

ko.applyBindings(userveiwmodel);

