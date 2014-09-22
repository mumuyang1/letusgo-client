'use strict';

angular.module('letusgoApp')
.controller('CategoryManageCtrl', function ($scope,categoryManageService,CartItemService) {

    $scope.$emit('to-parent-productManageActive');


    categoryManageService.getCategories(function(data){

      $scope.categories = data;
    });

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

      categoryManageService.getCategories(function(data){
        $scope.categories = data;
      });
    };


    $scope.cancelAddCategory = function(){
      $scope.clickAddCategory = false;
    };


    $scope.deleteCategory = function(category){


      categoryManageService.hasProductsInTheCategory(category.name,function(data){
        console.log(data);
        if(data){
          $scope.clickDelete = true;
          CartItemService.set('categoryToDelete',category.id);
        }else{

          categoryManageService.deleteCategoryButton(category.id);

          categoryManageService.getCategories(function(data){

            $scope.categories = data;
          });

        }
      });
    };

    $scope.finishDelete = function(){
      var categoryToDelete = CartItemService.get('categoryToDelete');
      categoryManageService.deleteCategoryButton(categoryToDelete);
      $scope.categories = CartItemService.get('categories');
      $scope.clickDelete = false;
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

      categoryManageService.getCategories(function(data){

        $scope.categories = data;
      });
    };


    $scope.cancelChangeCategory = function(){
      $scope.clickChangeCategory = false;
    };

});
