(function (){
'use strict';

angular.module('ListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListheckOffService', ShoppingListheckOffService);

ToBuyController.$inject = ['ShoppingListheckOffService'];
function ToBuyController(ShoppingListheckOffService){
  var toBuy = this;
  toBuy.itemName = "";
  toBuy.itemQuantity = "";
  toBuy.items = ShoppingListheckOffService.getToBuyItems();
  toBuy.message = function (){
		return (toBuy.items=="");
	};


  toBuy.addItem = function(){
    ShoppingListheckOffService.addItemToBuy(toBuy.itemName, toBuy.itemQuantity)
    toBuy.empty = ShoppingListheckOffService.check();
    // toBuy.itemName = "";
    // toBuy.itemQuantity = "";
  }

  toBuy.boughtItem = function (itemIndex) {
    ShoppingListheckOffService.boughtItem(itemIndex);
  };


};

AlreadyBoughtController.$inject = ['ShoppingListheckOffService']
function AlreadyBoughtController(ShoppingListheckOffService){
  var alreadyBought = this;
  alreadyBought.itemName = "";
  alreadyBought.itemQuantity = "";
  alreadyBought.items = ShoppingListheckOffService.getBoughtItems();
  alreadyBought.message = function (){
		return (alreadyBought.items=="");
	};

};

function ShoppingListheckOffService(){
  var service = this;
  var itemsToBuy = [{
    name: "Water",
    quantity: "2 bottles"},
    {name: 'Milk',
    quantity: '1 bottle'},
    {name: 'Cookies',
    quantity: '1 bag'},
    {name: 'Potatoes',
    quantity: '1 bag'},
    {name: 'Mince Beef',
    quantity: '1 pack'}
  ]
  var itemsBought = []
  var isBought = false;

  // service.addItemToBuy = function (itemName, itemQuantity){
  //   var item = {
  //     name: itemName,
  //     quantity: itemQuantity
  //   };
  //   itemsToBuy.push(item);
  // };

  service.boughtItem = function (itemIdex) {
    var item = itemsToBuy[itemIdex];
    itemsBought.push(item);
    itemsToBuy.splice(itemIdex, 1);
    isBought = true;
  };

  service.getToBuyItems = function () {
    return itemsToBuy;
  };
  service.getBoughtItems = function () {
    return itemsBought;
  };

  service.check = function(){
    return isBought;
  }

  }

})();
