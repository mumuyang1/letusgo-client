'use strict';

describe('Controller: CartCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,cartItemService,scope,createController,cartProduct,item;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemsService');

    createController = function(){

      return $controller('CartCtrl', {
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

      spyOn(cartItemService,'set');
      spyOn(cartItemService,'get');
      spyOn(cartItemService,'getTotal');
      spyOn(scope,'$emit');

  }));

  it('should get ok',function(){
      createController();

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-cartActive');
  });


//  it('should updateTotalAndCart function ok',function(){
//
//      createController();
//      expect(cartItemService.get.calls.count()).toBe(2);
//      expect(cartItemService.getTotal).toHaveBeenCalled();
//  });
//
//
  it('should addButton can do',function(){

      createController();
      scope.addButton(item);

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-add',item);
  });

  it('should reduceButton can do',function(){
      spyOn(cartItemService,'reduceCartItem');

      createController();
      scope.reduceButton(item);

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-reduce',item);
      expect(cartItemService.reduceCartItem).toHaveBeenCalled();
  });

  it('should deleteButton can do',function(){
      spyOn(cartItemService,'deleteCartItem');

      createController();
      scope.deleteButton(item);

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-delete',item);
      expect(cartItemService.deleteCartItem).toHaveBeenCalled();
  });

});
