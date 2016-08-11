(function (app) {

    app.controller('GraphicController', GraphicController);


    GraphicController.$inject = ['graphicService'];
    function GraphicController(graphicService) {
        var ctrl = this;

        var generateNumbers = function (n, start) {
            var res = [];
            for (var i = start; i < n; i++) {
                res.push(i);
            }
            return res;
        };

        ctrl.minutes = generateNumbers(60, 0);
        ctrl.hours = generateNumbers(24,0);
        ctrl.days = generateNumbers(32, 1);

        ctrl.dow = [
            {id: 0, name: 'Sunday', type: 'weekend'},
            {id: 1, name: 'Monday', type: 'weekday'},
            {id: 2, name: 'Tuesday', type: 'weekday'},
            {id: 3, name: 'Wednesday', type: 'weekday'},
            {id: 4, name: 'Thursday', type: 'weekday'},
            {id: 5, name: 'Friday', type: 'weekday'},
            {id: 6, name: 'Saturday', type: 'weekend'}
        ];


    };


}(angular.module('app')));