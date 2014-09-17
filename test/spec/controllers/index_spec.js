'use strict';

xdescribe('Controller: CartSumsCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,itemsService,cartItemService,scope,$rootScope,
      createController,item,cartProduct,cartSum;


  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    itemsService = $injector.get('ItemsService');
    cartItemService = $injector.get('CartItemService');

    createController = function(){

      return $controller('CartSumsCtrl', {
          $scope: scope,
          ItemsService: itemsService,
          CartItemService: cartItemService
      });
    };

    item = {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};

    cartProduct = [
         {
           items : {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
           inputCount : 1
         }
      ];

  }));

  it('should cartSum right when it is null', function(){
    createController();
    spyOn(cartItemService,'get').andReturn(null);
    var temp = cartItemService.get(cartSum);
    expect(temp ? parseInt(temp) : 0).toBe(0);
  });


  it('should addCartSum can do',function(){
    spyOn(itemsService,'addCart').andReturn(3);
    createController();
    scope.addCartSum(item);
    expect(itemsService.addCart.calls.length).toBe(1);
    expect(scope.cartsums).toBe(3);
  });


  it('should set get right',function(){
    spyOn(cartItemService,'get').andReturn(2);
    spyOn(cartItemService,'set');
    createController();
    expect(scope.cartsums).toBe(2);
    expect(cartItemService.get.calls.length).toBe(2);
    expect(cartItemService.set.calls.length).toBe(1);
  });

  it('should to-parent-add can do',function(){
    createController();
    scope.$digest();
    spyOn(cartItemService, 'add').andReturn(3);
    $rootScope.$broadcast('to-parent-add');
    scope.$digest();
    expect(scope.cartsums).toBe(3);
  });

  it('should to-parent-reduce can do',function(){
    createController();
    scope.$digest();
    spyOn(cartItemService, 'reduce').andReturn(5);
    $rootScope.$broadcast('to-parent-reduce');
    scope.$digest();
    expect(scope.cartsums).toBe(5);
  });

  it('should to-parent-delete can do',function(){
    createController();
    scope.$digest();
    spyOn(cartItemService, 'delete').andReturn(2);
    $rootScope.$broadcast('to-parent-delete');
    scope.$digest();
    expect(scope.cartsums).toBe(2);
  });

  it('should to-parent-pay can do',function(){
    createController();
    scope.$digest();
    spyOn(cartItemService, 'pay').andReturn(0);
    $rootScope.$broadcast('to-parent-pay');
    scope.$digest();
    expect(scope.cartsums).toBe(0);
  });

  it('should to-parent-mainActive can do',function(){

    createController();
    scope.$digest();
    $rootScope.$broadcast('to-parent-mainActive');
    scope.$digest();
    expect(scope.mainActive).toBe(true);
    expect(scope.cartActive).toBe(false);
    expect(scope.shoppingMallActive).toBe(false);
    expect(scope.productManageActive).toBe(false);
  });

  it('should to-parent-shoppingMallActive can do',function(){

    createController();
    scope.$digest();
    $rootScope.$broadcast('to-parent-shoppingMallActive');
    scope.$digest();
    expect(scope.mainActive).toBe(false);
    expect(scope.cartActive).toBe(false);
    expect(scope.shoppingMallActive).toBe(true);
    expect(scope.productManageActive).toBe(false);
  });

  it('should to-parent-cartActive can do',function(){

    createController();
    scope.$digest();
    $rootScope.$broadcast('to-parent-cartActive');
    scope.$digest();
    expect(scope.mainActive).toBe(false);
    expect(scope.cartActive).toBe(true);
    expect(scope.shoppingMallActive).toBe(false);
    expect(scope.productManageActive).toBe(false);
  });


  it('should to-parent-productManageActive can do',function(){

    createController();
    scope.$digest();
    $rootScope.$broadcast('to-parent-productManageActive');
    scope.$digest();
    expect(scope.mainActive).toBe(false);
    expect(scope.cartActive).toBe(false);
    expect(scope.shoppingMallActive).toBe(false);
    expect(scope.productManageActive).toBe(true);
  });

});
