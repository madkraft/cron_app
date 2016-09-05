(function (app) {
    'use strict';

    app.factory('Panel', Panel);


    function Panel () {

        function panel (obj) {
            this.title = obj.title,
            this.selected = obj.selected
        }

        return panel
    }


}(angular.module('app')));
