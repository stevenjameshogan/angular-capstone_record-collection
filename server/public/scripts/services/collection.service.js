// Connect $http functionality
collectionApp.service('CollectionService', ['$http', function($http){
    console.log('service is loaded');

    const self = this;

    self.records = { collection: [], genres: [] }

    self.getRecords = function(){
        $http.get('/records').then(function(response){
            console.log(response.data);
            self.records.collection = response.data;
        }).catch(function(error){
            console.log('Error getting record', error);
        });
    };

    self.getGenres = function(){
        $http.get('/genres').then(function(response){
            console.log(response.data);
            self.records.genres = response.data;
        }).catch(function(error){
            console.log('Error getting record', error);
        });
    };


    self.getRecords();
    self.getGenres();
    
}]);