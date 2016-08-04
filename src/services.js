(function (app) {

    app.service('dispatcherService', dispatcherService);
    app.service('stateContainer', stateContainer);


    function dispatcherService() {

        var cron = {
            minutes: [],
            hours: [],
            days: [],
            months: [],
            dow: []
        };


        var getCronPiece = function (cronPiece) {
            if (cronPiece) {
                return cron[cronPiece];
            } else {
                return cron;
            }
        };

        var update = function (cronPiece, data, shift) {
            if (shift) {
                data++;
                var placeInArray = cron[cronPiece].indexOf(data);
            } else {
                var placeInArray = cron[cronPiece].indexOf(data);
            }


            if (placeInArray === -1) {
                cron[cronPiece].push(data);
            } else {
                cron[cronPiece].splice(placeInArray, 1);
            }
        };


        var clear = function (cronPiece) {
            if (cronPiece) {
                cron[cronPiece] = [];
            } else {
                Object.keys(cron).forEach(function (key) {
                    cron[key] = [];
                });
            }
        };

        return {
            update: update,
            getCronPiece: getCronPiece,
            clear: clear
        };

    }


    function stateContainer() {

        var cron = {
            minutes: '0',
            hours: '0',
            days: '*',
            months: '*',
            dow: '*'
        };

        return {
            set: set,
            get: get
        };

        function set(values) {
            // debugger
            cron.days = _calculateDays(values.date, values.weeks, values.dow);
            cron.dow = values.dow;
        }

        function get() {
            return cron;
        }

        function _calculateDays(date, weeks, dow) {
            if (weeks > 1) {
                return '*/' + (7 * parseFloat(weeks));
            } else if (date > 1) {
                return '*/' + date;
            } else {
                return '*';
            }


        }

    }


}(angular.module('app')));