collectionApp.controller('RecordsController', ['CollectionService', function(CollectionService){
    console.log('Records Controllerloaded!');

    self = this;
    self.recordToAdd = {title:'', artist:'', genre_id:'', release_year:'', run_time: '', album_img:''};
    self.years = CollectionService.years;
    self.minutes = CollectionService.minutes;
    
    self.adding = false;

    self.records = CollectionService.records;
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;


    self.addRecord =function(recordToAdd){
        console.log("coming in", recordToAdd);
        if (recordToAdd.album_img === ''){
            recordToAdd.album_img = "https://i.ebayimg.com/00/s/NjkzWDY5Mw==/z/pnwAAMXQUmFSnGv5/$_12.JPG?set_id=880000500F"
        }
        if (recordToAdd.genre_id === ''){
            recordToAdd.genre_id = 24;
        }
        console.log("coming out", recordToAdd);
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