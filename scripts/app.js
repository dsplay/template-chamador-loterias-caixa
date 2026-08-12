"use strict";

(function () {
  var u = dsplayTemplateUtils;

  var input = u.media.buffer;

  var result = '';

  for (var i = 0, len = input.length; i < len; i++) {
    var c = input[i];

    if (!isNaN(c)) {
      result += c;
    }
  }

  if (result.length === 1) {
    result = '0' + result;
  }

  document.getElementById('numero').textContent = result;
})();
