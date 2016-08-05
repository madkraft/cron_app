(function (app) {

    app.controller('MainController', MainController);


    MainController.$inject = ['dispatcherService', 'cronService'];
    function MainController(dispatcherService, cronService) {
        var ctrl = this;

        // var generateNumbers = function (n, start) {
        //     var res = [];
        //     for (var i = start; i < n; i++) {
        //         res.push(i);
        //     }
        //     return res;
        // };

        // ctrl.minutes = generateNumbers(60, 0);
        // ctrl.hours = generateNumbers(24,0);
        // ctrl.days = generateNumbers(32, 1);
        // ctrl.months = [
        //     {id: 0, name: 'Jan', type: 'winter'},
        //     {id: 1, name: 'Febr', type: 'winter'},
        //     {id: 2, name: 'Mar', type: 'spring'},
        //     {id: 3, name: 'Apr', type: 'spring'},
        //     {id: 4, name: 'May', type: 'spring'},
        //     {id: 5, name: 'Jun', type: 'summer'},
        //     {id: 6, name: 'Jul', type: 'summer'},
        //     {id: 7, name: 'Aug', type: 'summer'},
        //     {id: 8, name: 'Sep', type: 'autumn'},
        //     {id: 9, name: 'Oct', type: 'autumn'},
        //     {id: 10, name: 'Nov', type: 'autumn'},
        //     {id: 11, name: 'Dec', type: 'winter'}
        // ];
        // ctrl.dow = [
        //     {id: 0, name: 'Sun', type: 'weekend'},
        //     {id: 1, name: 'Mon', type: 'weekday'},
        //     {id: 2, name: 'Tue', type: 'weekday'},
        //     {id: 3, name: 'Wed', type: 'weekday'},
        //     {id: 4, name: 'Thu', type: 'weekday'},
        //     {id: 5, name: 'Fri', type: 'weekday'},
        //     {id: 6, name: 'Sat', type: 'weekend'}
        // ];


        ctrl.checked = true;

        ctrl.date = {
            value: 1,
            label: 'date'
        };

        ctrl.weeks = {
            value: 1,
            label: 'weeks'
        };

        ctrl.dow = {
            value: '',
            label: 'dow'
        };

        ctrl.months = {
            value: '1',
            label: 'months'
        };

        ctrl.advanced = {
            value: '* * * * *'
        };

        ctrl.state = [
            {
                value: ctrl.weeks.value,
                label: ctrl.weeks.label
            }
        ];




        ctrl.setState = function () {
            ctrl.state = [];

            var args = Array.prototype.slice.call(arguments);

            _.each(args, function (argument) {
                ctrl.state.push(argument)
            });

        };

        ctrl.saveCron = function () {
            cronService.setCron(ctrl.state);
            console.log('result', cronService.getCron());
        };


    };


}(angular.module('app')));