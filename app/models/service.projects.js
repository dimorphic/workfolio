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
        ['_', '$rootScope', '$q', '$http', 'GENERAL_CONFIG',
        function(_, $rootScope, $q, $http, GENERAL_CONFIG) {

            //
            // Define projects
            //
            var projects = [];

            var cfg = GENERAL_CONFIG;

            var dirImages = "./assets/portofolio";
            var dirThumbs = dirImages + "/_thumbs/thumb_";

            // fetcher
            var init = function() {
                // there's always a promise!
                var deferred = $q.defer();

                var projectList = [];

                // db reference
                var sync = $http.jsonp(cfg.DBURL);

                // db fetch ok
                sync.success(function(data) {

                    // parse data
                    angular.forEach(data, function(value, index){
                        angular.forEach(value.entry, function(classes, index) {

                            // project model
                            var $project = {
                                name: classes.gsx$name.$t,
                                type: classes.gsx$type.$t,
                                year: parseInt(classes.gsx$year.$t),
                                client: classes.gsx$client.$t,

                                color: classes.gsx$color.$t,

                                // TODO: finish thumb + real img src
                                thumbUrl: '',
                                imageUrl: dirImages + classes.gsx$imageurl.$t
                            };

                            // rewrite folder and extension for thumb image
                            var thumbSrc = ($project.imageUrl.replace(/^.*(\\|\/|\:)/, ''));
                            $project.thumbUrl = dirThumbs + thumbSrc.substr(0, thumbSrc.lastIndexOf(".")) + ".jpg";

                            // add to list
                            projectList.push($project);
                        });
                    });

                    //projects = projectList;

                    // sort data by year, DESC
                    projects = _.sortBy(projectList, function(obj) { return +obj.year; }).reverse();

                    // resolve promise!
                    deferred.resolve(projects);

                }).error(function(error) {

                    // reject promise
                    deferred.reject(error);

                });

                // return promise
                return deferred.promise;
            };

            // init();
            // var activeProject = [];
            // var availableProjects = projects;

            // expose
            return {
                init: init,

                all: function() {
                    return projects;
                }

                /*

                setActive: function(value) {
                    activeProject = availableProjects[value];
                },

                getAvailable: function() {
                    return availableProjects;
                },

                random: function() {
                    return availableProjects[_.random(availableProjects.length - 1)];
                }
                */
            };

        }
    ]);

// end
})(angular);