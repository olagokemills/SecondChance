"use strict";

  angular
    .module('app.controllers', [])
    .controller('mainCtrl', mainCtrl);

function mainCtrl($scope, $rootScope, apiCall, $state)
{
    $rootScope.navbar = true;
    var main = this;

         main.allList = homeList;
         main.feedBack = feed;


     switch($state.current.name)
    {

          case "Home":
          case "Feedback":
    }


 function homeList()
            {
                apiCall
                .get(
                    'Accounts', 
                    function(response)
                    {
                        main.data = response.data.output.response;
                    }
                );
            }
    
    function feed()
        {
            apiCall
                .post(
                    'Feedback',
                    {

                    fname: main.fname,
                    email: main.email, 
                    service: main.service,
                    rating: main.rating,
                    description: main.description,
                    file:main.file,
                    },
                    function(response)
                    {

                    console.log(response);

                    }
                );
        }


  
}
