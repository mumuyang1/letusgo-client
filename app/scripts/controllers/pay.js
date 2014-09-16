'use strict';

angular.module('letusgoApp')
    .controller('PayCtrl', function ($scope,CartItemService) {


      $scope.$emit('to-parent-cartActive');
      $scope.cartItems = CartItemService.get('cartProduct');
      $scope.total = CartItemService.getTotal($scope.cartItems);


      $scope.payButton = function(cartItems){
          $scope.$emit('to-parent-pay',cartItems,$scope.cartItems);
          $scope.cartItems = CartItemService.get('cartProduct');
          $scope.total = CartItemService.getTotal($scope.cartItems);
      };

    });
