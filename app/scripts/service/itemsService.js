'use strict';

angular.module('letusgoApp').service('ItemsService',function(CartItemsService,$http){

      function getAllItems(callback) {
        $http.get('/api/items')
          .success(function (data) {

            if(!data){
              $http.post('/api/items');
            }
            callback(data);
          });
      }

      this.getItems = function(callback){

        getAllItems(function(data){
          callback(data);
        });
      };


      this.addCart = function(item){

          var cartSum = +CartItemsService.get('cartSum');
          cartSum += 1;
          CartItemsService.set('cartSum',cartSum);

          $http.post('/api/cartItems',{'item' : item});
          return cartSum;
        };


});
