(function (app) {
    'use strict';

    app.service('categoryCollection', categoryCollection);

    categoryCollection.$inject = ['$rootScope'];
    function categoryCollection ($rootScope) {

        var categories = [
            {title: 'Hourly', selected: true, panelId: 1},
            {title: 'Daily', selected: false, panelId: 2},
            {title: 'Weekly', selected: false, panelId: 3},
            {title: 'Monthly', selected: false, panelId: 4},
            {title: 'Yearly', selected: false, panelId: 5},
            {title: 'Advanced', selected: false, panelId: 6},
        ];


        function getCategories () {
            return categories;
        }

        function selectCategory (category) {
            var indexInArray = categories.indexOf(category)
            if (indexInArray > -1) {
                categories.forEach(function (cat) {
                    cat.selected = false;
                });
                categories[indexInArray].selected = true;
                $rootScope.$broadcast('categoriesCollection::selectedCategory', {category: category})
            }
        }

        return {
            getCategories: getCategories,
            selectCategory: selectCategory
        };
    }


}(angular.module('app')));
