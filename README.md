# reduxify

Enhances the [react-redux/connect](https://github.com/reactjs/react-redux) function for simple cases.

## Installation:

```
npm install --save reduxify
```

## API:

### `reduxify({[state], [selector], [actions]})`

#### Arguments

1. [`state`] *(String)*: A String corresponding to the name of a top-level branch of the app state tree.

2. [`selector`] *(function)*: A function mapping state to props. A memoized selector function describing specific selection logic. The selector efficiently computes derived data from the store. Using [Reselect](https://github.com/reactjs/reselect) is recommended. If specified, the selector mapping will override the `state` parameter.

3. [`actions`] *(Object)*: An object containing actions.

#### Returns

*(function)*: An enhanced `connect` function for use on a React component class.

#### Example

```javascript
import React, { Component } from 'react'
import reduxify from 'store/reduxify'
import { action1, action2 } from 'actions/myActions'
import MyComponent from 'components/MyComponent'

class MyContainer extends Component {

  render() {
    const { mySubState, actions } = props
    return (
      <MyComponent
        prop1={ mySubState.value1 }
        prop2={ mySubState.value2 }
        action1={ actions.action1 }
        action2={ actions.action2 }
      />
    )
  }
}

export default reduxify({
  state: 'mySubState',
  actions: { action1, action2 }
})(MyContainer)
//=====================
```

## Notes for 1.0.1

This package no longer depends on Lodash.

This package now supports custom props passed in as a fourth parameter.

This package is backwards compatable with 1.0.0, and can be dropped in as a replacement.

## Notes for 1.0.2

Jonathan Sun contacted Brian Boyko and pointed out he had done very similar work, as such, he and Brian are now listed as co-contributors.

## Notes for 1.0.3

Simplify reduxify.
 - Specify either a top-level app substate or supply a selector function.
 - Supply actions as an object of actions instead of array
 - Remove `component` and `optionalMethods` parameters
