(function (app) {

    app.controller('MainController', MainController);



    function MainController() {
        var ctrl = this;

        var generateNumbers = function (n, start) {
            var res = [];
            for (var i = start; i < n; i++) {
                res.push(i);
            }
            return res;
        };

        ctrl.selectedMinutes = [];
        ctrl.minutes = generateNumbers(60, 0);
        ctrl.hours = generateNumbers(24,0);
        ctrl.months = generateNumbers(32, 1);


        ctrl.addToSelected = function (e) {
            console.log('e', e);
        }


    };


}(angular.module('app')));