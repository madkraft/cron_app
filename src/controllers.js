(function (app) {

    app.controller('MainController', MainController);



    function MainController() {
        var ctrl = this;

        ctrl.cron = "";
        ctrl.result = "";
        ctrl.next = 'next at 2016-08-01 14:15';

        var weekdays = {
            0: 'Sun',
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thu',
            5: 'Fri',
            6: 'Sat',
            '*': 'every!!!'
        };

        var months = {
            1:  'Jan',
            2:  'Feb',
            3:  'Mar',
            4:  'Apr',
            5:  'May',
            6:  'Jun',
            7:  'Jul',
            8:  'Aug',
            9:  'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec'
        }


        // var isNumber = ????

        var checkLength = function (val) {
            if (val && val.length <= 2) {
                return val;
            } else {
                return;
            }
        };

        var checkLimit = function (val, max, min) {
            if (val <= max && val >= min || val === '*') {
                return val;
            } else {
                return;
            }
        };

        var validateMinutes = function (val) {
            var checkedVal = checkLength(val);
            return checkLimit(checkedVal, 59, 0);
        };

        var validateHours = function (val) {
            var checkedVal = checkLength(val);
            return checkLimit(checkedVal, 23, 0);
        };

        var validateDate = function (val) {
            var checkedVal = checkLength(val);
            return checkLimit(checkedVal, 31, 1);
        };

        var validateMonth = function (val) {
            var checkedVal = checkLength(val);
            return checkLimit(checkedVal, 12, 1);
        };

        var validateWeekday = function (val) {
            var checkedVal = checkLength(val);
            return checkLimit(checkedVal, 6, 0);
        };


        ctrl.submit = function (e) {
            var cronArray = ctrl.cron.split(' '),
                minute = cronArray[0],
                hour = cronArray[1],
                date = cronArray[2],
                month = cronArray[3],
                weekday = cronArray[4];

            var m = validateMinutes(minute),
                h = validateHours(hour),
                d = validateDate(date),
                M = validateMonth(month),
                w = validateWeekday(weekday);

            if (m && h && d && M && w) {
                ctrl.result = 'At ' + h + ':' + m + ' on the ' + d + 'th and every ' + weekdays[w] + ' in ' + months[M];
            } else if (M === '*') {
                ctrl.result = 'At ' + h + ':' + m + ' on the ' + d + 'th of every month ' + weekdays[w];
            } else {
                ctrl.result = 'WRONG!';
            }

            console.log('result:', minute + ' ' + hour + ' ' + date + ' ' + month + ' ' + weekday);
        }




    };


}(angular.module('app')));