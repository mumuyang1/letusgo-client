'use strict';

  angular.module('letusgoApp')
    .service('CartItemsService', function (localStorageService,$http) {

      this.getCartItems= function(callback){
        $http.get('/api/cartItems')
          .success(function (data) {

            if(!data){
              $http.post('/api/cartItems');
            }
            callback(data);
          });
        };


      this.add = function (cartItem) {

        var cartSums = +localStorageService.get('cartSum');
        cartSums += 1;
        localStorageService.set('cartSum',cartSums);

        $http.post('/api/cartItems/'+cartItem.id);

        return cartSums;
      };


        this.reduce = function(cartItem,cartProduct){
            var cartSums = 0;
            _.forEach(cartProduct, function (item) {

                if (item.items.name === cartItem.name) {
                    if(item.inputCount <= 1){
                        item.inputCount = 1;
                        cartSums = localStorageService.get('cartSum');
                    }
                    else{
                          cartSums = localStorageService.get('cartSum');
                          item.inputCount -= 1;
                          cartSums -= 1;

                          localStorageService.set('cartSum', cartSums);
                          localStorageService.set('cartProduct', cartProduct);
                    }
                }
            });
            return cartSums;
        };


        this.delete = function(cartItem,cartProduct){

          var cartSums = localStorageService.get('cartSum');

          _.forEach(cartProduct,function(cart){
            if(cart.items.name === cartItem.name){

              cartSums  = cartSums - cart.inputCount;
              cartProduct = _.without(cartProduct,cart);
              localStorageService.set('cartProduct',cartProduct);
              localStorageService.set('cartSum',cartSums);
            }
          });
            return cartSums;
        };

        this.getTotal = function (cartItems) {
            var total = 0;
            _.forEach(cartItems, function (cartItem) {
                total += cartItem.item.price * cartItem.count;
            });
            return total.toFixed(2);
        };


        this.pay = function(cartProduct){
            cartProduct = [];
            localStorageService.set('cartProduct',cartProduct);
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
