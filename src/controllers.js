(function (app) {

    app.controller('MainController', MainController);



    function MainController() {
        var ctrl = this;

        ctrl.cron = "";
        ctrl.result = "";
        // ctrl.next = 'next at 2016-08-01 14:15';

        var WEEKDAYS = {
            0: 'Sun',
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thu',
            5: 'Fri',
            6: 'Sat'
        };

        var MONTHS = {
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
        };




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


        var resultBuilder = function (cron) {

            // 22

            var resultMsg = {
                minutes: 'At every minute of ' + cron.hours + 'th hour on the ' + cron.days + 'th and every ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months],
                minutes_hours: 'At every minute on the ' + cron.days + 'th and every ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months],
                minutes_hours_days: 'At every minute on ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months],
                minutes_hours_days_months: 'At every minute on ' + WEEKDAYS[cron.weekdays],
                minutes_hours_days_months_weekdays: 'At every minute',
                hours: 'At every ' + cron.minutes + 'th minute past every hour on the ' + cron.days + 'th and every ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months],
                hours_days: 'At every ' + cron.minutes + 'th minute past every hour on ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months],
                hours_days_months: 'At every ' + cron.minutes + 'th minute past every hour on ' + WEEKDAYS[cron.weekdays],
                hours_days_months_weekdays: 'At every ' + cron.minutes + 'th minute past every hour',
                days: 'At ' + cron.hours + ':' + cron.minutes + ' on ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months],
                days_months: 'At ' + cron.hours + ':' + cron.minutes + ' on ' + WEEKDAYS[cron.weekdays],
                days_weekdays: 'At ' + cron.hours + ':' + cron.minutes + ' every day in ' + MONTHS[cron.months],
                days_months_weekdays: 'At ' + cron.hours + ':' + cron.minutes + ' every day',
                months: 'At ' + cron.hours + ':' + cron.minutes + ' on the ' + cron.days + 'th of every month and every ' + WEEKDAYS[cron.weekdays],
                months_weekdays: 'At ' + cron.hours + ':' + cron.minutes + ' on the ' + cron.days + 'th of every month',
                weekdays: 'At ' + cron.hours + ':' + cron.minutes + ' on the ' + cron.days + 'th in ' + MONTHS[cron.months],

            };

            var allVals = [];

            // * 5 8 7 4

            Object.keys(cron).forEach(function(key) {
                if (cron[key] === '*') {
                    allVals.push(key);
                }
            });

            if (allVals.length) {
                return resultMsg[allVals.join('_')];
            } else {
                return 'At ' + cron.hours + ':' + cron.minutes + ' on the ' + cron.days + 'th and every ' + WEEKDAYS[cron.weekdays] + ' in ' + MONTHS[cron.months];
            }

        };


        var nextExecution = function (cron) {

            // var timeUTC  = Math.round(new Date().getTime()/1000.0);
            // var timeUTC  = new Date().getTime();


            if (cron.minutes !== '*' && cron.hours !== '*') {
                var timeUTC  = new Date().getTime();

                while (newMinutes !== parseFloat(cron.minutes)) {
                    debugger;
                    timeUTC += 60000;
                    var newDate = new Date(timeUTC);
                    var newMinutes = newDate.getMinutes();
                }

                while (newHours !== parseFloat(cron.hours)) {
                    debugger;
                    timeUTC += 60000*60;
                    var newDate = new Date(timeUTC);
                    var newHours = newDate.getHours();
                }
                return newDate.toTimeString();
            }
        };


        ctrl.submit = function (e) {
            var cronArray = ctrl.cron.split(' '),
                minute = cronArray[0],
                hour = cronArray[1],
                date = cronArray[2],
                month = cronArray[3],
                weekday = cronArray[4];

            var cron = {
                minutes: validateMinutes(minute),
                hours: validateHours(hour),
                days: validateDate(date),
                months: validateMonth(month),
                weekdays: validateWeekday(weekday)
            };

            if (cronArray.length === 5 && cron.minutes && cron.hours && cron.days && cron.months && cron.weekdays) {
                ctrl.result = resultBuilder(cron);
                ctrl.next = nextExecution(cron);
            } else {
                ctrl.result = 'Please type in correct cron expression';
            }

        }




    };


}(angular.module('app')));



// C = "5 4 * * *"
//           , M = {
//             minute: "* * * * *",
//             "1-minute": "* * * * *",
//             "2-minutes": "*/2 * * * *",
//             "even-minute": "*/2 * * * *",
//             "uneven-minute": "1/2 * * * *",
//             "3-minutes": "*/3 * * * *",
//             "4-minutes": "*/4 * * * *",
//             "5-minutes": "*/5 * * * *",
//             "five-minutes": "*/5 * * * *",
//             "6-minutes": "*/6 * * * *",
//             "10-minutes": "*/10 * * * *",
//             "ten-minutes": "*/10 * * * *",
//             "quarter-hour": "*/15 * * * *",
//             "20-minutes": "*/20 * * * *",
//             "30-minutes": "*/30 * * * *",
//             "hour-at-30-minutes": "*/30 * * * *",
//             "half-hour": "*/30 * * * *",
//             "60-minutes": "0 * * * *",
//             hour: "0 * * * *",
//             "1-hour": "0 * * * *",
//             "2-hours": "0 */2 * * *",
//             "two-hours": "0 */2 * * *",
//             "even-hour": "0 */2 * * *",
//             "other-hour": "0 */2 * * *",
//             "3-hours": "0 */3 * * *",
//             "three-hours": "0 */3 * * *",
//             "4-hours": "0 */4 * * *",
//             "6-hours": "0 */6 * * *",
//             "six-hours": "0 */6 * * *",
//             "8-hours": "0 */8 * * *",
//             "12-hours": "0 */12 * * *",
//             day: "0 0 * * *",
//             night: "0 0 * * *",
//             "day-at-1am": "0 1 * * *",
//             "day-at-2am": "0 2 * * *",
//             "day-8am": "0 8 * * *",
//             morning: "0 9 * * *",
//             midnight: "0 0 * * *",
//             "day-at-midnight": "0 0 * * *",
//             "night-at-midnight": "0 0 * * *",
//             sunday: "0 0 * * SUN",
//             monday: "0 0 * * MON",
//             tuesday: "0 0 * * TUE",
//             wednesday: "0 0 * * WED",
//             thursday: "0 0 * * THU",
//             friday: "0 0 * * FRI",
//             "friday-at-midnight": "0 0 * * FRI",
//             saturday: "0 0 * * SAT",
//             weekday: "0 0 * * MON-FRI",
//             "7-days": "0 0 * * 0",
//             week: "0 0 * * 0",
//             month: "0 0 1 * *",
//             "last-day-month": "0 0 L * *",
//             "end-of-month": "0 0 L * *",
//             "other-month": "0 0 1 */2 *",
//             quarter: "0 0 1 */3 *",
//             "6-months": "0 0 1 */6 *",
//             year: "0 0 1 1 *"