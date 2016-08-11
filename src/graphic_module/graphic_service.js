(function (app) {

    app.service('graphicService', graphicService);

    function graphicService() {



        var moduleState = {};



        return {
            getDOW: getDOW,
            setState: setState,
        };




        function getDOW() {
            return dow;
        }

        function setState(state) {
            moduleState = state;
            console.log(moduleState);
        }

    }


}(angular.module('app')));