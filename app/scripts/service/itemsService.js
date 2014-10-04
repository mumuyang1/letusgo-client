'use strict';

angular.module('letusgoApp').service('ItemsService',function(CartItemsService,$http){

      function getItems(callback) {
        $http.get('/api/items')
          .success(function (data) {

            if(!data){
              $http.post('/api/items');
            }
            callback(data);
          });
      }

      this.getAllItems = function(callback){

        getItems(function(data){
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
