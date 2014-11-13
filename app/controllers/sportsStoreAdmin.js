var ssa = angular.module('sportsStoreAdmin', ['ngRoute']) ;

ssa.config(function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: '../views/adminLogin.html'
	})
	.when('/main', {
		templateUrl: '../views/adminMain.html'
	})
	.otherwise({
		redirectTo: '/login'
	})
})

.constant("authUrl", "http://localhost:5500/users/login")
.controller("authCtrl", ["$scope", "$http", "$location", "authUrl", 
	function ($scope, $http, $location, authUrl) {
		$scope.authenticate = function (user, pass) {
			$http.post(authUrl, {
				username: user, 
				password: pass
			}, {withCredentials: true})
			.success(function (data) {
				$location.path("/main") ;
			})
			.error(function (error) {
				$scope.authenticationError = error;
			}) ;
		}
}])