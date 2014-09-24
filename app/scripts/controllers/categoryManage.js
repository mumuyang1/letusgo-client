'use strict';

angular.module('letusgoApp')
.controller('CategoryManageCtrl', function ($scope,categoryManageService,CartItemsService) {

    $scope.$emit('to-parent-productManageActive');


    function refresh(){
        categoryManageService.getCategories(function(data){
         $scope.categories = data;
        });
    }

    refresh();

    $scope.clickAddCategory = false;
    $scope.clickChangeCategory = false;
    $scope.clickDelete = false;


    $scope.addCategory = function(){
      $scope.clickAddCategory = true;
    };


    $scope.finishAddCategory = function(newCategoryName){

      if(newCategoryName){
        categoryManageService.addCategory(newCategoryName,function(){
          refresh();
        });
      }
      $scope.clickAddCategory = false;

    };


    $scope.cancelAddCategory = function(){
      $scope.clickAddCategory = false;
    };


    $scope.deleteCategory = function(category){


      categoryManageService.hasProductsInTheCategory(category.id,function(data){
        if(data){
          $scope.clickDelete = true;

        }else{

          categoryManageService.deleteCategoryButton(category.id);
          refresh();
        }
      });
    };

    $scope.cancelDelete = function(){
      $scope.clickDelete = false;
    };

    $scope.changeCategory = function(category){
      $scope.newName = category.name;
      $scope.clickChangeCategory = true;
      CartItemsService.set('categoryToChange',category.id);
    };


    $scope.finishChangeCategory = function(newName){
      $scope.clickChangeCategory = false;
      $scope.categoryId = CartItemsService.get('categoryToChange');
      categoryManageService.changeName($scope.categoryId,newName);
      refresh();
    };


    $scope.cancelChangeCategory = function(){
      $scope.clickChangeCategory = false;
    };

});
