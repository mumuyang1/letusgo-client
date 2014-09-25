'use strict';

angular.module('letusgoApp')
    .controller('CartSumsCtrl', function ($scope,ItemsService, CartItemsService) {

      var temp = CartItemsService.get('cartSum');
      var cartSum = temp ? parseInt(temp) : 0;

      CartItemsService.set('cartSum',cartSum);
      $scope.cartsums = CartItemsService.get('cartSum');

      $scope.addCartSum = function(item){
        $scope.cartsums = ItemsService.addCart(item);
      };


       $scope.$on('to-parent-add',function(add, item){

          $scope.cartsums = CartItemsService.add(item);
        });


      $scope.$on('to-parent-reduce',function(reduce,cartItem){

        CartItemsService.getCartItems(function(data) {

          $scope.cartsums = CartItemsService.judgeCount(data, cartItem)
        });
      });

    $scope.$on('to-parent-delete',function(event,cartItem){

      CartItemsService.getCartItems(function(data) {

        $scope.cartsums = CartItemsService.delete(data, cartItem);
      });
     });

      $scope.$on('to-parent-pay',function(pay,cartItems,cartProduct){
          $scope.cartsums = CartItemsService.pay(cartItems,cartProduct);
      });

      $scope.$on('to-parent-mainActive', function () {
          $scope.mainActive = true;
          $scope.shoppingMallActive = false;
          $scope.cartActive = false;
          $scope.productManageActive = false;
      });

      $scope.$on('to-parent-shoppingMallActive', function () {
          $scope.mainActive = false;
          $scope.shoppingMallActive = true;
          $scope.cartActive = false;
          $scope.productManageActive = false;
      });

      $scope.$on('to-parent-cartActive', function () {
          $scope.mainActive = false;
          $scope.shoppingMallActive = false;
          $scope.cartActive = true;
          $scope.productManageActive = false;
      });

      $scope.$on('to-parent-productManageActive', function () {
          $scope.mainActive = false;
          $scope.shoppingMallActive = false;
          $scope.cartActive = false;
          $scope.productManageActive = true;
      });

    });
