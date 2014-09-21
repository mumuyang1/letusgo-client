'use strict';

  angular.module('letusgoApp')
    .service('categoryManageService', function (localStorageService,$http) {

      this.getCategory = function(callback){

          $http.get('/api/categories')
            .success(function (data) {
              callback(data);
            });
      };


      this.getCategories = function(){
        return localStorageService.get('categories');
      };


      this.setCategories = function(key,value){
        localStorageService.set(key,value);
      };



      this.addCategory = function(newCategoryName){
        $http.post('/api/categories/'+newCategoryName);
      };


      this.hasProductsInTheCategory = function(name,callback){

          $http.get('api/items').success(function (products) {

            callback(_.any(products,{ category: name}));
          });

      };


      this.deleteCategoryButton = function(id){

          $http.delete('/api/categories/'+id);
      };


/*      this.changeName = function(category,newName){
        var categories = this.getCategories();
        _.forEach(categories,function(categoryEach){
          if(categoryEach.id === category.id){
              categoryEach.name = newName;
              localStorageService.set('categories',categories);
          }
        });
        this.updateProductsCategory(category.id,newName);
        return categories;
      };*/


      this.changeName = function(id,newName){

        $http.put('/api/categories/'+id,{categoryName:newName});
      };


//      this.updateProductsCategory = function(categoryName,newName){
//
//        var allProducts = localStorageService.get('allProducts');
//        _.forEach(allProducts,function(product){
//          if(product.category === categoryName){
//            product.category = newName;
//            localStorageService.set('allProducts',allProducts);
//          }
//        });
//        return allProducts;
//      };
});
