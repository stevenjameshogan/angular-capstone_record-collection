// Connect $http functionality
collectionApp.service('CollectionService', ['$http', function($http){
    console.log('service is loaded');

    const self = this;

    self.records = { collection: [], genres: [] }

    self.getRecords = function(){
        $http.get('/records').then(function(response){
            self.records.collection = response.data;
        }).catch(function(error){
            console.log('Error getting record', error);
        });
    };
    self.getGenres = function(){
        $http.get('/genres').then(function(response){
            self.records.genres = response.data;
        }).catch(function(error){
            console.log('Error getting record', error);
        });
    };

    self.addRecord = function(recordToAdd) {
        console.log('in Add record', recordToAdd);
        $http.post('/records', recordToAdd).then(function(response){
            console.log('Record added!');
            self.getRecords();
            self.getGenres();
        }).catch(function(error){
            console.log('Error adding record!');
        })
        
    }

    self.getRecords();
    self.getGenres();
    
}]);