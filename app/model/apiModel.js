"use strict";

  angular
    .module('app.services', [])
    .factory('apiCall', apiCall);

    apiCall.$inject = ['$http', 'apiurl'];

function apiCall($http, apiurl)
{
    var apicaller = {};
    apicaller.get = get;
    apicaller.post = post;
    apicaller.delete = remove;
    apicaller.put = put;
    return apicaller;

    function get(url, callback)
    {
        $http
            .get(apiurl + url)
            .then(function (data, status, headers, config) {
                callback(data);
            });
    }

    function post(url, formdata, callback)
    {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http
        .post(apiurl + url, transformRequest(formdata), {
            transformRequest: angular.identity,
        })
        .success(function (data, status, headers, config) {
            callback(data);
        })
        .error(function (data, status, headers, config) {
            callback(data);
        });
    }

    function put(url, callback)
    {
        $http
            .put(apiurl + url)
            .then(function (data, status, headers, config) {
                callback(data);
            });
    }

    
    function remove(url, formdata, callback)
    {
        $http
        .delete(apiurl + url, transformRequest(formdata), {
            transformRequest: angular.identity,
        })
        .then(function (data, status, headers, config) {
            callback(data);
        });
    }
}