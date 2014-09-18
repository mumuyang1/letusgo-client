'use strict';

describe('Controller: CategoryManageCtrl', function () {


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

      spyOn(cartItemService,'set');
      spyOn(scope,'$emit');
      spyOn(categoryService,'getCategories').and.returnValue(categories);
      spyOn(categoryService,'setCategories');

  }));


  it('should highlight ok',function(){
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-productManageActive');
  });


  it('should show view and hide add and change ok',function(){
      spyOn(categoryService,'buildCategoryData');
      createController();
      expect(categoryService.buildCategoryData).toHaveBeenCalled();
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
      expect(scope.categories[2].name).toBe('零食');
      expect(categoryService.setCategories).toHaveBeenCalled();
      expect(categoryService.getCategories).toHaveBeenCalled();
  });


  it('should add category can cancel',function(){
      createController();
      scope.cancelAddCategory();
      expect(scope.clickAddCategory).toBe(false);
  });


  it('can delete the category when it has none products',function(){

      spyOn(categoryService,'hasProductsInTheCategory').and.returnValue(false);
      createController();
      scope.deleteCategory(categories[0].name);
      expect(categoryService.deleteCategoryButton).toHaveBeenCalled();
      expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('can not delete the category when it has products',function(){
      spyOn(categoryService,'hasProductsInTheCategory').and.returnValue(true);
      createController();
      scope.deleteCategory();
      expect(scope.clickDelete).toBe(true);
      expect(cartItemService.set).toHaveBeenCalled();
  });

  it('should finish delete category can do',function(){
      spyOn(cartItemService,'get');
      spyOn(categoryService,'deleteCategoryButton');
      createController();
      scope.finishDelete();
      expect(categoryService.deleteCategoryButton).toHaveBeenCalled();
      expect(cartItemService.get.calls.count()).toBe(2);
      expect(scope.clickDelete).toBe(false);
  });

  it('should delete category can cancel',function(){
      createController();
      scope.cancelDelete();
      expect(scope.clickDelete ).toBe(false);
  });


  it('should change category view can show',function(){
      createController();
      scope.changeCategory(newCategoryName);
      expect(scope.newName).toBe('零食');
      expect(scope.clickChangeCategory).toBe(true);
      expect(cartItemService.set).toHaveBeenCalled();

  });

  it('should finish change category can do',function(){
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
