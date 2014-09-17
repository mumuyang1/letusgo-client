'use strict';

describe('Service: itemsService', function () {

   var cartService,itemsService,item,cartItem,cartProducts,allProducts;

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

        allProducts = [
                {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
                {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
                {barcode:'ITEM000004',category:'饮料',name:'雪碧',price:'3.00',unit:'瓶'},
                {barcode:'ITEM000005',category:'饮料',name:'可口可乐',price:'3.00',unit:'瓶'}
              ];

       spyOn(cartService, 'set');
   });

  //  it('should items is right when store is null', function(){
  //       spyOn(cartService,'get').and.returnValue(null);
   //
  //       var items = itemsService.getItems();
  //       // console.log(items[0].name+'??????????????//');
  //       expect(items[0].name).toEqual('苹果');
  //       expect(items[8].name).toEqual('翡翠手镯');
  //       expect(items.length).toBe(9);
   //
  //  });


    it('should cartSum in addCart is right',function(){
      spyOn(cartService,'get').and.returnValue(3);
      spyOn(itemsService,'getCartProducts');

      var result = itemsService.addCart(item);
      expect(result).toBe(4);
      expect(cartService.set).toHaveBeenCalled();
      expect(itemsService.getCartProducts).toHaveBeenCalled();
    });

    it('should get cartProducts is right',function(){
      spyOn(cartService,'getCartItems').and.returnValue(cartItem);
      spyOn(cartService,'get').and.returnValue(cartProducts);

      itemsService.getCartProducts(item);

      expect(cartService.set).toHaveBeenCalled();
      expect(cartService.getCartItems).toHaveBeenCalled();
      expect(cartService.get).toHaveBeenCalled();
    });


   it('should judge can do', function(){

     var result = itemsService.judgeIsExist(cartProducts,item);
     expect(result).toBe(true);
   });


     it('should load all products can do when is the page', function(){
       spyOn(itemsService,'getItems').and.returnValue(allProducts);

       var result = itemsService.loadAllProducts(true);
       expect(itemsService.getItems).toHaveBeenCalled();
       expect(result.length).toBe(3);
     });


     it('should load all products can do when is not the page', function(){
       spyOn(itemsService,'getItems').and.returnValue(allProducts);

       var result = itemsService.loadAllProducts(false);
       expect(itemsService.getItems).toHaveBeenCalled();
       expect(result.length).toBe(5);
     });
});
