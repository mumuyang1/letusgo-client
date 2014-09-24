'use strict';

xdescribe('Service: categoryManageService', function () {

    var localStorageService,categoryService,categories,allProducts,
        category,newCategoryName;

     beforeEach(function(){

        module('letusgoApp');

        inject(function ($injector) {

            localStorageService = $injector.get('localStorageService');
            categoryService = $injector.get('categoryManageService');
         });

        categories = [
            {id: 1, name: '水果'}
          ];
        category = {id: 1, name: '水果'};

        allProducts = [
                  {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
                  {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                  {barcode:'ITEM000003',category:'饮料',name:'可口可乐',price:'3.00',unit:'瓶'},
                ];
        newCategoryName = '食品';
        spyOn(localStorageService, 'set');
     });

   it('should get categoryData is right when store is null', function(){
      spyOn(localStorageService,'get').and.returnValue(null);
      categoryService.buildCategoryData();
      expect(localStorageService.get.calls.count()).toBe(1);
      expect(localStorageService.set.calls.count()).toBe(1);
   });


   it('should get categoryData is right when store is not null', function(){
      spyOn(localStorageService,'get').and.returnValue(categories);
      var result =  categoryService.buildCategoryData();
      expect(localStorageService.get.calls.count()).toBe(1);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('水果');
   });


   it('should get categories function can do', function(){
      spyOn(localStorageService,'get').and.returnValue(categories);
      var result = categoryService.getCategories();
      expect(result.length).toBe(1);
   });


   it('should setCategories function can do', function(){
      categoryService.setCategories();
      expect(localStorageService.set.calls.count()).toBe(1);
   });


   it('can judge if category contains products', function(){
      spyOn(localStorageService,'get').and.returnValue(allProducts);
      var result = categoryService.hasProductsInTheCategory(category.name);
      expect(result).toBe(true);
   });

   it('can judge if category contains no product', function(){
      spyOn(localStorageService,'get').and.returnValue(allProducts);
      var result = categoryService.hasProductsInTheCategory(newCategoryName);
      expect(result).toBe(false);
   });

   it('should deleteCategoryButton can do', function(){
      spyOn(categoryService,'getCategories').and.returnValue(categories);
      spyOn(categoryService,'deleteProductsWithDeleteCategory');
      categoryService.deleteCategoryButton(category.name);
      expect(localStorageService.set.calls.count()).toBe(1);
      expect(categoryService.deleteProductsWithDeleteCategory.calls.count()).toBe(1);
   });

    it('should deleteCategoryButton can do when has not the category', function(){
       spyOn(categoryService,'getCategories').and.returnValue(categories);
       spyOn(categoryService,'deleteProductsWithDeleteCategory');
       spyOn(categoryService,'setCategories');
       categoryService.deleteCategoryButton(newCategoryName);
       expect(categoryService.setCategories.calls.count()).toBe(0);
       expect(categoryService.deleteProductsWithDeleteCategory.calls.count()).toBe(1);
    });

     it('should delete all products with the category when deleteCategory', function(){
        spyOn(localStorageService,'get').and.returnValue(allProducts);
        var result = categoryService.deleteProductsWithDeleteCategory(category.name);
        expect(localStorageService.get.calls.count()).toBe(1);
        expect(result.length).toBe(1);
        expect(result[0].category).toBe('饮料');
        expect(localStorageService.set.calls.count()).toBe(1);
     });

    it('should not delete products when has not the category', function(){
       spyOn(localStorageService,'get').and.returnValue(allProducts);
       categoryService.deleteProductsWithDeleteCategory(newCategoryName);
       expect(localStorageService.get.calls.count()).toBe(1);
       expect(localStorageService.set.calls.count()).toBe(1);
    });

     it('should change category name can do', function(){
        spyOn(categoryService,'getCategories').and.returnValue(categories);
        spyOn(categoryService,'updateProductsCategory');
        var result = categoryService.changeName(category.name,newCategoryName);
        expect(categoryService.getCategories.calls.count()).toBe(1);
        expect(result[0].name).toBe('食品');
        expect(categoryService.updateProductsCategory.calls.count()).toBe(1);
     });

    it('should not change all categories name when has not the category', function(){
       spyOn(categoryService,'getCategories').and.returnValue(categories);
       spyOn(categoryService,'updateProductsCategory');
       categoryService.changeName(newCategoryName,newCategoryName);
       expect(categoryService.getCategories.calls.count()).toBe(1);
       expect(localStorageService.set.calls.count()).toBe(0);
       expect(categoryService.updateProductsCategory.calls.count()).toBe(1);
    });

  it('should the products category can update when category name change', function(){
    spyOn(localStorageService,'get').and.returnValue(allProducts);
     var result = categoryService.updateProductsCategory(category.name,newCategoryName);
     expect(localStorageService.get.calls.count()).toBe(1);
     expect(result.length).toBe(3);
     expect(result[0].category).toBe('食品');
     expect(result[1].category).toBe('食品');
     expect(localStorageService.get.calls.count()).toBe(1);
  });
});
