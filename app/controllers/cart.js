angular.module('cart', [])
.factory('cart', function () {
	var cartData = [] ;

	return {
		addProduct: function (id, name, price) {
			var addedToExistingItem = false ; 
			for (var i = cartData.length - 1; i >= 0; i--) {
				if (cartData[i].id == id){
					cartData[i].count++ ;
					addedToExistingItem = true ; 
					break ;
				}
			}

			if (!addedToExistingItem) {
				cartData.push({
					count: 1, id: id, price: price, name: name
				}) ;
			}
		},

		removeProduct: function (id) {
			for (var i = cartData.length - 1; i >= 0; i--) {
				if (cartData[i].id == id){
					cartData.splice(i, 1) ;
					break; 
				}
			}
		}, 

		getProducts: function () {
			return cartData ;
		}
	}
})
.directive('cartSummary', ['cart', function (cart) {
	return{
		restrict: "E" ,
		templateUrl: "../views/cartSummary.html", 
		controller: function ($scope) {
			var cartData = cart.getProducts() ;

			$scope.total = function () {
				var total = 0 ;
				for (var i = cartData.length - 1; i >= 0; i--) {
					total += (cartData[i].price * cartData[i].count); 
				}

				return total ;
			}

			$scope.itemCount = function () {
				var total = 0 ; 
				for (var i = cartData.length - 1; i >= 0; i--) {
					total += cartData[i].count ;
				}

				return total
			}
		}
	}
}])