'use strict';

  angular.module('letusgoApp')
    .service('productManageService', function (ItemsService,$http) {


      this.addProductButton = function(name,price,unit,categoryId,callback){

        ItemsService.getItems(function(data){
          var id = data[data.length - 1].id + 1;
          $http.post('/api/items/'+id,
            {
              name: name,
              price: price,
              unit: unit,
              categoryId: categoryId
            });
          callback();
        });
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
