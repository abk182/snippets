// @flow
import { type EnhancedState } from '../index';
import validateField from './validateField';

export default function validateFieldset<S: {}>(
  state: EnhancedState<S>,
): [EnhancedState<S>, boolean] {
  let isValidationFailed = false;

  const newState = Object.keys(state).reduce((acc, cur) => {
    const validatedField = validateField(state, cur);

    isValidationFailed = isValidationFailed || validatedField.isInvalid;

    return {
      ...acc,
      [cur]: validatedField,
    };
  }, {});

  return [newState, isValidationFailed];
}
