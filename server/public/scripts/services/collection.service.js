// Connect $http functionality, inject angular components
collectionApp.service('CollectionService', ['$http', '$mdDialog', '$mdToast', function($http, $mdDialog, $mdToast){
    const self = this;
    // Create onbject with empty arrays in which to store GET request data
    self.records = { collection: [], genres: [], favorites: [] }
    // Create value options for record "release_year" and "run_time" properties
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

    // GET records in database, reassign as array in self.records object
    self.getRecords = function(){
        $http.get('/records').then((response) => {
            self.records.collection = response.data;
        }).catch((error) => {
            console.log('Error getting record', error);
        });
    };
    // GET genres in database, reassign as array in self.records object
    self.getGenres = function(){
        $http.get('/genres').then((response) => {
            self.records.genres = response.data;
        }).catch((error) => {
            console.log('Error getting record', error);
        });
    };
    // GET favorite records in database, reassign as array in self.records object
    self.getFavorites = function() {
        $http.get('/favorites').then((response) => {
            self.records.favorites = response.data;
        }).catch((error) => {
            console.log('Error getting favorites', error);
        });
    };

    // POST new record in database using user input data, close angular material dialogue, update records and genres for DOM display
    self.addRecord = function(recordToAdd) {
        $mdDialog.hide();
        $http.post('/records', recordToAdd).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch(function(error){
            console.log('Error adding record!');
        })
        
    };
    // POST new genre in database using user input data, update records and genres for DOM display
    self.addGenre = function(genreToAdd) {
        $http.post('/genres', {genre: genreToAdd} ).then((response) => {
            self.getRecords();
            self.getGenres();
            self.showToast('Genre added!'); // not working, not sure why?
        }).catch((error) => {
            console.log('Error adding genre!');
        })
    };

    // DELETE selected record from database based on unique id, but confirm first using material dialogue
    self.deleteRecord = function(recordToDelete) {
        return $http.delete(`/records/${recordToDelete.id}`).then((response) => {
            self.getRecords();
            self.getGenres();
            self.getFavorites();
            return response;
        }).catch((error) => {
            console.log('error deleting', error);
            return error;
        })
    };
    // DELETE selected genre from database based on unique genre_id, close angular material dialogue popup on DOM
    self.deleteGenre = function(genreToDelete){
        $mdDialog.hide();
        $http.delete(`/genres/${genreToDelete.genre_id}`).then((response) => {
            self.getRecords();
            self.getGenres();
        }).catch((error) => {
            console.log('error deleting', error);
        })
    };
     // PUT/EDIT selected record in database based on unique id, close angular material dialogue,
     // update current records, genres, and favorites for DOM display, clear "popUpRec" object
    self.editRecord = function(recordToEdit){
        $mdDialog.hide();
        $http({
            method: 'PUT',
            url: `/records/${recordToEdit.id}`,
            data: recordToEdit
        }).then((response) => {
            self.getRecords();
            self.getGenres();
            self.getFavorites();
            self.records.popUpRec = {};
        }).catch((error) => {
            console.log('error updating', error);
        })
    };
    // PUT/EDIT selected genre in database based on unique genre_id, close angular material dialogue,
    // update current records and genres for DOM display
    self.editGenre = function(genreToEdit){
        $mdDialog.hide();
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
        
    };
    
    // Creata popup angular material dialogue when user clicks record image, display new page view (recPopUp.html),
    // which displays record details to user and allows editing/deleting of record
    self.popUpRecord = function(ev, record) {
        self.records.popUpRec = record;
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
    };
    // Creata popup angular material dialogue on user click,, display new page view (addRecPopUp.html),
    // which allows user to input a new record
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
    };
    // Creata popup angular material dialogue when user clicks genre div, display new page view (genPopUp.html),
    // which displays genre details to user and allows editing/deleting of genre
    self.popUpGenre = function(ev, genre) {
        self.records.popUpGen = genre;
        if (genre.count == 0){
            self.is0 = true;
        } else {
            self.is0 = false;
        }
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
    };

    // Alert user when actions have been completed. Currently not working and not sure why!
    self.showToast = function(toastText) {
        $mdToast.show(
            $mdToast.simple()
              .textContent(toastText)
              .hideDelay(4000)
        );
    };

    // Obtain current records, genres, and favorites on page load for DOM display
    self.getRecords();
    self.getGenres();
    self.getFavorites();

}]);