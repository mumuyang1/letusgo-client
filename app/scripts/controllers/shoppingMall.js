'use strict';

angular.module('letusgoApp')
    .controller('ShoppingMallCtrl', function ($scope,CartItemService,ItemsService) {

        $scope.$emit('to-parent-shoppingMallActive');

        ItemsService.getItems(function(data){

          $scope.items = data;
        });

    });
