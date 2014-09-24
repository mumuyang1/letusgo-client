'use strict';

xdescribe('Controller: ShoppingMallCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,$routeParams,itemsService,scope,createController,item,CartItemService;


  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    $routeParams = $injector.get('$routeParams');
    itemsService = $injector.get('ItemsService');
    CartItemService = $injector.get('CartItemService');

    createController = function(){

      return $controller('ShoppingMallCtrl', {
          $scope: scope,
          ItemsService: itemsService,
          $routeParams : $routeParams
      });
    };

    item = [

            {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
            {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'}
      ];
    }));

    it('should active is ok',function(){

        spyOn(scope,'$emit');
        createController();
        expect(scope.$emit).toHaveBeenCalledWith('to-parent-shoppingMallActive');
    });

    it('should shopping list can show',function(){

      spyOn(CartItemService,'get').and.returnValue(item);
      createController();
      expect(scope.items.length).toBe(2);
      expect(scope.items[0].name).toEqual('水杯');
      expect(scope.items[1].price).toBe('4.00');
    });


    it('should page divider ok',function(){

      spyOn(itemsService,'loadAllProducts');
      spyOn(itemsService,'getPageTotal').and.returnValue([1,2,3,4,5]);
      $routeParams.pageNow = 3;
      createController();

      scope.pageNow = parseInt($routeParams.pageNow);

      expect(scope.pageNow).toBe(3);
      expect(scope.previous).toBe(2);
      expect(scope.next).toBe(4);
      expect(itemsService.loadAllProducts).toHaveBeenCalled();
      expect(itemsService.getPageTotal).toHaveBeenCalled();
    });

    it('should page divider ok when page is 1',function(){

      spyOn(itemsService,'loadAllProducts');
      spyOn(itemsService,'getPageTotal').and.returnValue([1,2,3,4,5]);
      $routeParams.pageNow = 1;
      createController();

      scope.pageNow = parseInt($routeParams.pageNow);

      expect(scope.pageNow).toBe(1);
      expect(scope.previous).toBe(1);
      expect(scope.next).toBe(2);
    });

    it('should page divider ok when the current page is last page',function(){

      spyOn(itemsService,'loadAllProducts');
      spyOn(itemsService,'getPageTotal').and.returnValue([1,2,3,4,5]);
      $routeParams.pageNow = 5;
      createController();

      scope.pageNow = parseInt($routeParams.pageNow);

      expect(scope.pageNow).toBe(5);
      expect(scope.previous).toBe(4);
      expect(scope.next).toBe(5);
    });

  });
