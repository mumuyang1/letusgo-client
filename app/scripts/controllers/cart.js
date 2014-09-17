'use strict';

angular.module('letusgoApp')
    .controller('CartCtrl', function ($scope,CartItemService) {

        $scope.$emit('to-parent-cartActive');
        $scope.cartsums = CartItemService.get('cartSum');
        $scope.cartItems = CartItemService.get('cartProduct');
        $scope.total = CartItemService.getTotal($scope.cartItems);

        $scope.updateTotalAndCart = function(){
             $scope.cartItems = CartItemService.get('cartProduct');
             $scope.total = CartItemService.getTotal($scope.cartItems);
        };


        $scope.addButton = function (cartItems){

            $scope.$emit('to-parent-add',cartItems,$scope.cartItems);
            $scope.updateTotalAndCart();
        };


        $scope.reduceButton = function (cartItems) {

            $scope.$emit('to-parent-reduce',cartItems,$scope.cartItems);
            $scope.updateTotalAndCart();
        };


        $scope.deleteButton = function (cartItems) {
            $scope.$emit('to-parent-delete',cartItems,$scope.cartItems);
            $scope.updateTotalAndCart();
        };

    });
