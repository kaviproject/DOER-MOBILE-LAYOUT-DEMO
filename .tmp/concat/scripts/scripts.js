'use strict';

/**
 * @ngdoc overview
 * @name eeaDoerApp
 * @description
 * # eeaDoerApp
 *
 * Main module of the application.
 */
angular
  .module('eeaDoerApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'times.tabletop',
    'angular.filter',
    'ngLodash',
    'angular-toArrayFilter'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/glossary', {
        templateUrl: 'views/glossary.html',
        controller: 'GlosCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'CtctCtrl'
      })
       .when('/FAQs', {
        templateUrl: 'views/faq.html',
        controller: 'FaqCtrl'
      })
        .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
  
 /*.config(function(TabletopProvider){
    TabletopProvider.setTabletopOptions({
      key:'https://docs.google.com/spreadsheets/d/1lizvDw-cztrOAaYOPdemJEXik9oyO2t4IepGOjcDdzk/pubhtml',
      simpleSheet: true
    })
 });*/

'use strict';

/**
 * @ngdoc function
 * @name eeaDoerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eeaDoerApp
 */

angular.module('eeaDoerApp')
    .controller('MainCtrl', ["$scope", "Tabletop", "$window", "$timeout", "$q", "lodash", "$anchorScroll", "$location", function($scope, Tabletop, $window, $timeout, $q, lodash, $anchorScroll, $location) {


 $location.hash('scrolltesting');
            $anchorScroll();
        //set the default sort type
        $scope.sortType = 'programName';
        // set the default sort order
        $scope.sortReverse = false;
        // set the default search/filter term

        $scope.searchIncentives = '';
        //Clear filters function

        $scope.showMe = function() {

            $location.hash('scrolltesting');
            $anchorScroll();
            console.log("true")
            $scope.show = true;
            $('#footer').css('position', 'relative');
        }

        function asyncdata() {
            var deferred = $q.defer();
            $timeout(function() {
                if ($window.incentiveData) {
                    deferred.resolve({
                        iData: $window.incentiveData,
                        zdata: $window.zipcodeData
                    });
                } else {
                    deferred.reject({
                        data: "Internal error"
                    })
                }
            }, 2000)
            return deferred.promise;
        }
        var utiltiyArray = [];
        asyncdata().then(function(data) {
            $scope.tableData = data.iData;
            console.log($scope.tableData);
            $scope.tableData2 = data.zdata;
            console.log($scope.tableData2)
        });
       
        $scope.clearFilters = function() {
            $scope.searchIncentives = '';
          
             $scope.tableData3='';
        };
     

        //Zipcode search functionality
        $scope.zipSearch = function() {
             //   $scope.searchIncentives = '';
              $scope.sortType = 'programName';
        // set the default sort order
        $scope.sortReverse = false;
            var utilityArray = [];
        var new_comp = [];
        var extracted_info = [];
            $('#footer').css('position', 'relative');
            $scope.show = true;
           $location.hash('scrolltesting');
            $anchorScroll();
            var textData = $scope.searchIncentives.ZIPCODE;
            console.log(textData)
            var output = lodash.where($window.zipcodeData, {
                ZIPCODE: textData
            });
            console.log(output);
            if (output.length > 0) {
                utilityArray.push(output[0]["Electric Utility 1"]);
                utilityArray.push(output[0]["Gas Utility 2"]);
                utilityArray.push(output[0]["Electric Utility 2"]);
                utilityArray.push(output[0]["GasUtility1"]);
            }
            else
            {
                console.log("hello empty data")
                $scope.tableData3='';  
            }
            utilityArray = lodash.without(utilityArray, '');
            var p_utility = lodash.pluck($window.incentiveData, 'participatingUtility');
            var inData = $window.incentiveData;
            for (var i = 0; i < inData.length; i++) {
                var p_utility_array = p_utility[i];
                var comp = p_utility_array.split(',')
                for (var j = 0; j < comp.length; j++) {
                    var clea = comp[j].trim();
                    new_comp.push(clea);
                }
                var combined_array = [utilityArray, new_comp];
               // console.log(utilityArray);
                //console.log(new_comp);
                var result = combined_array.shift().filter(function(v) {
                    return combined_array.every(function(a) {
                        return a.indexOf(v) !== -1;
                    });
                });

                if (result.length > 0) {
                    //  count++;
                    
                   // console.log(inData[i]);
                    extracted_info.push(inData[i]);

                }
                new_comp = [];
            }
            utilityArray = [];
           //debugger;
            $scope.tableData3='';
            $scope.tableData3=[];
           
         $scope.tableData3 = extracted_info;
        // $location.hash('scrolltesting');
          //  $anchorScroll();
            console.log($scope.tableData3);
        }

    }]);



    //End Ctrl

/*  var count = function() {
      console.log($window.incentiveData);
      console.log($window.zipcodeData);
      $scope.tableData = $window.incentiveData;
      $scope.tableData2 = $window.zipcodeData;
  }
  $timeout(count, 2000);

$scope.gotoBottom=function()
{
console.log("gotoBottom function called");
$location.hash('scrolltesting');
$anchorScroll();
}

.filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});;




  */
'use strict';

/**
 * @ngdoc function
 * @name eeaDoerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eeaDoerApp
 */
angular.module('eeaDoerApp')
  .controller('GlosCtrl', ["$scope", function ($scope) {
  	
          console.log('something fired');
          $scope.something = [];
  }]);

angular.module('eeaDoerApp')
  .controller('FaqCtrl', ["$scope", function ($scope) {
  	
          console.log('something fired');
          $scope.something = [];
  }]);
 'use strict';

/**
 * @ngdoc function
 * @name eeaDoerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eeaDoerApp
 */
angular.module('eeaDoerApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
  	
          console.log('something fired');
          $scope.something = [];
  }]);

angular.module('eeaDoerApp')
  .controller('CtctCtrl', ["$scope", function ($scope) {
  	
          console.log('something fired');
          $scope.something = [];
  }]);
'use strict';

/**
 * @ngdoc filter
 * @name eeaDoerApp.filter:typeFilter
 * @function
 * @description
 * # typeFilter
 * Filter in the eeaDoerApp.
 */
angular.module('eeaDoerApp')
  .filter('typeFilter', function () {
    return function (items, types) {

      var filtered = [];
      
      angular.forEach(items, function(item){
    	  if (types.renewables === false && types.efficiency === false) {
    		filtered.push(item);
    	  }else if(types.renewables === true && types.efficiency === false && item.incentiveType === 'renewables'){
    		filtered.push(item);
         }else if(types.efficiency === true && types.renewables === false && item.incentiveType === 'efficiency'){
    		filtered.push(item);
    	  }

      });


      return filtered;
      //'typeFilter filter: ' + items;

    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name eeaDoerApp.filter:categoryFilter
 * @function
 * @description
 * # categoryFilter
 * Filter in the eeaDoerApp.
 */
angular.module('eeaDoerApp')
  .filter('categoryFilter', function () {
    return function (items, categories) {
     
      var categoried = [];

      angular.forEach(items, function(item){
       // debugger;
    	  if (categories.appliances === false && categories.construction === false) {
    		categoried.push(item);
    	  }else if(categories.appliances === true && categories.construction === false && item.category === 'appliances'){

    		categoried.push(item);
         }else if(categories.construction === true && categories.appliances === false && item.category === 'construction'){
    		categoried.push(item);
    	  }

      });
      return categoried;
     };
  });
