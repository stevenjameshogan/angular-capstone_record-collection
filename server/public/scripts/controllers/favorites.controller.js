// Link controller to Service, inject angular material components
collectionApp.controller('FavoritesController', 
['CollectionService','$mdToast', '$mdDialog', function(CollectionService, $mdToast, $mdDialog, $scope){

    self = this;
    // Declare aliases to service variables, arrays and objects
    self.years = CollectionService.years;
    self.minutes = CollectionService.minutes;
    self.records = CollectionService.records;
    // Declare aliases to service functions
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;
    self.popUpRecord = CollectionService.popUpRecord;
    self.editRecord = CollectionService.editRecord;
    self.deleteRecord = CollectionService.deleteRecord;
}]);