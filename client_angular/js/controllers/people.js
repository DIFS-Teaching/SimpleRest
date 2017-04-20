demoApp.controller('ClientListCtrl', function(people) {
	var clientList = this;
	clientList.people = people;
});

demoApp.controller('ClientNewCtrl', function($location, People) {
	var editClient = this;
	
	editClient.save = function() {
		People.save(editClient.client, function(data) {
			$location.path('/people');
		});
	};
});

demoApp.controller('ClientDetailCtrl', function($location, $routeParams, People) {
	var editClient = this;
	var personId = $routeParams.personId;
	console.debug(personId);
	editClient.client = People.get({}, {'Id' : personId});
});
