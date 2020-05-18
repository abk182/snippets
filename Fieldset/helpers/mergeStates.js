// @flow
import { type EnhancedState, type ShapedEnhancedState } from '../index';

export default function mergeStates<S: {}>(
  nextState: ShapedEnhancedState<S>,
  prevState?: EnhancedState<S> = {},
): EnhancedState<S> {
  return Object.keys(nextState).reduce(
    (fieldset, field) => ({
      ...fieldset,
      [field]: {
        ...prevState[field],
        ...nextState[field],
        isInvalid: nextState[field].isInvalid || false,
        error: nextState[field].error || '',
      },
    }),
    prevState,
  );
}
