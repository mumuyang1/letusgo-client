'use strict';

angular.module('letusgoApp')
    .controller('CartCtrl', function ($scope,CartItemService) {

        $scope.$emit('to-parent-cartActive');
        $scope.cartItems = CartItemService.get('cartProduct');
        $scope.cartsums = CartItemService.get('cartSum');
        $scope.total = CartItemService.getTotal($scope.cartItems);

        $scope.addButton = function (cartItems){

            $scope.$emit('to-parent-add',cartItems,$scope.cartItems);
            $scope.cartItems = CartItemService.get('cartProduct');
            $scope.total = CartItemService.getTotal($scope.cartItems);

        };

        $scope.reduceButton = function (cartItems) {

            $scope.$emit('to-parent-reduce',cartItems,$scope.cartItems);
            $scope.cartItems = CartItemService.get('cartProduct');
            $scope.total = CartItemService.getTotal($scope.cartItems);
        };

        $scope.deleteButton = function (cartItems) {
            $scope.$emit('to-parent-delete',cartItems,$scope.cartItems);
            $scope.cartItems = CartItemService.get('cartProduct');
            $scope.total = CartItemService.getTotal($scope.cartItems);
        };
    });
