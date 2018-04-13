// Link controller to Service, inject angular material components
collectionApp.controller('RecordsController', ['CollectionService','$mdToast', '$mdDialog', function(CollectionService, 
    $mdToast, $mdDialog, $scope){

    self = this;

    // Clear new record inputs on DOM
    self.recordToAdd = {title:'', artist:'', genre_id:'', release_year:'', run_time: '', album_img:''};
     // Declare aliases to service variables, arrays and objects
    self.years = CollectionService.years;
    self.minutes = CollectionService.minutes;
    self.records = CollectionService.records;
    // Declare aliases to service functions
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;
    self.editRecord = CollectionService.editRecord;
    self.deleteRecord = function(ev, recordToDelete) {
        console.log('I AM HERE');
        // Create the material dialog
        var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete ' + 
        recordToDelete.title + ' by ' + recordToDelete.artist + '?!')
        .ariaLabel('You want to delete record?')
        .targetEvent(ev)
        .ok('Delete away!') // triggers the .then function below in mdDialog
        .cancel('No, keep ' + recordToDelete.title); // triggers the .catch function below in mdDialog

        // If user confirms, delete record from db using unique id, retrieve updated records and genres for DOM display
        $mdDialog.show(confirm).then(function() {
            CollectionService.deleteRecord(recordToDelete).then(function(response){
                // confirm toast
                
            });
            

        });
        
    }
    
    
    
    
    self.showToast = CollectionService.showToast;
    self.popUpRecord = CollectionService.popUpRecord;
    self.popUpAddRec = CollectionService.popUpAddRec;

    // Check if key user inputs are empty, hard code values if so, call addRecord function on service, clear DOM inputs
    self.addRecord =function(recordToAdd){
        if (recordToAdd.album_img === ''){
            recordToAdd.album_img = "https://i.ebayimg.com/00/s/NjkzWDY5Mw==/z/pnwAAMXQUmFSnGv5/$_12.JPG?set_id=880000500F"
        }
        if (recordToAdd.genre_id === ''){
            recordToAdd.genre_id = 24;
        }
        CollectionService.addRecord(recordToAdd);
        self.recordToAdd = {title:'', artist:'', genre_id:'', release_year:'', run_time: '', album_img:''};
    }

    // Toggle if record is a favorite or not on the DOM based on click, call editRecord function on service to update db
    self.editFavorite = function(recordToFav){
        recordToFav.is_favorite = !recordToFav.is_favorite;
        CollectionService.editRecord(recordToFav)
    }

}]);