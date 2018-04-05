// Connect $http functionality
collectionApp.service('CollectionService', ['$http', function($http){
    console.log('service is loaded');

    const self = this;

    self.records = { collection: [], genres: [] }

    self.getRecords = function(){
        $http.get('/records').then((response) => {
            self.records.collection = response.data;
        }).catch((error) => {
            console.log('Error getting record', error);
        });
    };
    self.getGenres = function(){
        $http.get('/genres').then((response) => {
            self.records.genres = response.data;
        }).catch((error) => {
            console.log('Error getting record', error);
        });
    };

    self.addRecord = function(recordToAdd) {
        $http.post('/records', recordToAdd).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch(function(error){
            console.log('Error adding record!');
        })
    }

    self.addGenre = function(genreToAdd) {
        $http.post('/genres', {genre: genreToAdd} ).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch((error) => {
            console.log('Error adding genre!');
        })
    }

    self.deleteGenre = function(genreToDelete){
        $http.delete(`/genres/${genreToDelete.id}`).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch((error) => {
            console.log('error deleting', error);
        })
    }

    self.getRecords();
    self.getGenres();
    
}]);