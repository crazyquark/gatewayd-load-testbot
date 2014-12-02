var auditor = require(__dirname+'/../api/auditor');
var http = require('superagent');

module.exports = function(request, response) {
  auditor.diff(request.params.invoice_id)
    .then(function(diff){
      response.send({
        success: true,
        diff: diff
      });
    })
    .error(function(error) {
      response.send({
        success: false,
        error: error
      });
    });
};
