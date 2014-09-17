'use strict';

xdescribe('Service: itemsService', function () {

   var cartService,itemsService,item,cartItem,store,cartProducts;

   beforeEach(function(){
    module('letusgoApp');
      inject(function ($injector) {
          cartService = $injector.get('CartItemService');
          itemsService = $injector.get('ItemsService');
       });

       cartProducts =[
            {
              items : {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
              inputCount : 3
            }
        ];

       cartItem = [
           {
             items : {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
             inputCount : 1
           }
        ];

       item = {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'};


       store = {};

       spyOn(cartService, 'get').andCallFake(function (key) {
        return store[key];
        });

       spyOn(cartService, 'set').andCallFake(function (key, value) {
          return store[key] = value;
        });

      spyOn(cartService,'getCartItems').andReturn(cartItem);
   });

   it('should items is right', function(){

       var items = itemsService.getItems();
       expect(items[0].name).toEqual('苹果');
       expect(items[8].name).toEqual('翡翠手镯');
       expect(items.length).toBe(9);
       expect(cartService.set.calls.length).toBe(1);
   });

   it('should cartSum in addCart in right',function(){
     cartService.set('cartSum',3);
     cartService.set('cartProduct',cartProducts);

     var result = itemsService.addCart(item);
     expect(result).toBe(4);
     expect(cartService.get.calls.length).toBe(2);
     expect(cartService.set.calls.length).toBe(4);
   });

   it('should judge can do', function(){

     var result = itemsService.judgeIsExist(cartProducts,item);
     expect(result).toBe(true);
   });

});
