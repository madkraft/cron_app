(function (app) {

    app.service('dispatcherService', dispatcherService);
    app.service('cronService', cronService);


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


    function cronService() {
        var cron;

        return {
            setCron: setCron,
            getCron: getCron
        };

        function setCron(state) {

            cron = {
                minutes: '0',
                hours: '0',
                days: '*',
                months: '*',
                dow: '*'
            };

            if (state.label === 'weeks') {
                cron.days = _calculateWeeks(parseFloat(state.value));
            } else if (state.label === 'date') {
                cron.days = _calculateDate(parseFloat(state.value));
            } else if (state.label === 'dow') {
                cron.dow = state.value;
            }

        }

        function getCron() {
            return cron;
        }

        function _calculateDate(date) {
            if (date === 1) {
                return '*'
            } else {
                return '*/' + date;
            }
        }

        function _calculateWeeks(weeks) {
            return '*/' + (7 * weeks);
        }


    }


}(angular.module('app')));