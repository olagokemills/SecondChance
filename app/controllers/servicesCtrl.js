"use strict";

  angular
    .module('app.controllers')
    .controller('servicesCtrl', servicesCtrl);

function servicesCtrl($scope, $rootScope,$location,apiCall, $state)
{
    $rootScope.navbar = true;
    var services = this;

     switch($state.current.name)
    {
    	case "Services":
             apiCall
         .get(
           'Services/Category/', 
            function(response)
            {
                services.data = response.data.output.response;
            }
          );
            break;

         case "CategoryListing":
            apiCall
             .get(
               'Services/Category/'+$state.params.Category, 
                function(response)
                {
                    services.data['info'] = response.data.output.response;
                }
              ); 

             break;

         case "ServiceDetail":
            apiCall
             .get(
               'Services/Category/'+$state.params.Details, 
                function(response)
                {
                    services.data['info'] = response.data.output.response;
                }
              ); 

             break;

         case"ServicesOrder":
             apiCall
             .get(
                'Services/Category/'+$state.params.Order,
                 function(response)
                { 
                	 services.data['info'] = response.data.output.response;
                }
                 );

             function makeOrder(){

             	apiCall
	             .post(
	                'Orders',
	                {
	                 fname: $scope.firstname,
	                 lname:	$scope.lastname,
	                },
	                 function(response)
	                { 	
	                }
                 );
             }
            
			
			default:
            $location.path('404')
            break;
    }


}
