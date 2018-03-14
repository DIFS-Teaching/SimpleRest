var demoApp = angular.module('demo', [ 'demoServices', 'ngRoute', 'ui.bootstrap' ]);

demoApp.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				redirectTo : '/people/'
			});
			$routeProvider.when('/people/', {
				templateUrl : 'templates/people/list.html',
				controller : "ClientListCtrl as clientList",
				resolve : {
					people : function(People) {
						return People.index();
					}
				}
			});
			$routeProvider.when('/people/new', {
				controller : 'ClientNewCtrl as editClient',
				templateUrl : 'templates/people/edit.html'
			});
			$routeProvider.when('/people/detail/:personId', {
				controller : 'ClientDetailCtrl as editClient',
				templateUrl : 'templates/people/detail.html'
			});
			
			$routeProvider.otherwise({
				redirectTo : '/people/'
			});
		}]);

demoApp.config(function($locationProvider) {
			//$locationProvider.html5Mode(true);
		});

demoApp.run(function() {
	//some initialization here when necessary
});

