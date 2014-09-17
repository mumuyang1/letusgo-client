'use strict';

xdescribe('Service: productManageService', function () {

    var localStorageService,productManageService,allProducts,
        toChange,newName,newPrice,newUnit,newCategory;

     beforeEach(function(){

        module('letusgoApp');

        inject(function ($injector) {

            localStorageService = $injector.get('localStorageService');
            productManageService = $injector.get('productManageService');
         });

        allProducts = [
                  {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
                  {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                  {barcode:'ITEM000003',category:'饮料',name:'可口可乐',price:'3.00',unit:'瓶'},
                ];
        toChange = '香蕉';

        newName = '果粒奶优';
        newPrice = '6.00';
        newUnit = '瓶';
        newCategory = '饮料';


        spyOn(localStorageService, 'get').andReturn(allProducts);
        spyOn(localStorageService, 'set')
     });

     it('should delete button can do', function(){

        var result = productManageService.deleteProductButton(toChange);
        expect(localStorageService.get.calls.length).toBe(1);
        expect(result.length).toBe(2);
        expect(result[1].name).toBe('可口可乐');
     });

     it('should change product can do', function(){

       var result = productManageService.changeProduct(toChange,newName,newPrice,newUnit,newCategory);
       expect(localStorageService.get.calls.length).toBe(1);
       expect(result.length).toBe(3);
       expect(result[1].name).toBe('果粒奶优');
       expect(result[1].category).toBe('饮料');
       expect(result[1].price).toBe('6.00');
     });

});
