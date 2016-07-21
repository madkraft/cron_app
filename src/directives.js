(function (app) {

    app.directive('toggleSelected', toggleSelected);
    app.directive('toggleActive', toggleActive);
    app.directive('addToSelected', addToSelected);
    app.directive('selectEach', selectEach);
    app.directive('clearCells', clearCells);


    function toggleSelected() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var clearControls = function () {
                var buttons = el.parent().next().children();
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].setAttribute('data-state', 'normal');
                }
            }

            var toggleState = function(elem, one, two){
                var currentAttr = elem.getAttribute("data-state");
                clearControls();
                elem.setAttribute(
                    'data-state',
                    currentAttr === one ?  two : one
                );
            };

            el.on('click', toggleState.bind(null, el[0], 'active', 'normal'));

        }
    }

    function toggleActive() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var toggleState = function(elem, one, two){

                var buttons = el.parent().children();
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].setAttribute('data-state', 'normal');
                }

                var currentAttr = elem.getAttribute("data-state");
                elem.setAttribute(
                    'data-state',
                    currentAttr === one ?  two : one
                );
            };

            el.on('click', toggleState.bind(null, el[0], 'active', 'normal'));

        }
    }


    addToSelected.$inject = ['dispatcherService'];
    function addToSelected(dispatcherService) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {
            var handleClick = function(){
                var cronPiece = el.parent().parent()[0].getAttribute('id');

                if (Object.keys(scope[cronPiece]).length) {
                    dispatcherService.update(cronPiece, scope[cronPiece].id, false);
                } else {
                    dispatcherService.update(cronPiece, scope[cronPiece], false);
                }

                console.log('after click:', dispatcherService.getCronPiece());
            };

            el.on('click', handleClick);
        }
    }

    selectEach.$inject = ['dispatcherService'];
    function selectEach(dispatcherService) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {


            var add = function (cronPiece, cells, i, shift) {
                if (typeof i !== 'undefined') {
                    dispatcherService.update(cronPiece, i, shift);
                    cells[i].setAttribute('data-state', 'active');
                } else {
                    return;
                }
            };

            var addAll = function (cronPiece, cells) {
                dispatcherService.clear(cronPiece);
                for (var i = 0; i < cells.length; i++) {
                    add(cronPiece, cells, i, needShift(cronPiece));
                }
                console.log('after all:', dispatcherService.getCronPiece());
            };

            var addWithInterval = function (cronPiece, cells, range) {

                dispatcherService.clear(cronPiece);
                for (var i=0; i < cells.length; i++) {
                    cells[i].setAttribute('data-state', 'normal');

                    console.log('needShift', needShift(cronPiece));
                    add(cronPiece, cells, checkCronType(cronPiece, range, i), needShift(cronPiece));

                }

                console.log('data', dispatcherService.getCronPiece());
            }

            var checkCronType = function (cronPiece, range, i) {

                 if (isNaN(range)) {
                    return range === 'odd' ? oddNum(i) : getObjectId(cronPiece, range, i)
                 } else {
                    return evenNum(range, i)
                 }

            };

            var getObjectId = function (cronPiece, range, i) {
                if (range === scope.ctrl[cronPiece][i].type) {
                    return scope.ctrl.months[i].id;
                } else {
                    return;
                }
            }


            var oddNum = function (i) {
                if (Math.abs(i % 2) == 1) {
                    return i;
                } else {
                    return;
                }
            };


            var evenNum = function (range, i) {
                if (i % range === 0) {
                    return i;
                }
            };


            var needShift = function (cronPiece) {
                if (cronPiece === 'months') {
                    return true;
                } else {
                    return scope.ctrl[cronPiece][0] === 1
                }
            };


            var handleClick = function(){
                var cells = el.parent().prev().children(),
                    cronPiece = el.parent().parent()[0].getAttribute('id'),
                    range = attrs["selectEach"];

                if (range) {
                    addWithInterval(cronPiece, cells, range);
                } else {
                    addAll(cronPiece, cells);
                }

            };

            el.on('click', handleClick);

        }
    }

    clearCells.$inject = ['dispatcherService'];
    function clearCells(dispatcherService) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var clearSelectedCells = function (cells) {
                for (var i = 0; i < cells.length; i++) {
                    cells[i].setAttribute('data-state', 'normal');
                }
            };

            var clearControls = function () {
                var buttons = el.parent().children();
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].setAttribute('data-state', 'normal');
                }
            }

            var handleClick = function(){
                var cells = el.parent().prev().children(),
                    cronPiece = el.parent().parent()[0].getAttribute('id');

                dispatcherService.clear(cronPiece);

                clearSelectedCells(cells);
                clearControls();

                console.log('after clear:', dispatcherService.getCronPiece());
            };

            el.on('click', handleClick);
        }
    }



}(angular.module('app')));