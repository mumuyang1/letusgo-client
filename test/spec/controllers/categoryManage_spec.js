'use strict';

xdescribe('Controller: CategoryManageCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,categoryService,scope,createController,cartItemService,
      categories,newCategoryName;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemService');
    categoryService = $injector.get('categoryManageService');

    createController = function(){

      return $controller('CategoryManageCtrl', {
          $scope: scope,
          CartItemService: cartItemService,
          categoryManageService: categoryService
      });
    };

      categories = [
          {id: 1, name: '水果'},
          {id: 2, name: '生活用品'},
        ];

      newCategoryName = '零食';

      spyOn(cartItemService,'get').andReturn('生活用品');
      spyOn(cartItemService,'set');
      spyOn(scope,'$emit');
      spyOn(categoryService,'getCategories').andReturn(categories);
      spyOn(categoryService,'setCategories');

  }));


  it('should highlight ok',function(){
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-productManageActive');
  });


  it('should show view and hide add and change ok',function(){
      spyOn(categoryService,'buildCategoryData');
      createController();
      expect(categoryService.buildCategoryData.calls.length).toBe(1);
      expect(scope.clickAddCategory).toBe(false);
      expect(scope.clickChangeCategory).toBe(false);
      expect(scope.clickDelete).toBe(false);
  });

  it('should add category view can show',function(){
      createController();
      scope.addCategory();
      expect(scope.clickAddCategory ).toBe(true);
  });


  it('should finish add category can do',function(){
      createController();
      scope.finishAddCategory(newCategoryName);
      expect(scope.clickAddCategory).toBe(false);
      expect(scope.newCategory.id).toBe(3);
      expect(categoryService.setCategories.calls.length).toBe(1);
  });


  it('should add category can cancel',function(){
      createController();
      scope.cancelAddCategory();
      expect(scope.clickAddCategory ).toBe(false);
  });


  it('should finish delete category can do',function(){
      spyOn(categoryService,'deleteCategoryButton');
      createController();
      scope.finishDelete();
      expect(categoryService.deleteCategoryButton.calls.length).toBe(1);
      expect(cartItemService.get.calls.length).toBe(2);
  });


  it('should change category view can show',function(){
      createController();
      scope.changeCategory();
      expect(scope.clickChangeCategory).toBe(true);
      expect(cartItemService.set.calls.length).toBe(1);

  });

  it('should finish change category can do',function(){
      spyOn(categoryService,'changeName');
      createController();
      scope.finishChangeCategory(newCategoryName);
      expect(scope.clickChangeCategory).toBe(false);
      expect(cartItemService.get.calls.length).toBe(1);
      expect(categoryService.changeName.calls.length).toBe(1);
      expect(categoryService.getCategories.calls.length).toBe(1);
  });

  it('should change category can cancel',function(){
      createController();
      scope.cancelChangeCategory();
      expect(scope.clickAddCategory ).toBe(false);
  });

});
