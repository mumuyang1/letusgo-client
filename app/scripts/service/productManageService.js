'use strict';

  angular.module('letusgoApp')
    .service('productManageService', function (localStorageService) {


    this.deleteProductButton = function(name){

      var allProducts = localStorageService.get('allProducts');
      _.forEach(allProducts,function(product){
        if(product.name === name){

          allProducts = _.without(allProducts,product);
        }
      });
      localStorageService.set('allProducts',allProducts);
      return allProducts;
    };




    this.changeProduct = function(productToBeChange,newName,newPrice,newUnit,newCategory){

      var allProducts = localStorageService.get('allProducts');

      _.forEach(allProducts,function(product){
        if(product.name === productToBeChange){
            product.name = newName;
            product.price = newPrice;
            product.unit = newUnit;
            product.category = newCategory;
            localStorageService.set('allProducts',allProducts);
        }
      });
      return allProducts;
  };


    this.getProductByName = function(name){

      var products = localStorageService.get('allProducts');
      return _.find(products,{name : name});
    };





















  });
