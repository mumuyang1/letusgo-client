'use strict';

angular.module('letusgoApp')
    .controller('CartCtrl', function ($scope,CartItemsService) {

        $scope.$emit('to-parent-cartActive');
        $scope.cartsums = CartItemsService.get('cartSum');
        updateTotalAndCart();

        function updateTotalAndCart(){

             CartItemsService.getCartItems(function(data){
               $scope.cartItems = data;

               $scope.getSubtotal = function(cartItem){
                 var subtotal = cartItem.item.price * cartItem.count;
                 return subtotal.toFixed(2);
               };
               $scope.total = CartItemsService.getTotal($scope.cartItems);
             });
        }


        $scope.addButton = function (item){

            $scope.$emit('to-parent-add',item);
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
