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

        ctrl.ordinalNumbers = [
            {label: 'first', value: '1-7'},
            {label: 'second', value: '8-14'},
            {label: 'third', value: '15-21'},
            {label: 'fourth', value: '22-28'}
        ];

        ctrl.daysOfWeek = [
            {value: 0, label: 'Sunday', type: 'weekend'},
            {value: 1, label: 'Monday', type: 'weekday'},
            {value: 2, label: 'Tuesday', type: 'weekday'},
            {value: 3, label: 'Wednesday', type: 'weekday'},
            {value: 4, label: 'Thursday', type: 'weekday'},
            {value: 5, label: 'Friday', type: 'weekday'},
            {value: 6, label: 'Saturday', type: 'weekend'}
        ];

        ctrl.selectedOrdinal = ctrl.ordinalNumbers[0];
        ctrl.selectedDOW = ctrl.daysOfWeek[1];

        ctrl.selectOrdItem = function(item) {
            ctrl.selectedOrdinal = item;
            ctrl.date.value = item.value
        };

        ctrl.selectDOW = function (item) {
            ctrl.selectedDOW = item;
            ctrl.dow.value = item.value;
        };


        ctrl.checked = true;

        ctrl.onClickSelect = function(event) {
            event.target.select()
        };


        ctrl.hours = {
            start: '00',
            end: '23',
            recurrent: '02',
            label: 'hours'
        };


        ctrl.date = {
            value: '01',
            label: 'date'
        };

        ctrl.weeks = {
            value: 1,
            label: 'weeks'
        };

        ctrl.dow = {
            value: '1-7',
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
            var args = Array.prototype.slice.call(arguments);

            ctrl.state = [];

            _.each(args, function (argument) {
                ctrl.state.push(argument);
            });

        };


        ctrl.saveCron = function () {
            cronService.setCron(ctrl.state);
            console.log('result', cronService.getCron());
        };


    };


}(angular.module('app')));