
let empveiwmodel = {
    emp: ko.observableArray([]),
    emps: ko.observableArray([])

};
$.getJSON(window.location.href + "/api/", (emp) => {

    empveiwmodel.emps(emp.emps);
    empveiwmodel.emp(emp.emp);
});



ko.applyBindings(empveiwmodel);

