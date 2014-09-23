'use strict';

angular.module('letusgoApp').service('ItemsService',function(CartItemService,$http){

      this.getItems = function(callback){

        $http.get('/api/items')
          .success(function (data) {

            if(!data) {
              $http.post('/api/items');
            }
            callback(data);
          });
      };


      this.addCart = function(item){
          var cartSum = +CartItemService.get('cartSum');
          cartSum += 1;
          CartItemService.set('cartSum',cartSum);

          this.getCartProducts(item);

          return cartSum;
        };


      this.getCartProducts = function(item){
        var cartProduct = CartItemService.get('cartProduct');
        var cartItem = CartItemService.getCartItems(item,1);

        if(cartProduct === null){
            cartProduct = [];
            cartProduct.push(cartItem);
        }
        else{
              if(!this.judgeIsExist(cartProduct,item)){
                  cartProduct.push(cartItem);
            }
        }
        CartItemService.set('cartProduct',cartProduct);
      };


      this.judgeIsExist = function(cartProduct,item){

        for(var i = 0; i < cartProduct.length; i++){

            if(item.name === cartProduct[i].items.name){
              cartProduct[i].inputCount++;
              return true;
            }
        }
        return false;
      };
});
