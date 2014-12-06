(function (angular){
  "use strict";

    //
    //  workfolio.service.projects
    //

    var appService = angular.module('workfolio.service.projects', []);

    //
    //  Projects service
    //

    // TO DO
    
    appService.factory('ProjectsService',
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
                                id: classes.id.$t,
                                year: parseInt(classes.gsx$year.$t),

                                name: classes.gsx$name.$t,
                                description: classes.gsx$caption.$t,
                                client: classes.gsx$client.$t,

                                type: classes.gsx$type.$t,
                                color: classes.gsx$color.$t,

                                thumbUrl: classes.gsx$thumburl.$t,
                                imageUrl: dirImages + classes.gsx$imageurl.$t
                            };

                            // rewrite image source (folder and extension)

                            // if thumb field is 'same'
                            if($project.thumbUrl === "same") {
                                $project.thumbUrl = $project.imageUrl;
                            }

                            // if thumb field is 'local'
                            if($project.thumbUrl === "local") {
                                var thumbSrc = ($project.imageUrl.replace(/^.*(\\|\/|\:)/, ''));
                                $project.thumbUrl = dirThumbs + thumbSrc.substr(0, thumbSrc.lastIndexOf(".")) + ".jpg";
                            }

                            // add to list
                            projectList.push($project);
                        });
                    });

                    // projects = projectList;

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

            // expose
            return {
                init: init,

                all: function() {
                    return projects;
                }

            };

        }
    ]);

// end
})(angular);