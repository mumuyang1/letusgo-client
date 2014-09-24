'use strict';

xdescribe('Service: cartItemService', function () {

    var cartService,localStorageService,cartItem1,cartItem2,cartItem3,cartProduct,inputCount;

     beforeEach(function(){

        module('letusgoApp');

        inject(function ($injector) {
            localStorageService = $injector.get('localStorageService');
            cartService = $injector.get('CartItemService');
         });

        cartProduct = [

             {
               items : {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
               inputCount : 3
             },
             {
               items : {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
               inputCount : 1
             }
          ];

        inputCount = 8;

        cartItem2 = {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'};
        cartItem1 = {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};
        cartItem3 = {barcode:'ITEM000008',category:'饰品',name:'钻石项链',price:'160000.00',unit:'个'};

        spyOn(localStorageService,'get').and.returnValue(4);
        spyOn(localStorageService,'set');

     });

   it('should cartItems  is right', function(){

     var result = cartService.getCartItems(cartItem1,inputCount);
     expect(result.inputCount).toBe(8);

   });

   it('should add can do',function(){

       var result = cartService.add(cartItem2,cartProduct);
       expect(result).toBe(5);
       expect(localStorageService.set.calls.count()).toBe(2);
   });

   it('should not add when has not the product',function(){

       var result = cartService.add(cartItem3,cartProduct);
       expect(result).toBe(0);
       expect(localStorageService.set.calls.count()).toBe(0);
   });

    it('should reduce can do',function(){

      var result = cartService.reduce(cartItem2,cartProduct);

      expect(result).toBe(3);
      expect(localStorageService.set.calls.count()).toBe(2);
    });

    it('should reduce can do when inputCount is 1',function(){

      var result = cartService.reduce(cartItem1,cartProduct);
      expect(result).toBe(4);
      expect(localStorageService.get.calls.count()).toBe(1);
      expect(localStorageService.set.calls.count()).toBe(0);
    });

    it('should not reduce when has not the product',function(){

      var result = cartService.reduce(cartItem3,cartProduct);
      expect(result).toBe(0);
      expect(localStorageService.get.calls.count()).toBe(0);
      expect(localStorageService.set.calls.count()).toBe(0);
    });

    it('should delete can do',function(){

      var result = cartService.delete(cartItem2,cartProduct);
      expect(result).toBe(1);
      expect(localStorageService.set.calls.count()).toBe(2);
    });

    it('should not delete',function(){

      var result = cartService.delete(cartItem3,cartProduct);
      expect(result).toBe(4);
      expect(localStorageService.set.calls.count()).toBe(0);
    });

    it('should getTotal can do',function(){

      var result = cartService.getTotal(cartProduct);
      expect(result).toBe(28);
    });

    it('should pay can do',function(){

      var result = cartService.pay(cartProduct);
      expect(result).toBe(0);
      expect(localStorageService.set.calls.count()).toBe(2);
    });

    it('should set can do',function(){
      cartService.set('cartSum',5);
      expect(localStorageService.set.calls.count()).toBe(1);
    });

    it('should get can do',function(){
      var result = cartService.get('cartSum');
      expect(result).toBe(4);
    });

});
