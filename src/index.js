import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Enhances the <react-redux/connect> function.
 *
 * @param state <String>              The name of the desired state.
 *                                    The component will be given read-access to this state.
 * @param selector <function>         selector mapping app states to component props.
 *                                    A memoized selector function describing selection logic.
 *                                    The selector efficiently computes derived data from the store.
 * @param actions <Object>[function]  Object of actions.
 *                                    The component will be allowed to execute these actions.
 * @return <function>                 an enhanced <connect> function.
 */
export default function reduxify({ state, selector, actions }) {
  var mapStateToProps
  var mapDispatchToProps

  if typeof state !== 'string'
    throw new Error('State parameter must be a string.')

  if typeof selector !== 'function'
    throw new Error('Selector must be a function.')

  if typeof actions !== 'object'
    throw new Error('Actions must be an object of functions.')

  // the component will subscribe to Redux store updates
  if (state)
    mapStateToProps = STATE => ({
      [state]: STATE[state]
    })

  // the component will subscribe to Redux store updates per a selector
  if (selector)
    mapStateToProps = selector

  // the component will be provided actions
  if (actions)
    mapDispatchToProps = dispatch => ({
      actions: bindActionCreators(actions, dispatch)
    })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )
}
