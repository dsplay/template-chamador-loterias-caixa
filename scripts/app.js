"use strict";

(function () {
  // here we can apply use DSPLAY values to your template
  var u = dsplayTemplateUtils;

  // Include app dependency on ngMaterial
  var app = angular.module('TicketApp', []);

  var input = u.media.buffer;

  var result = '';

  for (var i = 0, len = input.length; i < len; i++) {
    var c = input[i];

    if (!isNaN(c)) {
      result += c;
    }
  }

  if (result.length == 1) {
    result = '0' + result;
  }

  app.controller('TicketController', function ($scope) {
    console.log($scope);
    $scope.text = result;
  });

})();