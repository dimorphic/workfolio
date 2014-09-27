(function (angular){
  "use strict";

    //
    //  workfolio.service.projects
    //

    var appService = angular.module('workfolio.service.projects', []);

    //
    //  Colors service
    //

    // TO DO
    
    appService.factory('ProjectService',
        ['_', '$rootScope', '$q', '$http',
        function(_, $rootScope, $q, $http) {

            //
            // Define colors
            //
            var projects = [];

            var results = [];

            var years = [];
            var availableCategories = [];

            var init = function() {
                // there's always a promise!
                var deferred = $q.defer();

                var projectList = [];

                // db reference
                var sync = $http.jsonp('https://spreadsheets.google.com/feeds/list/1BVPdAa0j09ZdP_3u1AhId941gUpKcngBMliDL7GYnGA/od6/public/values?alt=json-in-script' + '&callback=JSON_CALLBACK');

                // db fetch ok
                sync.success(function(data) {

                    // parse data
                    angular.forEach(data, function(value, index){
                        angular.forEach(value.entry, function(classes, index) {

                            // project model
                            var $project = {
                                name: classes.gsx$name.$t,
                                type: classes.gsx$type.$t,
                                year: classes.gsx$year.$t,
                                client: classes.gsx$client.$t,

                                color: classes.gsx$color.$t,
                                thumbUrl: classes.gsx$imageurl.$t
                                //imageUrl: classes.gsx$imageurl.$t

                            };

                            //console.log("project info @ ", $project);
                            projectList.push($project);
                        });
                    });

                    // resolve promise!
                    deferred.resolve(projectList);

                }).error(function(error) {

                    // reject promise
                    deferred.reject(error);

                });

                // return promise
                return deferred.promise;
            };

            // init();

            var activeProject = [];
            var availableProjects = projects;



            // expose
            return {
                init: init,

                all: function() {
                    return projects;
                },

                setActive: function(value) {
                    activeProject = availableProjects[value];
                },

                getAvailable: function() {
                    return availableProjects;
                },

                random: function() {
                    return availableProjects[_.random(availableProjects.length - 1)];
                }

            };

        }
    ]);

// end
})(angular);