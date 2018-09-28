"use strict";

angular
    .module('ngApp', ['ui.router', 'ngSanitize', 'app.controllers', 'app.services'])
    .config(configuration)
    .constant('baseurl', '//localhost:9090/projects/SecondChance/Frontend/')
    .constant('apiurl', '//pamperpm-jojo.tk/backend/')
    .run(run);
    
    run.$inject = ['$state', '$rootScope', 'baseurl'];

function run($state, $rootScope, baseurl)
{
    $rootScope.baseurl = baseurl;
    $rootScope.transformRequest = transformRequest;
}

function configuration($stateProvider, $urlRouterProvider, $locationProvider)
{
    // pages / angular states
    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state({
            name: 'Home',
            url: '/',
            templateUrl: 'app/view/Home.html',
            
        })
        .state({
            name: 'Error',
            url: '/404',
            templateUrl: 'app/view/404.html'
        });
        
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

// this transforms any form data into proper encoding for ajax communication
function transformRequest(obj)
{
    var $res = [];
    for(var key in obj)
    {
        $res.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return $res.join('&');
}