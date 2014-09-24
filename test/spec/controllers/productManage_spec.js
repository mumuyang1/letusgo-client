'use strict';

xdescribe('Controller: ProductManageCtrl', function () {

  beforeEach(module('letusgoApp'));

  var $controller,productService,categoryService,scope,createController,
      cartItemService,categories,newName,allProducts,product;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemService');
    categoryService = $injector.get('categoryManageService');
    productService = $injector.get('productManageService');

    createController = function(){

      return $controller('ProductManageCtrl', {
          $scope: scope,
          CartItemService: cartItemService,
          categoryManageService: categoryService
      });
    };

      categories = [
          {id: 1, name: '水果'},
          {id: 2, name: '生活用品'},
        ];


      newName = '香蕉';

     allProducts = [
                {barcode:'ITEM000001',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                {barcode:'ITEM000002',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
                {barcode:'ITEM000003',category:'饰品',name:'钻石项链',price:'160000.00',unit:'个'}
              ];
      product = {barcode:'ITEM000001',category:'水果',name:'香蕉',price:'3.50',unit:'斤'};

      spyOn(cartItemService,'set');

  }));


  it('should highlight ok',function(){
      spyOn(scope,'$emit');
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-productManageActive');
  });


  it('should show change manage view ok',function(){
      spyOn(cartItemService,'get');
      createController();

      expect(cartItemService.get).toHaveBeenCalled();
      expect(scope.controlLayout).toBe(true);
      expect(scope.clickAddProduct).toBe(false);
      expect(scope.clickChangeProduct).toBe(false);
  });


  it('should add product view can show',function(){
      spyOn(categoryService,'getCategories');

      createController();
      scope.addProduct();

      expect(scope.controlLayout).toBe(false);
      expect(scope.clickAddProduct).toBe(true);
      expect(categoryService.getCategories).toHaveBeenCalled();
  });


  it('should finish add product can do',function(){
      spyOn(cartItemService,'get').and.returnValue(allProducts);

      createController();
      scope.finishAddProduct();

      expect(scope.clickAddProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
      expect(scope.newProduct.barcode).toBe('ITEM000004');
      expect(scope.allProducts.length).toBe(4);
      expect(cartItemService.get.calls.count()).toBe(2);
  });


  it('should add product can cancel',function(){
      createController();

      scope.cancelAddProduct();
      expect(scope.clickAddProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
  });


  it('should delete product can do',function(){
      spyOn(productService,'deleteProductButton');
      spyOn(cartItemService,'get');

      createController();
      scope.deleteProduct();

      expect(productService.deleteProductButton.calls.count()).toBe(1);
      expect(cartItemService.get.calls.count()).toBe(2);
  });

  it('should change product view can show',function(){
      spyOn(categoryService,'getCategories');
      spyOn(productService,'getProductByName').and.returnValue(product);

      createController();
      scope.changeProduct(newName);

      expect(scope.clickChangeProduct).toBe(true);
      expect(scope.controlLayout).toBe(false);
      expect(cartItemService.set.calls.count()).toBe(1);
      expect(categoryService.getCategories.calls.count()).toBe(1);

  });

  it('should finish change category can do',function(){
      spyOn(cartItemService,'get');
      spyOn(productService,'changeProduct');

      createController();
      scope.finishChangeProduct();

      expect(scope.clickChangeProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
      expect(productService.changeProduct.calls.count()).toBe(1);
      expect(cartItemService.get.calls.count()).toBe(3);
  });

  it('should change product can cancel',function(){
      createController();
      scope.cancelChangeProduct();
      expect(scope.clickAddProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
  });

});
