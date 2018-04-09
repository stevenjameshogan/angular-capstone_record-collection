collectionApp.controller('FavoritesController', 
['CollectionService','$mdToast', '$mdDialog', function(CollectionService, $mdToast, $mdDialog, $scope){
    console.log('Favorites Controllerloaded!');

    self = this;
    self.years = CollectionService.years;
    self.minutes = CollectionService.minutes;

    self.records = CollectionService.records;
    self.getRecords = CollectionService.getRecords;
    self.getGenres = CollectionService.getGenres;
    self.popUpRecord = CollectionService.popUpRecord;


    self.editRecord = CollectionService.editRecord;

    self.deleteRecord = CollectionService.deleteRecord;

}]);