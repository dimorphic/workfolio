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
    function getUUID() {
        var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        return fmt.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
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
                var sync = $http.get(cfg.DBURL);

                // db fetch ok
                sync.success(function(data) {
                    // parse data
                    angular.forEach(data, function(item, index){
                        // project model
                        var $project = {
                            id: getUUID(),
                            year: parseInt(item.year),

                            name: item.name,
                            description: item.description,
                            client: item.client,

                            type: item.type,
                            color: item.color,

                            thumbUrl: item.thumbUrl,
                            imageUrl: dirImages + item.imageUrl
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