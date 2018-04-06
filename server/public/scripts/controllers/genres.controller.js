collectionApp.controller('GenresController', ['CollectionService', function(CollectionService){
    console.log('Genres Controller loaded!');
    
    const self = this;

    self.genreToAdd = '';

    self.records = CollectionService.records;
    self.getGenres = CollectionService.getGenres;
    self.getRecords = CollectionService.getRecords;
    self.editGenre = CollectionService.editGenre;

    self.addGenre = function(genreToAdd){
        CollectionService.addGenre(genreToAdd);
        self.genreToAdd = '';
    }

    self.deleteGenre = function(genreToDelete){
        if (genreToDelete.count == 0){
            CollectionService.deleteGenre(genreToDelete);
        } else {
            console.log(`Can't delete!`);
            alert('Cannot delete genre with active records!')
        }
    }

}]);