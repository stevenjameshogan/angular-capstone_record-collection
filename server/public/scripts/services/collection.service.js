// Connect $http functionality
collectionApp.service('CollectionService', ['$http', function($http){
    console.log('service is loaded');

    const self = this;

    self.records = { collection: [] }

    self.getRecords = function(){
        $http.get('/records').then(function(response){
            console.log(response.data);
            self.records.collection = response.data;
        }).catch(function(error){
            console.log('Error getting record', error);
        });
    };


    self.getRecords();
    
}]);