'use strict';

  angular.module('letusgoApp')
    .service('categoryManageService', function (ItemsService,$http) {

      this.getCategories = function(callback){
          $http.get('/api/categories')
            .success(function (data) {

              if(!data){
                $http.post('/api/categories/');
              }
              callback(data);

            });
      };


      this.getCategoryById = function(id,callback){

        this.getCategories(function(categories){

          var data =  _.find(categories,function(category){

              return category.id === id;

          });
          callback(data);
        });
     };

      this.getCategoryByName = function(name,callback){

        this.getCategories(function(categories){

          var data =  _.find(categories,function(category){

            return category.name === name;

          });
          callback(data);

        });
      };


      this.addCategory = function(newCategoryName){

        $http.post('/api/categories/'+newCategoryName);
      };


      this.hasProductsInTheCategory = function(categoryId,callback){

          $http.get('api/items').success(function (products) {
            console.log(categoryId+'???');

            callback(_.any(products,{ categoryId: categoryId}));
          });

      };

      this.deleteCategoryButton = function(id){

          $http.delete('/api/categories/'+id);
      };

      this.changeName = function(id,newName){

        $http.put('/api/categories/'+id,{categoryName:newName});
      };
});
