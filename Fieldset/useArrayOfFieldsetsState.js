// @flow
import { useState } from 'react';
import { type EnhancedState, type ShapedEnhancedState } from './index';
import mergeStates from './helpers/mergeStates';
import validateArrayOfFieldsets from './helpers/validateArrayOfFieldsets';

export default function useArrayOfFieldsetsState<S: {}>(
  rawState: Array<S> = [],
): [
  Array<EnhancedState<S>>,
  (Array<ShapedEnhancedState<S>>) => void,
  (number, ShapedEnhancedState<S>) => void,
  () => boolean,
  boolean
] {
  const [state, setState] = useState(() => rawState.map(newState => mergeStates<S>(newState)));
  const [isValidationFailed, setValidationFailed] = useState(false);
  return [
    state,
    (newArrayOfFieldsets) => {
      setValidationFailed(false);
      setState(
        newArrayOfFieldsets.map((newState, index) => mergeStates<S>(newState, state[index])),
      );
    },
    (index, newFieldsetState) => {
      setValidationFailed(false);
      setState(
        state.reduce(
          (acc, cur, i) => (index === i
            ? acc.concat(mergeStates<S>(newFieldsetState, state[index]))
            : acc.concat(cur)),
          [],
        ),
      );
    },
    () => {
      const [newState, isFailed] = validateArrayOfFieldsets(state);
      setValidationFailed(isFailed);
      setState(newState);
      return !isFailed;
    },
    isValidationFailed,
  ];
}
