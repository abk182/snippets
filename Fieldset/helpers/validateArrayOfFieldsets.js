// @flow
import { type EnhancedState } from '../index';
import validateFieldset from './validateFieldset';

export default function validateArrayOfFieldsets<S: {}>(
  state: Array<EnhancedState<S>>,
): [Array<EnhancedState<S>>, boolean] {
  let isValidationFailed = false;

  const newArrayState = state.map<EnhancedState<S>>((fieldset) => {
    const [newState, isFailed] = validateFieldset(fieldset);

    isValidationFailed = isValidationFailed || isFailed;

    return newState;
  });

  return [newArrayState, isValidationFailed];
}
