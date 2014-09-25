'use strict';

xdescribe('Controller: CartCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,cartItemService,scope,createController,cartProduct,item;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemService');

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
      spyOn(cartItemService,'getSubtotal');
      spyOn(scope,'$emit');

  }));

  it('should get ok',function(){

      createController();

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-cartActive');
      expect(cartItemService.get.calls.count()).toEqual(2);
      expect(cartItemService.getTotal).toHaveBeenCalled();
  });


//  it('should updateTotalAndCart function ok',function(){
//
//      createController();
//      expect(cartItemService.get.calls.count()).toBe(2);
//      expect(cartItemService.getTotal).toHaveBeenCalled();
//  });
//
//
//  it('should addButton can do',function(){
//
//      createController();
//      scope.addButton(item);
//
//      expect(scope.$emit).toHaveBeenCalledWith('to-parent-add',item,scope.cartItems);
//      expect(cartItemService.get).toHaveBeenCalled();
//      expect(cartItemService.getTotal).toHaveBeenCalled();
//  });
//
//  it('should reduceButton can do',function(){
//
//      createController();
//      scope.reduceButton(item);
//
//      expect(scope.$emit).toHaveBeenCalledWith('to-parent-reduce',item,scope.cartItems);
//      expect(cartItemService.get).toHaveBeenCalled();
//      expect(cartItemService.getTotal).toHaveBeenCalled();
//  });
//
//  it('should deleteButton can do',function(){
//
//      createController();
//      scope.deleteButton(item);
//
//      expect(scope.$emit).toHaveBeenCalledWith('to-parent-delete',item,scope.cartItems);
//      expect(cartItemService.get).toHaveBeenCalled();
//      expect(cartItemService.getTotal).toHaveBeenCalled();
//  });

});
