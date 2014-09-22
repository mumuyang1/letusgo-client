'use strict';

  angular.module('letusgoApp')
    .service('categoryManageService', function (localStorageService,$http) {

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
        console.log(name+'?????????');

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


      this.hasProductsInTheCategory = function(name,callback){

          $http.get('api/items').success(function (products) {

            callback(_.any(products,{ category: name}));
          });

      };


      this.deleteCategoryButton = function(id){

          $http.delete('/api/categories/'+id);
      };



      this.changeName = function(id,newName){

        $http.put('/api/categories/'+id,{categoryName:newName});
      };



});
