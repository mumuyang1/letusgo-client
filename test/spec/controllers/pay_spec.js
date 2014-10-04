'use strict';

describe('Controller: PayCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,cartItemService,scope,createController,cartProduct,item;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemsService');

    createController = function(){

      return $controller('PayCtrl', {
          $scope: scope,
          CartItemService: cartItemService
      });
    };

    cartProduct = [
         {
           items : {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
           inputCount : 1
         }
      ];

      item = {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};

      spyOn(cartItemService, 'get').and.returnValue(cartProduct);
      spyOn(cartItemService,'getTotal').and.returnValue(16);
  }));

  it('should show is ok',function(){

      spyOn(scope,'$emit');
      spyOn(cartItemService,'getCartItems');
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-cartActive');
      expect(cartItemService.getCartItems).toHaveBeenCalled();
  });

  it('should payButton can do',function(){

      createController();
      spyOn(scope,'$emit');
      scope.payButton(item);
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-pay');
  });

});
