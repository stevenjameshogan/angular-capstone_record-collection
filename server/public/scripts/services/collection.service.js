// Connect $http functionality
collectionApp.service('CollectionService', ['$http', '$mdToast','$mdDialog', function($http, $mdToast, $mdDialog){
    console.log('service is loaded');

    const self = this;

    self.records = { collection: [], genres: [] }
    self.years = {list: [1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 
        1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 
        1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 
        1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 
        1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 
        2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]}
    self.minutes = {list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 
        44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 
        67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 
        90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 
        110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]}
    
    self.getRecords = function(){
        $http.get('/records').then((response) => {
            self.records.collection = response.data;
        }).catch((error) => {
            console.log('Error getting record', error);
        });
    };
    
    self.getGenres = function(){
        $http.get('/genres').then((response) => {
            self.records.genres = response.data;
        }).catch((error) => {
            console.log('Error getting record', error);
        });
    };

    self.addRecord = function(recordToAdd) {
        $mdDialog.hide();
        $http.post('/records', recordToAdd).then((response) => {
            self.getRecords();
            self.getGenres();
            self.showToast('Record added!');
        }).catch(function(error){
            console.log('Error adding record!');
        })
        
    }
    self.addGenre = function(genreToAdd) {
        $http.post('/genres', {genre: genreToAdd} ).then((response) => {
            self.getRecords();
            self.getGenres();
            self.showToast('Record added!');
        }).catch((error) => {
            console.log('Error adding genre!');
        })
    }

    self.deleteRecord = function(recordToDelete) {
        $mdDialog.hide();
        $http.delete(`/records/${recordToDelete.id}`).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch((error) => {
            console.log('error deleting', error);
        })
    }
    self.deleteGenre = function(genreToDelete){
        $http.delete(`/genres/${genreToDelete.genre_id}`).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch((error) => {
            console.log('error deleting', error);
        })
    }

    self.editRecord = function(recordToEdit){
        $mdDialog.hide();
        $http({
            method: 'PUT',
            url: `/records/${recordToEdit.id}`,
            data: recordToEdit
        }).then((response) => {
            self.getRecords();
            self.getGenres();
            self.records.popUpRec = {};
        }).catch((error) => {
            console.log('error updating', error);
        })
    }
    self.editGenre = function(genreToEdit){
        console.log('in edit genre', genreToEdit);
        $http({
            method: 'PUT',
            url: `/genres/${genreToEdit.genre_id}`,
            data: genreToEdit
        }).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch((error) => {
            console.log('error updating', error);
        })
        
    }

    self.showToast = function(toastText) {
        $mdToast.show( // display the toast
            $mdToast.simple() // build the toast
              .textContent(toastText) 
              .hideDelay(2000)
        );
    };

    self.popUpRecord = function(ev, record) {
        self.records.popUpRec = record;
        console.log(record, self.records);
        
        $mdDialog.show({
            // controller: 'RecordsController',
            templateUrl: '../../views/recPopUp.view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
          })
          .then(function(answer) {
          }, function() {
          });
    }

    self.popUpAddRec = function(ev) {
        $mdDialog.show({
            // controller: 'RecordsController',
            templateUrl: '../../views/addRecPopUp.view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
          })
          .then(function(answer) {
          }, function() {
          });
    }

    self.popUpGenre = function(ev, genre) {
        console.log('in popupgen');
        
        self.records.popUpGen = genre;
        console.log( genre, self.records);
        $mdDialog.show({
            // controller: 'RecordsController',
            templateUrl: '../../views/genPopUp.view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
          })
          .then(function(answer) {
          }, function() {
          });
    }

    self.getRecords();
    self.getGenres();

}]);