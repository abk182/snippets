// @flow
import { useState } from 'react';
import { type EnhancedState, type ShapedEnhancedState } from './index';
import mergeStates from './helpers/mergeStates';
import validateFieldset from './helpers/validateFieldset';

export default function useFieldsetState<S: {}>(
  rawState: S,
): [
  EnhancedState<S>,
  (ShapedEnhancedState<S>) => void,
  () => boolean,
  boolean
] {
  const [state, setState] = useState(() => mergeStates<S>(rawState));
  const [isValidationFailed, setValidationFailed] = useState(false);
  return [
    state,
    (updatedFields) => {
      setValidationFailed(false);
      setState(mergeStates<S>(updatedFields, state));
    },
    () => {
      const [newState, isFailed] = validateFieldset<S>(state);
      setValidationFailed(isFailed);
      setState(newState);
      return !isFailed;
    },
    isValidationFailed,
  ];
}
