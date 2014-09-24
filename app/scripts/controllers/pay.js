'use strict';

angular.module('letusgoApp')
    .controller('PayCtrl', function ($scope,CartItemsService) {


      $scope.$emit('to-parent-cartActive');
      $scope.cartItems = CartItemsService.get('cartProduct');
      $scope.total = CartItemsService.getTotal($scope.cartItems);


      $scope.payButton = function(cartItems){
          $scope.$emit('to-parent-pay',cartItems,$scope.cartItems);
          $scope.cartItems = CartItemsService.get('cartProduct');
          $scope.total = CartItemsService.getTotal($scope.cartItems);
      };

    });
