// ==========================
// Reduxify JS
// desc: Development tools to automatically bind actions and storestate to props.
// Author: Brian Boyko <brian.boyko@gmail.com>
// For compatability reasons, this is written in ES5.
// ==========================

var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;

// this standAlonePick is a reimplementation of "pick" from libraries such as
// lodash and underscore. Since we only need this one function, it is perhaps
// best to simply use it here.

function standAlonePick(state, list) {
  return list.reduce(function(prev, curr) {
    prev[curr] = state[curr];
    return prev;
  }, {});
}

/* ************************************
Parameters:
  actions         | @object[containing objects]: An object, which contains all
                    the action creators of the application. Since actioncreators
                    are constants, there should be no performance detriment for
                    including them all.
  keyList         | @array[containing strings]: An array of strings, listing all
                    the keys in the redux store that the user wishes to bind to
                    this.props for this component.
                    Only the keys necessary for the component's function should
                    be included, so that the component does not re-render when
                    the function changes.
  component       | @React.Component: The react component to which to bind the
                    props.
  optionalMethods | @object(optional)[containing methods]: if the user wishes to
                    bind other methods to the component's props, the user can
                    specify these methods here. One scenario which this might be
                    useful is if the user wants to pass in getState() as a prop.
************************************ */

module.exports = function reduxify(actions, keyList, component, optionalMethods) {

  var mapStateToProps = function(state) {
    return standAlonePick(state, keyList);
  };

  var prepareActions = function(actions) {
    return function(dispatch) {
      // this is incase the user passes in the action creatores as "actions.default"
      // instead of "actions";
      if (actions.hasOwnProperty('default') && Object.keys(actions).length ===
        1) {
        actions = actions.default;
      }

      var output = {
        actions: bindActionCreators(actions, dispatch),
        dispatch: dispatch,
      };
      // Here, we add any optional methods the user has supplied.
      // optionalMethods does not need to be supplied.
      if (optionalMethods && typeof(optionalMethods) === "object") {
        for (var key in optionalMethods) {
          output[key] = optionalMethods[key];
        }
      }
      return output;
    };
  };

  var mapDispatchToProps = function(dispatch) {
    return prepareActions(actions, dispatch);
  };

  return connect(mapStateToProps, mapDispatchToProps)(component);
};
