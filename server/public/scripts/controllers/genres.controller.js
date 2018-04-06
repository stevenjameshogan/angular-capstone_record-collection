collectionApp.controller('GenresController', ['CollectionService', function(CollectionService){
    console.log('Genres Controller loaded!');
    
    const self = this;

    self.genreToAdd = '';

    self.records = CollectionService.records;
    self.getGenres = CollectionService.getGenres;
    self.getRecords = CollectionService.getRecords;

    self.addGenre = function(genreToAdd){
        CollectionService.addGenre(genreToAdd);
        self.genreToAdd = '';
    }

    self.deleteGenre = function(genreToDelete){
        CollectionService.deleteGenre(genreToDelete);
    }

}]);