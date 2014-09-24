'use strict';

angular.module('letusgoApp')
    .controller('CartCtrl', function ($scope,CartItemsService) {

        $scope.$emit('to-parent-cartActive');
        $scope.cartsums = CartItemsService.get('cartSum');
        updateTotalAndCart();


        function updateTotalAndCart(){

             CartItemsService.getCartItems(function(data){
               $scope.cartItems = data;
             });
             $scope.total = CartItemsService.getTotal($scope.cartItems);
        }


        $scope.addButton = function (cartItems){

            $scope.$emit('to-parent-add',cartItems,$scope.cartItems);
            updateTotalAndCart();
        };


        $scope.reduceButton = function (cartItems) {

            $scope.$emit('to-parent-reduce',cartItems,$scope.cartItems);
            updateTotalAndCart();
        };


        $scope.deleteButton = function (cartItems) {
            $scope.$emit('to-parent-delete',cartItems,$scope.cartItems);
            updateTotalAndCart();
        };

    });
