var auditor = require(__dirname+'/../api/auditor.js');

module.exports = function(request, response) {
  auditor.audit(request.params.invoice_id)
    .then(function(audit){
      response.send({
        success: true,
        audit: audit
      });
    })
    .error(function(error) {
      response.send({
        success: false,
        error: error
      });
    });
};
