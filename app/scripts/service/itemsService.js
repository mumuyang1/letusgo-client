'use strict';

angular.module('letusgoApp').service('ItemsService',function(CartItemsService,$http){

      this.getItems = function(callback){

        $http.get('/api/items')
          .success(function (data) {

            if(!data){
              $http.post('/api/items');
            }
            callback(data);
          });
      };


      this.addCart = function(item){

          var cartSum = +CartItemsService.get('cartSum');
          cartSum += 1;
          CartItemsService.set('cartSum',cartSum);

          this.buildCartItems(item);
          return cartSum;
        };


      this.buildCartItems = function(item){

        var cartItem = {'item' : item, 'count' : 1};

        $http.get('/api/cartItems')
         .success(function (cartItems) {

            if(!cartItems){
                 cartItems= [];
                cartItems.push(cartItem);

            } else {
              var result = judgeIsExist(cartItems,item);
              result ? result.count++ : cartItems.push(cartItem);
            }

            $http.post('/api/cartItems',{'cartItems' : cartItems});
        });
      };

      function judgeIsExist(cartItems,item){

        for(var i = 0; i < cartItems.length; i++){

          if(item.id === cartItems[i].item.id){
            return cartItems[i];
          }
         }
      };

});
