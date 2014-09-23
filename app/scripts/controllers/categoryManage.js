'use strict';

angular.module('letusgoApp')
.controller('CategoryManageCtrl', function ($scope,categoryManageService,CartItemService) {

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
        categoryManageService.addCategory(newCategoryName);
      }

      $scope.clickAddCategory = false;
      refresh();
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
      CartItemService.set('categoryToChange',category.id);
    };


    $scope.finishChangeCategory = function(newName){
      $scope.clickChangeCategory = false;
      $scope.categoryId = CartItemService.get('categoryToChange');
      categoryManageService.changeName($scope.categoryId,newName);
      refresh();
    };


    $scope.cancelChangeCategory = function(){
      $scope.clickChangeCategory = false;
    };

});
