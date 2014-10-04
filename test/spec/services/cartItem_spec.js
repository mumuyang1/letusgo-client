'use strict';

describe('Service: cartItemService', function () {

    var cartService,localStorageService,cartItem1,cartItem2,cartItem3,cartProducts,inputCount,$httpBackend;

     beforeEach(function(){

        module('letusgoApp');

        inject(function ($injector) {
            localStorageService = $injector.get('localStorageService');
            cartService = $injector.get('CartItemsService');
            $httpBackend = $injector.get('$httpBackend');
         });

        cartProducts = [

             {
               item : {id:3,barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
               count : 3
             },
             {
               item : {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
               count : 1
             }
          ];

        inputCount = 8;

        cartItem2 = {id:3,barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'};
        cartItem1 = {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};
        cartItem3 = {id:8,barcode:'ITEM000008',category:'饰品',name:'钻石项链',price:'160000.00',unit:'个'};

        spyOn(localStorageService,'get').and.returnValue(4);
        spyOn(localStorageService,'set');
//        $httpBackend.expectGET('/api/cartItems').respond(200,cartProducts);

     });

//   it('can get cartItems', function(){
//
//        spyOn(cartService,'getCartItems').and.call.fake(function(callback){
//          var mockCartItems = cartItems;
//          callback(mockCartItems);
//        });
//
//         cartService.getCartItems = function(callback){
//           var mockCartItems = cartItems;
//           callback(mockCartItems);
//         }
//
//     });

//     it('can get cartItems', function(){
//
//       var callback = jasmine.createSpy('callback');
//       callback({
//         cartProducts: cartProducts
//       });
//       $httpBackend.expectGET('/api/cartItems');
//       cartService.getCartItems(callback, function(){
//         $httpBackend.flush();
//       });
//       expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
//         cartProducts: cartProducts
//       }));
//
//   });

   it('should add can do',function(){

       var result = cartService.add(cartItem2);
       expect(result).toBe(5);
       expect(localStorageService.set.calls.count()).toBe(1);
       expect(localStorageService.get.calls.count()).toBe(1);
   });

  it('cartSums can update when reduce cartItems number',function(){

      cartService.updateCartSumsWhenReduce(cartProducts,cartItem2);
      expect(localStorageService.set.calls.count()).toBe(1);
      expect(localStorageService.get.calls.count()).toBe(2);
  });

  it('cartSums can update when delete cartItems',function(){

    cartService.updateCartSumsWhenDelete(cartProducts,cartItem2);

    expect(localStorageService.set.calls.count()).toBe(1);
    expect(localStorageService.get.calls.count()).toBe(2);
  });
//
//   it('should not add when has not the product',function(){
//
//       var result = cartService.add(cartItem3,cartProduct);
//       expect(result).toBe(0);
//       expect(localStorageService.set.calls.count()).toBe(0);
//   });
//
//    it('should reduce can do',function(){
//      var item = cartItem2;
//      $httpBackend.expectPUT('/api/cartItems/',{'operation' : 'delete'}).respond(200);
//
//      cartService.reduceCartItem(cartItem2);
//      $httpBackend.flush();
////      expect(localStorageService.set.calls.count()).toBe(2);
//    });
//
//    it('should reduce can do when inputCount is 1',function(){
//
//      var result = cartService.reduce(cartItem1,cartProduct);
//      expect(result).toBe(4);
//      expect(localStorageService.get.calls.count()).toBe(1);
//      expect(localStorageService.set.calls.count()).toBe(0);
//    });
//
//    it('should not reduce when has not the product',function(){
//
//      var result = cartService.reduce(cartItem3,cartProduct);
//      expect(result).toBe(0);
//      expect(localStorageService.get.calls.count()).toBe(0);
//      expect(localStorageService.set.calls.count()).toBe(0);
//    });
//
//    it('should delete can do',function(){
//
//      var result = cartService.delete(cartItem2,cartProduct);
//      expect(result).toBe(1);
//      expect(localStorageService.set.calls.count()).toBe(2);
//    });
//
//    it('should not delete',function(){
//
//      var result = cartService.delete(cartItem3,cartProduct);
//      expect(result).toBe(4);
//      expect(localStorageService.set.calls.count()).toBe(0);
//    });
//
    it('should getTotal can do',function(){

      var result = cartService.getTotal(cartProducts);
      expect(result).toBe(28.00.toFixed(2));
    });

//    it('should pay can do',function(){
//
//      var result = cartService.pay();
//      expect(result).toBe(0);
//      expect(localStorageService.set.calls.count()).toBe(1);
//    });

    it('should set can do',function(){
      cartService.set('cartSum',5);
      expect(localStorageService.set.calls.count()).toBe(1);
    });

    it('should get can do',function(){
      var result = cartService.get('cartSum');
      expect(result).toBe(4);
    });

});
