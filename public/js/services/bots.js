botsApp.service('Bots', ['$http', function($http) {

  function Bots () {
    this.base_url = '/api/bots';
    this.success = function(callback) {
      return function(response, status, headers, config) {
        callback(null, response);
      }
    };

    this.error = function(callback) {
      return function(response, status, headers, config) {
        callback(response);
      }
    }

  }

  Bots.prototype = {
    getAll: function(callback) {
      var _this = this;
      $http.get(_this.base_url)
        .success(_this.success(callback))
        .error(_this.error(callback))
    },
    getOne: function(id, callback) {
      var _this = this;
      $http.get(_this.base_url+'/'+id)
        .success(_this.success(callback))
        .error(_this.error(callback));
    },
    filter: function(filter, callback) {
      var _this = this;
      $http.get(_this.base_url+'?'+filter)
        .success(_this.success(callback))
        .error(_this.error(callback));
    },
    create: function(bot, callback) {
      var _this = this;
      $http({
        method: "POST",
        url: _this.base_url,
        data: bot
        })
        .success(_this.success(callback))
        .error(_this.error(callback));
    },
    update: function(data, callback) {
      var _this = this;

      $http({
        method: "PUT",
        url: _this.base_url + '/' + data.id,
        data: data
      })
        .success(_this.success(callback))
        .error(_this.error(callback));
    },
    audit: function (data, callback) {
      var _this = this;
      $http.get('/audit/' + data.bot_invoice)
        .success(_this.success(callback))
        .error(_this.error(callback));
    }

  };

  return new Bots();

}]);