'use strict';

angular.module('letusgoApp')
    .controller('CartCtrl', function ($scope,CartItemsService) {

        $scope.$emit('to-parent-cartActive');
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


        $scope.reduceButton = function (item) {

            $scope.$emit('to-parent-reduce',item);
            CartItemsService.reduceCartItem(item);
            updateTotalAndCart();
        };

        $scope.deleteButton = function (item) {


            $scope.$emit('to-parent-delete',item);
            CartItemsService.deleteCartItem(item);
            updateTotalAndCart();
        };

    });
