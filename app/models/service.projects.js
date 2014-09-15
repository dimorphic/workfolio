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

            //
            // demo Projects
            //
            projects = [
                {
                    name: "Heineken",
                    thumb: "./assets/images/img-01.jpg"
                },
                {
                    name: "We Come One",
                    thumb: "./assets/images/img-02.jpg"
                },
                {
                    name: "Scorpiones",
                    thumb: "./assets/images/img-03.jpg"
                },
                {
                    name: "Panthera",
                    thumb: "./assets/images/img-04.jpg"
                },
                {
                    name: "Vocea Romaniei",
                    thumb: "./assets/images/img-05.jpg"
                },
                {
                    name: "They See me Rollin'",
                    thumb: "./assets/images/img-06.jpg"
                },
                {
                    name: "Real Steel",
                    thumb: "./assets/images/img-07.jpg"
                },
                {
                    name: "X marks the spot",
                    thumb: "./assets/images/img-08.jpg"
                },

                // -------------------

                {
                    name: "test-01",
                    thumb: "http://nyx.athma.net/pix/_scraps_2010_Static.jpg"
                }

            ];

            // Map colors
            /*colorCodes = _.map(colors, function(value, key) {
                return { name: key, code: value };
            });*/


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
                                thumbUrl: classes.gsx$imageurl.$t
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

                    // notify application
                    // $rootScope.$broadcast('');
                },

                getAvailable: function() {
                    return availableProjects;
                },

                getActive: function() {
                    return activeProject;
                },

                random: function() {
                    return availableProjects[_.random(availableProjects.length - 1)];
                }

            };

        }
    ]);

// end
})(angular);