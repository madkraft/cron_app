(function (app) {

    app.service('dispatcherService', dispatcherService);


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

    };


}(angular.module('app')));