'use strict';

xdescribe('Controller: CartCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,cartItemService,scope,createController,cartProduct,store,item;

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

      store = {};

      // spyOn(cartItemService, 'get').andCallFake(function (key) {
      //  return store[key];
      //  });
      //
      // spyOn(cartItemService, 'set').andCallFake(function (key, value) {
      //    return store[key] = value;
      //  });

      // spyOn(cartItemService,'getTotal').andReturn(16);
      spyOn(scope,'$emit');

  }));

  it('should get ok',function(){

      spyOn(cartItemService,'set');
      spyOn(cartItemService,'get');
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-cartActive');
      expect(cartItemService.get.calls.count()).toEqual(2);
      // expect(scope.cartItems.length).toBe(1);
      // expect(scope.cartItems[0].items.name).toEqual('水杯');
      // expect(scope.cartsums).toBe(1);
  });


  // it('should get total ok',function(){
  //
  //     createController();
  //     expect(cartItemService.getTotal.calls.length).toBe(1);
  //     expect(scope.total).toBe(16);
  // });
  //
  // it('should addButton can do',function(){
  //
  //     createController();
  //     spyOn(scope,'$emit');
  //     scope.addButton(item);
  //     expect(scope.$emit).toHaveBeenCalledWith('to-parent-add',item,scope.cartItems);
  //     expect(cartItemService.get.calls.length).toBe(3);
  //     expect(cartItemService.getTotal).toHaveBeenCalled();
  // });
  //
  // it('should reduceButton can do',function(){
  //
  //     createController();
  //     spyOn(scope,'$emit');
  //     scope.reduceButton(item);
  //     expect(scope.$emit).toHaveBeenCalledWith('to-parent-reduce',item,scope.cartItems);
  //     expect(cartItemService.get.calls.length).toBe(3);
  //     expect(cartItemService.getTotal).toHaveBeenCalled();
  // });
  //
  // it('should deleteButton can do',function(){
  //
  //     createController();
  //     spyOn(scope,'$emit');
  //     scope.deleteButton(item);
  //     expect(scope.$emit).toHaveBeenCalledWith('to-parent-delete',item,scope.cartItems);
  //     expect(cartItemService.get.calls.length).toBe(3);
  //     expect(cartItemService.getTotal).toHaveBeenCalled();
  // });

});
