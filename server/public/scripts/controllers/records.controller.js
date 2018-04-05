collectionApp.controller('RecordsController', ['CollectionService', function(CollectionService){
    console.log('Records Controllerloaded!');

    self = this;

    self.records = CollectionService.records;
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;
    self.addRecord = CollectionService.addRecord;
    
}]);