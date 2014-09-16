'use strict';
angular.module('letusgoApp')
  .controller('ProductManageCtrl', function ($scope,CartItemService,categoryManageService,productManageService){

      $scope.allProducts = CartItemService.get('allProducts');
      $scope.$emit('to-parent-productManageActive');

      $scope.controlLayout = true;
      $scope.clickAddProduct = false;
      $scope.clickChangeProduct = false;

      $scope.addProduct = function(){
        $scope.clickAddProduct = true;
        $scope.controlLayout = false;
        $scope.categories = categoryManageService.getCategories();
      };

      $scope.finishAddProduct = function(name,price,unit,category){
        $scope.clickAddProduct = false;
        $scope.controlLayout = true;

        $scope.allProducts = CartItemService.get('allProducts');
        $scope.newProduct = {barcode:'ITEM000001',category:category,name:name,price:price,unit:unit};

        var i = +$scope.allProducts[$scope.allProducts.length - 1].barcode.substring(9,$scope.newProduct.barcode.length) + 1;
        $scope.newProduct.barcode = $scope.allProducts[$scope.allProducts.length - 1].barcode.substring(0,9) + i;

        $scope.allProducts.push($scope.newProduct);
        CartItemService.set('allProducts',$scope.allProducts);
      };

      $scope.cancelAddProduct = function(){
        $scope.clickAddProduct = false;
        $scope.controlLayout = true;
      };

      $scope.changeProduct = function(name){

        var productToChange = productManageService.getProductByName(name);
        $scope.itemToChange = {
            name : name,
            price : productToChange.price,
            unit : productToChange.unit,
            category : productToChange.category
        };

        $scope.clickChangeProduct = true;
        $scope.controlLayout = false;
        $scope.categories = categoryManageService.getCategories();
        CartItemService.set('productToChange',name);
      };

      $scope.finishChangeProduct = function(newName,newPrice,newUnit,newCategory){
        $scope.clickChangeProduct = false;
        $scope.controlLayout = true;

        $scope.productToBeChange = CartItemService.get('productToChange');
        productManageService.changeProduct($scope.productToBeChange,newName,newPrice,newUnit,newCategory);
        $scope.allProducts = CartItemService.get('allProducts');
      };

      $scope.cancelChangeProduct = function(){
        $scope.clickChangeProduct = false;
        $scope.controlLayout = true;
      };

      $scope.deleteProduct = function(name){
        productManageService.deleteProductButton(name);
        $scope.allProducts = CartItemService.get('allProducts');
      };

  });
