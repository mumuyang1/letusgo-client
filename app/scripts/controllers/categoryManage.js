'use strict';

angular.module('letusgoApp')
.controller('CategoryManageCtrl', function ($scope,categoryManageService,CartItemService) {

    $scope.$emit('to-parent-productManageActive');
    $scope.categories = categoryManageService.buildCategoryData();
    $scope.clickAddCategory = false;
    $scope.clickChangeCategory = false;
    $scope.clickDelete = false;


    $scope.addCategory = function(){
      $scope.clickAddCategory = true;
    };


    $scope.finishAddCategory = function(newCategoryName){
      $scope.clickAddCategory = false;
      $scope.categories = categoryManageService.getCategories('categories');

      $scope.newCategory = {id:0,name:newCategoryName};
      $scope.newCategory.id = $scope.categories[$scope.categories.length-1].id + 1;
      $scope.categories.push($scope.newCategory);
      
      categoryManageService.setCategories('categories',$scope.categories);
    };


    $scope.cancelAddCategory = function(){
      $scope.clickAddCategory = false;
    };


    $scope.deleteCategory = function(category){

      if(categoryManageService.hasProductsInTheCategory(category)){
        $scope.clickDelete = true;
        CartItemService.set('categoryToDelete',category);
      }
      else{

        categoryManageService.deleteCategoryButton(category);
        $scope.categories = categoryManageService.getCategories();
      }
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

    $scope.changeCategory = function(categoryName){
      $scope.newName = categoryName;
      $scope.clickChangeCategory = true;
      CartItemService.set('categoryToChange',categoryName);
    };


    $scope.finishChangeCategory = function(newName){
      $scope.clickChangeCategory = false;
      $scope.categoryName = CartItemService.get('categoryToChange');
      categoryManageService.changeName($scope.categoryName,newName);
      $scope.categories = categoryManageService.getCategories();
    };


    $scope.cancelChangeCategory = function(){
      $scope.clickChangeCategory = false;
    };

});
