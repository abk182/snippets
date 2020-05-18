// @flow
export type EnhanceField = <F>(
  F
) => {
  error: string,
  isInvalid: boolean,
  regexp?: RegExp,
  isDisabled?: boolean,
  isRequired?: boolean,
  isNumber?: boolean,
  isInteger?: boolean,
  isTimestamp?: boolean,
  isDate?: boolean,
  isDateWithTime?: boolean,
  isHex?: boolean,
  isHex8?: boolean,
  isHex16?: boolean,
  isHex32?: boolean,
  validate?: <T>(T, string) => string
} & F;

export type EnhancedField<S> = $Call<EnhanceField, S>;

export type EnhanceState = <S>(S) => $ObjMap<S, EnhanceField>;

export type EnhancedState<S> = $Call<EnhanceState, S>;

export type ShapeEnhancedState = <S>(
  S
) => $Shape<$ObjMap<EnhancedState<S>, <T>(T) => $Shape<T>>>;

export type ShapedEnhancedState<S> = $Shape<$ObjMap<EnhancedState<S>, <T>(T) => $Shape<T>>>;

export type UseFieldsetState = <S>(
  S
) => [
  EnhancedState<S>,
  (ShapedEnhancedState<S>) => void,
  () => boolean,
  boolean
];

export type UseArrayOfFieldsets = <S>(
  Array<S>
) => [
  Array<EnhancedState<S>>,
  (Array<ShapedEnhancedState<S>>) => void,
  (number, ShapedEnhancedState<S>) => void,
  () => boolean,
  boolean
];

export { default as useFieldsetState } from './useFieldsetState';

export {
  default as useArrayOfFieldsetsState,
} from './useArrayOfFieldsetsState';

export { default as validators } from './helpers/validators';
