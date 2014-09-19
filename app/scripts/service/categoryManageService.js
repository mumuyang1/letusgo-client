'use strict';

  angular.module('letusgoApp')
    .service('categoryManageService', function (localStorageService) {

      this.buildCategoryData = function(){

          var categoryData = [
              {id: 1, name: '水果'},
              {id: 2, name: '饮料'},
              {id: 3, name: '生活用品'},
              {id: 4, name: '饰品'}
            ];
          var categories = localStorageService.get('categories');
          return categories ? categories : localStorageService.set('categories', categoryData);
      };


      this.getCategories = function(){
        return localStorageService.get('categories');
      };


      this.setCategories = function(key,value){
        localStorageService.set(key,value);
      };


      this.hasProductsInTheCategory = function(name){
          var products = localStorageService.get('allProducts');
          return _.any(products,{ category: name});
      };
      

      this.deleteCategoryButton = function(category){

        var categories = this.getCategories();
        _.forEach(categories,function(categoryEach){
          if(categoryEach.name === category){

            categories = _.without(categories,categoryEach);
            localStorageService.set('categories',categories);
          }
        });
         this.deleteProductsWithDeleteCategory(category);
      };


      this.deleteProductsWithDeleteCategory = function(category){
        var allProducts = localStorageService.get('allProducts');

        _.forEach(allProducts,function(product, index){
            if(product.category === category){

              allProducts = _.without(allProducts,product);
              index --;
            }
          });
        localStorageService.set('allProducts',allProducts);
        return allProducts;
      };


      this.changeName = function(categoryName,newName){
        var categories = this.getCategories();
        _.forEach(categories,function(category){
          if(category.name === categoryName){
              category.name = newName;
              localStorageService.set('categories',categories);
          }
        });
        this.updateProductsCategory(categoryName,newName);
        return categories;
      };


      this.updateProductsCategory = function(categoryName,newName){

        var allProducts = localStorageService.get('allProducts');
        _.forEach(allProducts,function(product){
          if(product.category === categoryName){
            product.category = newName;
            localStorageService.set('allProducts',allProducts);
          }
        });
        return allProducts;
      };
});
