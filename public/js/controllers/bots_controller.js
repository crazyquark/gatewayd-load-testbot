botsApp.controller('BotsCtrl', ['$scope', '$rootScope', '$location', 'Bots', function($scope, $rootScope, $location, Bots) {
  $scope.bots = [];

  Bots.getAll(function(error, response) {
    if (!error) {
      $scope.bots = response.data;
    }
  });

  Bots.getAll(function(error, response) {
    if (!error) {
      $scope.bots = response.data;
    }
  });

  $scope.filter = function (querystring) {
    Bots.filter(querystring, function(error, response) {
      if (!error) {
        $scope.bots = response.data;
      }
    });
  };

  $scope.filter('state=in_progress', function(error, response) {
    console.log(error, response);
  });

  $scope.isSubmitting = false;

  $scope.newBot = {
    to_account: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    from_account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    payment_sent_count: 1,
    payment_target_count: 10,
    currency: 'GWD',
    state: 'in_progress',
    bot_type: 'outgoing',
    interval: 2000,
    bot_invoice: 'invoice_id'
  }

  $scope.createBot = function () {
    $scope.isSubmitting = true;

    Bots.create($scope.newBot, function(error, response) {
      if (error) {
        console.log('error', error);
        $scope.isSubmitting = false;
      } else if (response.status == 'error') {
        console.log('error', response.message);
        $scope.isSubmitting = false;
      } else {
        console.log('response', response);
        $location.url('/');
        $('#formModal').modal('hide');
        Bots.filter('state=in_progress', function(error, response) {
          if (!error) {
            $scope.bots = response.data;
          }
        });
        $scope.isSubmitting = false;
      }
    })
  }
  $scope.abort = function (bot) {
    bot.state = 'aborted';
    Bots.update(bot, function(error, response) {
      console.log(error, response);
    })
  }

  $scope.audit_results = {};
  $scope.audit = function (bot) {
    $scope.audit_results = {};
    Bots.audit(bot, function(error, response) {
      if (error) {
        console.log(error);
        alert('ERRR')
      } else if (response.success) {
        $scope.audit_results = response.audit;
      } else {
        console.log(response);
        alert('ERRR')
      }
    });
  }

}]);
