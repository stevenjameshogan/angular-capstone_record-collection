// Declare new listingsApp as new Angular module, let angular know to use $routePovider for navigation
const collectionApp = angular.module('collectionApp', ['ngRoute', 'xeditable', 'ngMaterial'])

collectionApp.config(function($routeProvider){
    $routeProvider
    .when('/records', {
        templateUrl: '/views/records.view.html',
        controller: 'RecordsController as vm'
    }).when('/genres', {
        templateUrl: '/views/genres.view.html',
        controller: 'GenresController as vm'
    }).otherwise(
        {redirectTo: '/records'});
});
