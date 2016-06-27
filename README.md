## N.B.:

Both Brian Boyko and Johnathan Sun came up with similar versions of this code independently.

Johnathan Sun's prior art can be found here: https://gist.github.com/sunyang713/ebb9b3573aaf90f29e78

# reduxify

Reduxify is a small NPM module utility designed to quickly connect your react components to redux stores. One line of code maps your actions and reducers to the props of your component.  

## Installation:

```
npm install --save reduxify
```

## Basic Usage:

```
export default reduxify(
  actions,         // an object that contains your action creators.
                   // the action creators can be either defined in the root of
                   // the action object, or in actions.default;
  keyList,         // an array of strings of the names of keys in the Redux store
                   // that you want to map to this particular
                   // component
  component,       // the component you wish to map actions and props to.
  optionalMethods  // [OPTIONAL] you can define optional methods here that you
                   // wish to bind to props. (i.e., getState() and others);  
)
```

A small example:

```
// ../actions/index.js
//=====================
import * as counterActions from './actionsCounter'
export default Object.assign({}, counterActions);
//=====================

// ../utilities/addNums.js
//=====================
export default const addNums = (a, b) => (a + b);
//=====================

// ./containers/App.js
//=====================
import React, { Component } from 'react';
import * as actions from '../actions';
import addNums from '../utilities/addNums'
import reduxify from 'reduxify';
import {getState} from '../store/configStore';

class App extends Component {
  constructor(props){
    super(props);
    this.add = this.add.bind(this);
    this.getStore = this.getStore.bind(this);
    this.state = {
      total: 0,
      theEntireReduxStore: {},
    }
  }

  add(){
    this.setState({total: this.props.addNums(this.props.counterAlpha, this.props.counterBeta)})
  }

  getStore(){
    this.setState({theEntireReduxStore: JSON.stringify(this.props.getState(), null, 2)})
  }

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
      <h2>Total:
        <b>{this.state.total}</b>
      </h2>
      <button onClick={this.add}>Add Numbers</button>
      <h2>The Entire Redux Store:
        <pre>{this.state.theEntireReduxStore}</pre>
      </h2>
      <button onClick={this.props.getStore}>Get Everything</button>
      </div>
    );
  }
}

export default reduxify(actions, ['counterAlpha', 'counterBeta'], App, {addNums, getState});
//=====================

```

## Features:

* You can access actions via "this.props.actions.NAME_OF_ACTION"
* You can access keys to the redux store via "this.props.NAME_OF_KEY"
* You can access the dispatch via "this.props.dispatch"
* You can access any other methods you provide in the 4th parameter via "this.props.NAME_OF_METHOD"

## Notes for 1.0.1

This package no longer depends on Lodash.

This package now supports custom props passed in as a fourth parameter.

This package is backwards compatable with 1.0.0, and can be dropped in as a replacement.

## Notes for 1.0.2

Johnathan Sun contacted Brian Boyko and pointed out he had done very similar work, as such, he and Brian are now listed as co-contributors.  
