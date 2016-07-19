(function (app) {

    app.directive('addToSelected', addToSelected);
    app.directive('everyMinute', everyMinute);
    app.directive('clearCells', clearCells);


    function addToSelected() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var toggleState = function(elem, one, two){
                var currentAttr = elem.getAttribute("data-state");
                elem.setAttribute(
                    'data-state',
                    currentAttr === one ?  two : one
                );
                scope.ctrl.selectedMinutes.push(scope.minute);
            };

            el.on('click', toggleState.bind(null, el[0], 'active', 'normal'));

        }
    }


    function everyMinute() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var handleClick = function(){
                var cells = el.parent().prev().children();

                scope.ctrl.selectedMinutes = scope.ctrl.minutes.map(function (min) {
                    return min;
                });

                for (var i = 0; i < cells.length; i++) {
                    console.log('', i%5);
                    cells[i].setAttribute('data-state', 'active');
                }
            };

            el.on('click', handleClick);

        }
    }


    function clearCells() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var handleClick = function(){
                var cells = el.parent().prev().children();

                scope.ctrl.selectedMinutes = [];

                for (var i = 0; i < cells.length; i++) {
                    console.log('', cells[i]);
                    cells[i].setAttribute('data-state', 'normal');
                }
            };

            el.on('click', handleClick);

        }
    }



}(angular.module('app')));