var PROVIDER = (function() {
  var _allData = {};
  var _currentPage = "";

  var _getData = function(callback) {
    $.getJSON("data/data.json", function(data) {
      // this is when it is complete
      console.log(data);
    })
      .done(function(data) {
        _allData = data;
        callback();
      })
      .fail(function(error) {
        console.log(error);
      });
  };

  var _getNavigation = function() {
    return _allData.navigation;
  };

  var _getSocialMedia = function() {
    return _allData.social;
  };

  var _getPageContent = function(nameOfPage) {
    var content = "";
    $.each(_allData.content, function(index, page) {
      if (nameOfPage === page.pageName) {
        content = page.content;
        _currentPage = page.pageName;
      }
    });
    return content;
  };

  var _getCurrentPageName = function() {
    return _currentPage;
  };

  return {
    getData: _getData,
    getNavigation: _getNavigation,
    getSocialMedia: _getSocialMedia,
    getPageContent: _getPageContent,
    getCurrentPageName: _getCurrentPageName
  };
})();
