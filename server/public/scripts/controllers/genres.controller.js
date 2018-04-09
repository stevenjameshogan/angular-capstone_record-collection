// Link controller to Service, inject angular material components
collectionApp.controller('GenresController', ['CollectionService', function(CollectionService){
    
    const self = this;
    // Clear new genre input on DOM
    self.genreToAdd = '';
    // Declare aliases to service variables, arrays and objects
    self.records = CollectionService.records;
    self.is0 = CollectionService.is0;
     // Declare aliases to service functions
    self.getRecords = CollectionService.getRecords;
    self.editGenre = CollectionService.editGenre;
    self.deleteGenre = CollectionService.deleteGenre;
    self.popUpGenre =  CollectionService.popUpGenre; 
    // Call addGenre function on service, clears new genre input on DOM
    self.addGenre = function(genreToAdd){
        CollectionService.addGenre(genreToAdd);
        self.genreToAdd = '';
    }
}]);