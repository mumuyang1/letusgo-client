'use strict';

describe('Controller: CategoryManageCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,categoryService,scope,createController,cartItemService,
      categories,newCategoryName,allProducts,localStorageService;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemsService');
    categoryService = $injector.get('categoryManageService');
    localStorageService = $injector.get('localStorageService');

    createController = function(){

      return $controller('CategoryManageCtrl', {
          $scope: scope,
          CartItemService: cartItemService,
          categoryManageService: categoryService,
          localStorageService: localStorageService
      });
    };

      categories = [
          {id: 1, name: '水果'},
          {id: 2, name: '生活用品'}
        ];

      newCategoryName = '零食';

      allProducts = [
              {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
              {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
              {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
              {barcode:'ITEM000004',category:'饮料',name:'雪碧',price:'3.00',unit:'瓶'},
              {barcode:'ITEM000005',category:'饮料',name:'可口可乐',price:'3.00',unit:'瓶'}
            ];

      spyOn(cartItemService,'set');
      spyOn(scope,'$emit');


  }));



  it('should highlight ok',function(){
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-productManageActive');
  });

  it('should refresh function ok',function(){
    spyOn(categoryService,'getCategories').and.callFake(function(callback){
      callback(categories);
    });
    createController();
    expect(categoryService.getCategories).toHaveBeenCalled();
  });


  it('should show view and hide add and change ok',function(){
      createController();

      expect(scope.clickAddCategory).toBe(false);
      expect(scope.clickChangeCategory).toBe(false);
      expect(scope.clickDelete).toBe(false);
  });

  it('should add category view can show',function(){
      createController();
      scope.addCategory();
      expect(scope.clickAddCategory ).toBe(true);
  });


//  it('should finish add category can do when input new name',function(){
//      spyOn(categoryService,'addCategory').and.callFake(newCategoryName,function(){
//        callback();
//      });
//      var name = '零食';
//      createController();
//      scope.finishAddCategory(name);
//      expect(categoryService.addCategory.calls.count()).toBe(1);
//    expect(categoryService.getCategories.calls.count()).toBe(1);
//      expect(scope.clickAddCategory).toBe(false);
//    });

//  it('should finish add category can do when not input',function(){
//    spyOn(categoryService,'addCategory').and.callFake(newCategoryName,function(callback){
//      callback(categories);
//    });
//    spyOn(categoryService,'getCategories').and.callFake(function(callback){
//      callback(categories);
//    });
//    createController();
//    scope.finishAddCategory(newCategoryName);
//    expect(categoryService.addCategory.calls.count()).toBe(0);
//    expect(categoryService.getCategories.calls.count()).toBe(0);
//    expect(scope.clickAddCategory).toBe(false);
//  });


  it('should add category can cancel',function(){
      createController();
      scope.cancelAddCategory();
      expect(scope.clickAddCategory).toBe(false);
  });


//  it('can delete the category when it has none products',function(){
//
//      spyOn(categoryService,'hasProductsInTheCategory').and.callFake(categories[0].id,function(callback){
//        var data = false;
//        callback(data);
//      });
//      spyOn(categoryService,'getCategories').and.callFake(function(callback){
//        callback(categories);
//      });
//      spyOn(categoryService,'deleteCategoryButton');
//      createController();
//      scope.deleteCategory(categories[0]);
//      expect(categoryService.deleteCategoryButton).toHaveBeenCalled();
//      expect(categoryService.getCategories).toHaveBeenCalled();
//  });

//  it('can not delete the category when it has products',function(){
//      spyOn(categoryService,'hasProductsInTheCategory').and.returnValue(true);
//      createController();
//      scope.deleteCategory();
//      expect(scope.clickDelete).toBe(true);
//      expect(cartItemService.set).toHaveBeenCalled();
//  });
//
//  it('should finish delete category can do',function(){
//      spyOn(cartItemService,'get');
//      spyOn(categoryService,'deleteCategoryButton');
//      createController();
//      scope.finishDelete();
//      expect(categoryService.deleteCategoryButton).toHaveBeenCalled();
//      expect(cartItemService.get.calls.count()).toBe(2);
//      expect(scope.clickDelete).toBe(false);
//  });

  it('should delete category can cancel',function(){
      createController();
      scope.cancelDelete();
      expect(scope.clickDelete ).toBe(false);
  });


  it('should change category view can show',function(){
      createController();
      scope.changeCategory(categories[0]);
      expect(scope.newName).toBe('水果');
      expect(scope.clickChangeCategory).toBe(true);
      expect(cartItemService.set).toHaveBeenCalled();

  });

  it('should finish change category can do',function(){
      spyOn(categoryService,'getCategories').and.callFake(function(callback){
        callback(categories);
      });
      spyOn(cartItemService,'get');
      spyOn(categoryService,'changeName');
      createController();
      scope.finishChangeCategory(newCategoryName);
      expect(scope.clickChangeCategory).toBe(false);
      expect(cartItemService.get).toHaveBeenCalled();
      expect(categoryService.changeName).toHaveBeenCalled();
      expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('should change category can cancel',function(){
      createController();
      scope.cancelChangeCategory();
      expect(scope.clickAddCategory ).toBe(false);
  });

});
