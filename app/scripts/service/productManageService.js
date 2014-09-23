'use strict';

  angular.module('letusgoApp')
    .service('productManageService', function (localStorageService,$http) {


      this.addProductButton = function(name,price,unit,categoryId){
        $http.post('/api/items/'+name,
            {
              name: name,
              price: price,
              unit: unit,
              categoryId: categoryId
            }
          );
      };


    this.deleteProductButton = function(id){
      $http.delete('/api/items/'+id);
    };


    this.changeProduct = function(id,newName,newPrice,newUnit,newCategoryId){

      $http.put('/api/items/'+id,
          {
            name: newName,
            price: newPrice,
            unit: newUnit,
            categoryId: newCategoryId
          }
       );
    };

  });
