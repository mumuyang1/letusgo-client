'use strict';

  angular.module('letusgoApp')
    .service('CartItemsService', function (localStorageService,$http) {

      this.getCartItems= function(callback){

        $http.get('/api/cartItems')
          .success(function (data) {

            callback(data);
          });
        };


      this.add = function (item) {

        var cartSums = +localStorageService.get('cartSum');
        cartSums += 1;
        localStorageService.set('cartSum',cartSums);

        $http.put('/api/cartItems/'+item.id,{'operation' : 'add'});
        return cartSums;
      };

      this.judgeCount = function(cartItems,item){

       var cartSums = localStorageService.get('cartSum');

        _.forEach(cartItems, function (cartItem) {

          if (cartItem.item.id === item.id) {

            if(cartItem.count > 1){

              cartSums -= 1;
              localStorageService.set('cartSum', cartSums);
            }
          }
        });
        return localStorageService.get('cartSum');
      };

      this.reduceCartItem = function(item){

        $http.put('/api/cartItems/'+item.id,{'operation' : 'reduce'});
      };

      this.delete = function(item){

        var cartSums = localStorageService.get('cartSum');

        this.getCartItems(function(cartItems){
           _.forEach(cartItems,function(cartItem){
            if(cartItem.item.name === item.name){

              cartSums  = cartSums - cartItem.count;
              localStorageService.set('cartSum',cartSums);
              $http.put('/api/cartItems/'+item.id,{'operation' : 'delete'});
            }
          });
        });
      };

        this.getTotal = function (cartItems) {
            var total = 0;
            _.forEach(cartItems, function (cartItem) {
                total += cartItem.item.price * cartItem.count;
            });
            return total.toFixed(2);
        };


        this.pay = function(){

            $http.delete('/api/cartItems/');
            var cartSums = 0;
            localStorageService.set('cartSum',cartSums);
            return cartSums;
        };


       this.set = function(key,value){
         localStorageService.set(key,value);
       };


       this.get = function(key){
        return localStorageService.get(key);
       };

    });
