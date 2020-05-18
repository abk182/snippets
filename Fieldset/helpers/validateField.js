// @flow
import { type EnhancedField, type EnhancedState } from '../index';
import validators from './validators';

export default function validateField<S: {}>(
  state: EnhancedState<S>,
  field: $Keys<EnhancedState<S>>,
): EnhancedField<S> {
  let error = '';
  let isInvalid = false;

  Object.keys(validators).forEach((rule) => {
    if (state[field][rule] === true) {
      error = `${error}${validators[rule](state[field].value)}`;
      isInvalid = isInvalid || error !== '';
    }
  });

  if (state[field].regexp != null) {
    const regexp = new RegExp(state[field].regexp);
    error = regexp.test(state[field].value)
      ? error
      : `${error}Неверный формат данных. `;
    isInvalid = isInvalid || error !== '';
  }

  if (typeof state[field].validate === 'function') {
    error = state[field].validate(state, error);
    isInvalid = isInvalid || error !== '';
  }

  return {
    ...state[field],
    isInvalid,
    error,
  };
}
