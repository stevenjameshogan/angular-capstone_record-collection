collectionApp.controller('RecordsController', ['CollectionService', function(CollectionService){
    console.log('Records Controllerloaded!');

    self = this;
    self.recordToAdd = {title:'', artist:'', genre_id:'', release_year:'', run_time: '', album_img:''};
    self.adding = false;

    self.records = CollectionService.records;
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;


    self.addRecord =function(recordToAdd){
        CollectionService.addRecord(recordToAdd);
        self.recordToAdd = {title:'', artist:'', genre_id:'', release_year:'', run_time: '', album_img:''};
    }

    self.editRecord = CollectionService.editRecord;



    self.deleteRecord = CollectionService.deleteRecord;
    

    self.changeView = function() {
        console.log('in change view');
        self.adding = !self.adding;
    }
}]);