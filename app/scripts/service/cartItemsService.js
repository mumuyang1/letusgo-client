'use strict';

  angular.module('letusgoApp')
    .service('CartItemService', function (localStorageService) {

        this.getCartItems = function (items, inputCount) {
            return {items: items, inputCount: inputCount};
        };


        this.add = function (cartItem, cartProduct) {
            var cartSums = 0;
            _.forEach(cartProduct, function (item) {

                if (item.items.name === cartItem.name) {
                    cartSums = +localStorageService.get('cartSum');
                    item.inputCount += 1;
                    cartSums += 1;
                    localStorageService.set('cartSum',cartSums);
                    localStorageService.set('cartProduct',cartProduct);
                }
            });
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

        this.getTotal = function (cartProduct) {
            var total = 0;
            _.forEach(cartProduct, function (item) {
                total += item.items.price * item.inputCount;
            });
            return total;
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
