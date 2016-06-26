// ==========================
// Reduxify JS
// desc: Development tools to automatically bind actions and storestate to props.
// Author: Brian Boyko <brian.boyko@gmail.com>
// ==========================

var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;
var _ = require('lodash');

module.exports = function reduxify(actions, reducerList, component){

  var mapStateToProps = function (state) {
    return _.pick(state, reducerList);
  }

  var prepareActions = function (actions){
    return function(dispatch) {
      return {
        actions: bindActionCreators(actions.default, dispatch),
        dispatch: dispatch,
      }
    }
  }

  var mapDispatchToProps = function(dispatch) {
   return prepareActions(actions, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(component);

}
