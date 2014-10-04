'use strict';

describe('Service: itemsService', function () {

   var cartService,itemsService,item,cartItem,cartProducts,allProducts,allProducts1,$httpBackend;

   beforeEach(function(){
    module('letusgoApp');
      inject(function ($injector) {
          cartService = $injector.get('CartItemsService');
          itemsService = $injector.get('ItemsService');
          $httpBackend = $injector.get('$httpBackend');
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
       $httpBackend.expectGET('/api/items').respond(allProducts);

   });

     it('should items can get', function(){
       var callback = jasmine.createSpy('callback');
       callback({
         allProducts: allProducts
       });
       $httpBackend.expectGET('/api/items');
       itemsService.getItems(callback, function(){
         $httpBackend.flush();
       });
       expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
         allProducts: allProducts
       }));
     });

//     it('should items is right when store is not null', function(){
//         spyOn(cartService,'get').and.returnValue(allProducts);
//
//         var items = itemsService.getItems();
//         expect(items.length).toBe(5);
//         expect(items[2].name).toBe('菠萝');
//         expect(cartService.get).toHaveBeenCalled();
//     });
//
//      it('should get pageTotal is right', function(){
//          spyOn(itemsService,'loadAllProducts').and.returnValue(allProducts);
//
//          var result = itemsService.getPageTotal();
//          expect(itemsService.loadAllProducts).toHaveBeenCalled();
//          expect(result.length).toBe(2);
//      });
//
//      it('should get pageTotal is right another case ', function(){
//          spyOn(itemsService,'loadAllProducts').and.returnValue(allProducts1);
//
//          var result = itemsService.getPageTotal();
//          expect(itemsService.loadAllProducts).toHaveBeenCalled();
//          expect(result.length).toBe(1);
//      });
//
      it('should cartSum in addCart is right',function(){
          spyOn(cartService,'get').and.returnValue(3);
          var result = itemsService.addCart(item);
          expect(result).toBe(4);
          expect(cartService.get).toHaveBeenCalled();
          expect(cartService.set).toHaveBeenCalled();
      });



  describe('productManage', function () {

    var allProducts,toChange,newName,newPrice,newUnit,newCategory;

    beforeEach(function(){

      allProducts = [
        {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
        {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
        {barcode:'ITEM000003',category:'饮料',name:'可口可乐',price:'3.00',unit:'瓶'}
      ];
      toChange = '香蕉';

      newName = '果粒奶优';
      newPrice = '6.00';
      newUnit = '瓶';
      newCategory = '饮料';

    });

//    it('should delete button can do', function(){
//
//      var result = itemsService.deleteProductButton(toChange);
//      expect(result.length).toBe(2);
//      expect(result[1].name).toBe('可口可乐');
//
//    });
//
//    it('should change product can do', function(){
//
//      var result = itemsService.changeProduct(toChange,newName,newPrice,newUnit,newCategory);
//      expect(result.length).toBe(3);
//      expect(result[1].name).toBe('果粒奶优');
//      expect(result[1].category).toBe('饮料');
//      expect(result[1].price).toBe('6.00');
//
//    });
  });


});
