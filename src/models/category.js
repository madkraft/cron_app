(function (app) {
    'use strict';

    app.factory('Category', Category);


    function Category () {

        function category (obj) {
            this.title = obj.title,
            this.selected = obj.selected
        }

        return category
    }


}(angular.module('app')));
