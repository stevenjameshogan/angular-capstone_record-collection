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
        if (genreToDelete.count == 0){
            console.log('Count is 0 so can delete');
        } else {
            console.log(`Can't delete!`);
             // CollectionService.deleteGenre(genreToDelete);
        }
    }

}]);