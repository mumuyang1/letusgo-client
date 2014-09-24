'use strict';

xdescribe('Service: itemsService', function () {

   var cartService,itemsService,item,cartItem,cartProducts,allProducts,allProducts1;

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

        allProducts1 = [
                {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
                {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'}
              ];

       spyOn(cartService, 'set');
   });

     it('should items is right when store is null', function(){
         spyOn(cartService,'get').and.returnValue(null);

         itemsService.getItems();
         expect(cartService.set).toHaveBeenCalled();
         expect(cartService.get).toHaveBeenCalled();
     });

     it('should items is right when store is not null', function(){
         spyOn(cartService,'get').and.returnValue(allProducts);

         var items = itemsService.getItems();
         expect(items.length).toBe(5);
         expect(items[2].name).toBe('菠萝');
         expect(cartService.get).toHaveBeenCalled();
     });

      it('should get pageTotal is right', function(){
          spyOn(itemsService,'loadAllProducts').and.returnValue(allProducts);

          var result = itemsService.getPageTotal();
          expect(itemsService.loadAllProducts).toHaveBeenCalled();
          expect(result.length).toBe(2);
      });

      it('should get pageTotal is right another case ', function(){
          spyOn(itemsService,'loadAllProducts').and.returnValue(allProducts1);

          var result = itemsService.getPageTotal();
          expect(itemsService.loadAllProducts).toHaveBeenCalled();
          expect(result.length).toBe(1);
      });

      it('should cartSum in addCart is right',function(){
        spyOn(cartService,'get').and.returnValue(3);
        spyOn(itemsService,'getCartProducts');

        var result = itemsService.addCart(item);
        expect(result).toBe(4);
        expect(cartService.get).toHaveBeenCalled();
        expect(cartService.set).toHaveBeenCalled();
        expect(itemsService.getCartProducts).toHaveBeenCalled();
      });

      it('should get cartProducts is right',function(){
        spyOn(cartService,'getCartItems').and.returnValue(cartItem);
        spyOn(cartService,'get').and.returnValue(cartProducts);
        spyOn(itemsService,'judgeIsExist');

        itemsService.getCartProducts(item);

        expect(cartService.set).toHaveBeenCalled();
        expect(cartService.getCartItems).toHaveBeenCalled();
        expect(cartService.get).toHaveBeenCalled();
        expect(itemsService.judgeIsExist).toHaveBeenCalled();
      });

      it('should get cartProducts is right firstly',function(){
        spyOn(cartService,'getCartItems').and.returnValue(cartItem);
        spyOn(cartService,'get').and.returnValue(null);
        spyOn(itemsService,'judgeIsExist');

        itemsService.getCartProducts(item);

        expect(cartService.set).toHaveBeenCalled();
        expect(itemsService.judgeIsExist.calls.count()).toBe(0);
      });


     it('should judge can do', function(){

       var result = itemsService.judgeIsExist(cartProducts,item);
       expect(result).toBe(true);
     });

     it('should judge can do when is another case', function(){

       var result = itemsService.judgeIsExist(cartProducts,allProducts[3]);
       expect(result).toBe(false);
     });


     it('should load all products can do when is the page', function(){
       spyOn(itemsService,'getItems').and.returnValue(allProducts);

       var result = itemsService.loadAllProducts(true);
       expect(itemsService.getItems).toHaveBeenCalled();
       expect(result.length).toBe(3);
       expect(result[2].name).toBe('菠萝');
     });


     it('should load all products can do when is not the page', function(){
       spyOn(itemsService,'getItems').and.returnValue(allProducts);

       var result = itemsService.loadAllProducts(false);
       expect(itemsService.getItems).toHaveBeenCalled();
       expect(result.length).toBe(5);
       expect(result[3].name).toBe('雪碧');
     });
});
