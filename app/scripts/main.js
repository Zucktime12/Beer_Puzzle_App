
var beerApp = angular.module('beerApp', []);
beerApp.controller('BeerController', function($scope, $http) {

	setTimeout(function() {
		$(document).ready(function(){
	  		$(".owl-carousel").owlCarousel({
	  			singleItem: true,
	  			items: 1
	  		});
		});
	},1000);

	$scope.beerSum = function() {
		$scope.allBeer = [];

		$http({
			method: 'GET',
			url: 'http://beer.fluentcloud.com/v1/beer'
		}).
		then( function(response) {

			if(typeof response === 'object') {

				var dataArr = response.data;
				//console.log(dataArr);
				
				//each object contains 3 key value pairs
				//index.likes will be the likes for the object

				//for loop through dataArr which contains objects
				for (var i = 0; i < dataArr.length; i++) {
					var beer = dataArr[i];

					$scope.allBeer.push(beer);
				}

				var $owl = $('.owl-carousel');
				$owl.trigger('destroy.owl.carousel');
				$owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
				
				setTimeout(function() {
					$(document).ready(function(){
						$owl.owlCarousel({
							singleItem: true,
	  						items: 1
    					});
					},1000);
				});
			
				console.log($scope.allBeer);
			} else {

				//parse JSON into javascript object
				//var parsedData = JSON.parse(response);
				return;
			}

		}, function(error) {
			console.log('i am an error', error);
		})

	};

	$scope.beerSum();
	
	$scope.updateLikes = function(beer, likeCount) {
		beer.likes += likeCount;
			$http({
	            method: 'PUT',
	            url: 'http://beer.fluentcloud.com/v1/beer/' + beer.id,
	            data: JSON.stringify(beer),
	            headers: {'Content-Type': 'application/json'},
	        }).then(function successCallback(response) {
	        	console.log("Updated!");
	        	$scope.beerSum();

	        	console.log(response);
			  // this callback will be called asynchronously
			  // when the response is available
			}, function errorCallback(response) {
				console.log(response);
			  // called asynchronously if an error occurs
			  // or server returns response with an error status.
			});
   		};


	$scope.addBeer = function (input) {
		var newBeer = {'name': input.name, "likes": 0};
		
		$scope.allBeer.push(newBeer);

        console.log(newBeer);

        $http({
	   	    method: 'POST',
	   	    url: 'http://beer.fluentcloud.com/v1/beer/',
	   	    data: JSON.stringify(newBeer),
	   	    headers: {'Content-Type': 'application/json'},
	   	}).then(function successCallback(response) {
	   		console.log("Updated!");
	   		$scope.beerSum();
	   		console.log(response);
		// this callback will be called asynchronously
		// when the response is available
		}, function errorCallback(response) {
			console.log(response);
			
		  // called asynchronously if an error occurs
		  // or server returns response with an error status.
		});
    };


});

