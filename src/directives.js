(function (app) {

    app.directive('toggleSelected', toggleSelected);
    app.directive('toggleActive', toggleActive);
    app.directive('setState', setState);
    app.directive('addToSelected', addToSelected);
    app.directive('selectEach', selectEach);
    app.directive('clearCells', clearCells);
    app.directive('switchPanel', switchPanel);


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


    function setState() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {
            // scope.$apply(function () {
            //     scope.ctrl.state.label =  attrs.setState;
            // });

            // scope.ctrl.state.label =  attrs.setState;

            console.log('', scope.ctrl.state);
            console.log('', attrs.setState);

            el.on('click', function () {
                scope.$apply(function () {
                    scope.ctrl.state.label =  attrs.setState;
                });
            });
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
                var cronPiece = el.closest('.cron-container')[0].getAttribute('id');
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

            el.on('click', handleChange);
            el.on('input', handleChange);


            function handleChange() {
                var cronPiece = attrs.cronpiece,
                    cells = el.closest('.cron-section').find('.js-' + cronPiece),
                    range = attrs["selectEach"];

                if (range) {
                    addWithInterval(cronPiece, cells, range);
                } else {
                    addAll(cronPiece, cells);
                }
            };

            function addWithInterval(cronPiece, cells, range) {
                dispatcherService.clear(cronPiece);
                for (var i=0; i < cells.length; i++) {
                    cells[i].setAttribute('data-state', 'normal');

                    // console.log('needShift', needShift(cronPiece));
                    add(cronPiece, cells, checkCronType(cronPiece, range, i), needShift(cronPiece));

                }

                // console.log('data', dispatcherService.getCronPiece());
            }
            function addAll(cronPiece, cells) {
                dispatcherService.clear(cronPiece);
                for (var i = 0; i < cells.length; i++) {
                    add(cronPiece, cells, i, needShift(cronPiece));
                }
                // console.log('after all:', dispatcherService.getCronPiece());
            };

            function add(cronPiece, cells, i, shift) {
                if (typeof i !== 'undefined') {
                    dispatcherService.update(cronPiece, i, shift);
                    cells[i].setAttribute('data-state', 'active');
                } else {
                    return;
                }
            };

            function checkCronType(cronPiece, range, i) {
                 if (isNaN(range)) {
                    return range === 'odd' ? oddNum(i) : getObjectId(cronPiece, range, i)
                 } else {
                    return evenNum(range, i)
                 }

            };

            function getObjectId(cronPiece, range, i) {
                if (range === scope.ctrl[cronPiece][i].type) {
                    return scope.ctrl.months[i].id;
                } else {
                    return;
                }
            }


            function oddNum(i) {
                if (Math.abs(i % 2) == 1) {
                    return i;
                } else {
                    return;
                }
            };


            function evenNum(range, i) {
                if (i % range === 0) {
                    return i;
                }
            };

            function needShift(cronPiece) {
                if (cronPiece === 'months') {
                    return true;
                } else {
                    return scope.ctrl[cronPiece][0] === 1
                }
            };
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



    function switchPanel() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attrs) {

            var panelId = el[0].getAttribute('switch-panel'),
                element = angular.element('#' + panelId);


            var hideElements = function () {
                var allCronContainers = element.parent().children('[data-state]');
                for (var i = 0; i < allCronContainers.length; i++) {
                    allCronContainers[i].setAttribute('data-state', 'hidden');
                }
            };

            var toggleState = function(elem, one, two){
                hideElements();
                var currentAttr = elem.getAttribute("data-state");
                elem.setAttribute(
                    'data-state',
                    currentAttr === one ?  two : one
                );
            };

            el.on('click', toggleState.bind(null, element[0], 'active', 'hidden'));
        }
    }





}(angular.module('app')));