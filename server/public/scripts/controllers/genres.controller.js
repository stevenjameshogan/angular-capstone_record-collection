collectionApp.controller('GenresController', ['CollectionService', function(CollectionService){
    console.log('Genres Controller loaded!');
    
    const self = this;

    self.records = CollectionService.records;
    self.getGenres = CollectionService.getGenres;

}]);