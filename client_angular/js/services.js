

angular.module('demoServices', ['ngResource'])
  
  .factory('People', function($resource){
    return $resource('/server.php/data/:Id', 
    		{Id: '@Id'}, 
    		{
    			index: {method:'GET', isArray:true},
				show: {method:'GET'},
				create: {method:'POST'},
				update: {method:'PUT'},
				remove: {method:'DELETE'}
    		});
  });
