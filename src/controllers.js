(function (app) {

    app.controller('MainController', MainController);


    MainController.$inject = ['dispatcherService'];
    function MainController(dispatcherService) {
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
        ctrl.months = [
            {id: 0, name: 'January', type: 'winter'},
            {id: 1, name: 'February', type: 'winter'},
            {id: 2, name: 'March', type: 'spring'},
            {id: 3, name: 'April', type: 'spring'},
            {id: 4, name: 'May', type: 'spring'},
            {id: 5, name: 'June', type: 'summer'},
            {id: 6, name: 'July', type: 'summer'},
            {id: 7, name: 'August', type: 'summer'},
            {id: 8, name: 'September', type: 'autumn'},
            {id: 9, name: 'October', type: 'autumn'},
            {id: 10, name: 'November', type: 'autumn'},
            {id: 11, name: 'December', type: 'winter'}
        ];
        ctrl.dow = [
            {id: 0, name: 'Sunday', type: 'weekend'},
            {id: 1, name: 'Monday', type: 'weekday'},
            {id: 2, name: 'Tuesday', type: 'weekday'},
            {id: 3, name: 'Wednesday', type: 'weekday'},
            {id: 4, name: 'Thursday', type: 'weekday'},
            {id: 5, name: 'Friday', type: 'weekday'},
            {id: 6, name: 'Saturday', type: 'weekend'}
        ];

        ctrl.dailyRecurrence = 1;
        ctrl.weeklyRecurrence = 1;

        ctrl.saveCron = function () {
            console.log('result', dispatcherService.getCronPiece());
        };



    };


}(angular.module('app')));