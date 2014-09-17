'use strict';

angular.module('letusgoApp').service('ItemsService',function(CartItemService){

      this.getItems = function(){

          var allProductsArray = [
                    {barcode:'ITEM000001',category:'水果',name:'苹果',price:'3.00',unit:'斤'},
                    {barcode:'ITEM000002',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                    {barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
                    {barcode:'ITEM000004',category:'饮料',name:'雪碧',price:'3.00',unit:'瓶'},
                    {barcode:'ITEM000005',category:'饮料',name:'可口可乐',price:'3.00',unit:'瓶'},
                    {barcode:'ITEM000006',category:'生活用品',name:'公牛插座',price:'10.00',unit:'个'},
                    {barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
                    {barcode:'ITEM000008',category:'饰品',name:'钻石项链',price:'160000.00',unit:'个'},
                    {barcode:'ITEM000009',category:'饰品',name:'翡翠手镯',price:'200.00',unit:'个'}
                  ];
          var allProducts = CartItemService.get('allProducts');
          return allProducts ? allProducts : CartItemService.set('allProducts',allProductsArray);
      };


      this.loadAllProducts = function(pageNow){
          var products = this.getItems();

          if(pageNow){

            return products.slice((pageNow-1)*3,pageNow*3);

          }else{

            return products;
          }
      };


      this.getPageTotal = function(){

        var totalCount = this.loadAllProducts(null).length;
        var pageCount = totalCount % 3 == 0 ? parseInt(totalCount / 3) : parseInt(totalCount / 3) + 1;
        return _.range(1,pageCount + 1);
      };


      this.addCart = function(item){
          var cartSum = +CartItemService.get('cartSum');
          cartSum += 1;
          CartItemService.set('cartSum',cartSum);

          this.getCartProducts(item);

          return cartSum;
        };


      this.getCartProducts = function(item){
        var cartProduct = CartItemService.get('cartProduct');
        var cartItem = CartItemService.getCartItems(item,1);

        if(cartProduct === null){
            cartProduct = [];
            cartProduct.push(cartItem);
        }
        else{
              if(!this.judgeIsExist(cartProduct,item)){
                  cartProduct.push(cartItem);
            }
        }
        CartItemService.set('cartProduct',cartProduct);
      };


      this.judgeIsExist = function(cartProduct,item){

        for(var i = 0; i < cartProduct.length; i++){

            if(item.name === cartProduct[i].items.name){
              cartProduct[i].inputCount++;
              return true;
            }
        }

        return false;
      };
});
