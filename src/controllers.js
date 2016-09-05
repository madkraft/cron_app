(function (app) {

    app.controller('MainController', MainController);


    MainController.$inject = ['$scope', 'dispatcherService', 'cronService', 'categoryCollection', 'panelCollection'];
    function MainController($scope, dispatcherService, cronService, categoryCollection, panelCollection) {
        var ctrl = this;


        window.categories = categoryCollection;
        window.panels = panelCollection;

        ctrl.categories = categoryCollection.getCategories();
        ctrl.onCategoryClick = function (category) {
            categoryCollection.selectCategory(category);
        };

        ctrl.activePanel = 'hourly';

        $scope.$on('categoriesCollection::selectedCategory', function(event, data) {
            panelCollection.selectPanel(data.category);
        });

        $scope.$on('panelsCollection::changedActivePanel', function(event, data) {
            ctrl.activePanel = data.panel.name;
        });





        var generateNumbers = function (n, start) {
            var res = [];
            for (var i = start; i < n; i++) {
                res.push(i);
            }
            return res;
        };


        ctrl.days = generateNumbers(32, 1);

        ctrl.monthsOfYear = [
            {value: 0, label: 'January', type: 'winter'},
            {value: 1, label: 'February', type: 'winter'},
            {value: 2, label: 'March', type: 'spring'},
            {value: 3, label: 'April', type: 'spring'},
            {value: 4, label: 'May', type: 'spring'},
            {value: 5, label: 'June', type: 'summer'},
            {value: 6, label: 'July', type: 'summer'},
            {value: 7, label: 'August', type: 'summer'},
            {value: 8, label: 'September', type: 'autumn'},
            {value: 9, label: 'October', type: 'autumn'},
            {value: 10, label: 'November', type: 'autumn'},
            {value: 11, label: 'December', type: 'winter'}
        ];

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
        ctrl.selectedMonth = ctrl.monthsOfYear[0];

        ctrl.selectOrdItem = function(item) {
            ctrl.selectedOrdinal = item;
            ctrl.date.value = item.value
        };

        ctrl.selectDOW = function (item) {
            ctrl.selectedDOW = item;
            ctrl.dow.value = item.value;
        };

        ctrl.selectMonth = function (item) {
            ctrl.selectedMonth = item;
            ctrl.dow.value = item.value;
        };


        ctrl.checked = true;

        ctrl.onClickSelect = function(event) {
            event.target.select();
        };

        ctrl.showGraphicPanel = false;
        ctrl.toggleGraphicPanel = function(evt) {
            console.log('', evt);
            ctrl.showGraphicPanel = !ctrl.showGraphicPanel;
        };

        ctrl.hours = {
            start: '00',
            end: '23',
            recurrent: '02',
            label: 'hours'
        };


        ctrl.date = {
            value: '2',
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
                value: ctrl.date.value,
                label: ctrl.date.label,
                showGraphicPanel: false
            }
        ];




        ctrl.setState = function () {
            ctrl.showGraphicPanel = false;
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