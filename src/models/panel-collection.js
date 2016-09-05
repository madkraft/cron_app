(function (app) {
    'use strict';

    app.service('panelCollection', panelCollection);

    panelCollection.$inject = ['$rootScope'];
    function panelCollection ($rootScope) {

        var hourly = {
            start: '00',
            end: '23',
            recurrent: '02',
            panelId: 1,
            name: 'hourly',
            choices: [
                {value: 2, label: 'First choice', selected: true},
                {value: 4, label: 'Second choice', selected: false}
            ]
        };


        var daily = {
            panelId: 2,
            name: 'daily',
            choices: [
                {value: 2, label: 'Third choice', selected: true},
                {value: 4, label: 'Forth choice', selected: false}
            ]
        };

        var weekly = {
            panelId: 3,
            name: 'weekly',
            choices: [
                {value: 2, label: 'Fifth choice', selected: true},
                {value: 4, label: 'Sixth choice', selected: false}
            ]
        };

        var monthly = {
            panelId: 4,
            name: 'monthly',
            choices: [
                {value: 2, label: 'First choice', selected: true},
                {value: 4, label: 'Second choice', selected: false}
            ]
        };

        var yearly = {
            panelId: 5,
            name: 'yearly'
        };

        var advanced = {
            panelId: 6,
            name: 'advanced'
        };

        var panels = [hourly, daily, weekly, monthly, yearly, advanced];

        var selectedPanel = panels[0];


        function getPanels () {
            return panels;
        }

        function selectPanel (category) {
            panels.forEach(function (panel) {
                if (panel.panelId === category.panelId) {
                    selectedPanel = panel;
                    $rootScope.$broadcast('panelsCollection::changedActivePanel', {panel: selectedPanel})
                }
            });

        }

        return {
            getPanels: getPanels,
            selectPanel: selectPanel,
            selectedPanel: selectedPanel
        };
    }


}(angular.module('app')));
