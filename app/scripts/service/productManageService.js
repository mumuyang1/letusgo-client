'use strict';

  angular.module('letusgoApp')
    .service('productManageService', function (localStorageService,$http) {


      this.addProductButton = function(name,price,unit,categoryId){
        console.log(name);
        $http.post('/api/items/'+name,
            {
              name: name,
              price: price,
              unit: unit,
              categoryId: categoryId
            }
          );
      };


    this.deleteProductButton = function(id){
      $http.delete('/api/items/'+id);
    };


    this.changeProduct = function(id,newName,newPrice,newUnit,newCategoryId){
      console.log(id+'===========');

      $http.put('/api/items/'+id,
          {
            name: newName,
            price: newPrice,
            unit: newUnit,
            categoryId: newCategoryId
          }
       );

//      var allProducts = localStorageService.get('allProducts');
//
//      _.forEach(allProducts,function(product){
//        if(product.name === productToBeChange){
//            product.name = newName;
//            product.price = newPrice;
//            product.unit = newUnit;
//            product.category = newCategory;
//            localStorageService.set('allProducts',allProducts);
//        }
//      });
//      return allProducts;
  };


//    this.getProductByName = function(name){
//
//      var products = localStorageService.get('allProducts');
//      return _.find(products,{name : name});
//    };


  });
