collectionApp.controller('RecordsController', ['CollectionService', function(CollectionService){
    console.log('Records Controllerloaded!');

    self = this;

    self.recordToAdd = {title:'', artist:'', genre:'', release_year:'', run_time: '', album_img:''};

    self.records = CollectionService.records;
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;

    self.addRecord =function(recordToAdd){
         CollectionService.addRecord(recordToAdd);
         self.recordToAdd = {title:'', artist:'', genre:'', release_year:'', run_time: '', album_img:''};
    }
}]);