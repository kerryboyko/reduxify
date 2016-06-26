# reduxify

Reduxify is a small utility designed to quickly connect your react components to redux stores. One line of code maps your actions and reducers to the props of your component.  

## Installation:

```
npm install --save reduxify
```

## Basic Usage:

```
export default reduxify(
  actions, // an object with a single property, "default" which contains all your actions.
  reducers, // an array of strings of the names of reducers you want to map to this particular component
  component // the component you wish to map actions and props to.
)
```

A small example, with an action called "incrementCounter" and a reducer called "counter"

```
// ./actions/index.js
//=====================
import * as counterActions from './actionsCounter'
export default Object.assign({}, counterActions);
//=====================

// ./containers/App.js
//=====================
import React, { Component } from 'react';
import * as actions from '../actions';
// actions is an option that contains "{ default: {ALL_YOUR_ACTIONS} }"
import reduxify from 'reduxify';

class App extends Component {
  render() {
    return (<div>
      <h2>Redux Store Counter:
        <b>{this.props.counterAlpha}</b>
      </h2>
      <button onClick={this.props.actions.incrementCounterAlpha}>
        Increment Alpha
      </button>
      <h2>Redux Store Counter:
        <b>{this.props.counterBeta}</b>
      </h2>
      <button onClick={this.props.actions.incrementCounterBeta}>
        Increment Beta
      </button>
      </div>
    );
  }
}

export default reduxify(actions, ['counterAlpha', 'counterBeta'], App);
//=====================

```

## Features:

* You can access actions via "this.props.actions.NAME_OF_ACTION"
* You can access reducers via "this.props.NAME_OF_REDUCER"
* You can access the dispatch via "this.props.dispatch"

## Notes & Future features:

This package depends on lodash, specifically, the "pick" method.

* I'd like to find a way to map "getState()" to props without requiring importing the "getState" method from the store directly, but this is not currently supported by the "connect" method in react-redux. One approach for this, might be to have a fourth property which does nothing if undefined, but which is getState() for those who choose to import it from the store.  This strikes me as inelegant, however.

* Another option that I was back-and-forth on was the ability to map all the reducers in your root reducer to props, (and may add this back in as an option) but the problem with doing this as a default is that all reduxified components will end up re-rendering when any reducer changes, leading to wasteful renders.  Forcing users to specify the specific reducers they need prevents this waste.  
