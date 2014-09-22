'use strict';
angular.module('letusgoApp')
  .controller('ProductManageCtrl', function ($http,$scope,CartItemService,categoryManageService,productManageService,ItemsService){


//      ItemsService.getItems(function(data){
//
//        $scope.allProducts = data;
//      });
      function refresh(){
        ItemsService.getItems(function(data){

          _.forEach(data,function(item){

            categoryManageService.getCategoryById(item.categoryId ,function(category){
              item.category = category;
              $scope.allProducts = data;

            });
          });
        });
      }

    refresh();

      $scope.$emit('to-parent-productManageActive');

      $scope.controlLayout = true;
      $scope.clickAddProduct = false;
      $scope.clickChangeProduct = false;

      $scope.addProduct = function(){
        $scope.clickAddProduct = true;
        $scope.controlLayout = false;
        $http.get('/api/categories')
          .success(function (data) {
            $scope.categories  =  data;
          });
      };

      $scope.finishAddProduct = function(name,price,unit,categoryName){
        $scope.clickAddProduct = false;
        $scope.controlLayout = true;
        categoryManageService. getCategoryByName(categoryName,function(data){

          var categoryId = data.id;
          productManageService.addProductButton(name,price,unit,categoryId);
          refresh();
        });
      };

      $scope.cancelAddProduct = function(){
        $scope.clickAddProduct = false;
        $scope.controlLayout = true;
      };


      $scope.changeProduct = function(item){

        categoryManageService.getCategoryById(item.categoryId,function(data){

          $scope.itemToChange = {
            name : item.name,
            price : item.price,
            unit : item.unit,
            categoryId : item.categoryId,
            category : data
          };
          CartItemService.set('productToChange',item.barcode);
          $scope.clickChangeProduct = true;
          $scope.controlLayout = false;
        });
      };


      $scope.finishChangeProduct = function(newName,newPrice,newUnit,newCategory){
        $scope.clickChangeProduct = false;
        $scope.controlLayout = true;

        $scope.productToChange = CartItemService.get('productToChange');
        productManageService.changeProduct($scope.productToChange,newName,newPrice,newUnit,newCategory);
        
        refresh();
      };


      $scope.cancelChangeProduct = function(){
        $scope.clickChangeProduct = false;
        $scope.controlLayout = true;
      };


      $scope.deleteProduct = function(id){

        productManageService.deleteProductButton(id);
        refresh();
      };

  });
