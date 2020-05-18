// @flow
import moment from 'moment';

export type Validator =
  | "isRequired"
  | "isNumber"
  | "isInteger"
  | "isTimestamp"
  | "isDate"
  | "isDateWithTime"
  | "isHex"
  | "isHex8"
  | "isHex16"
  | "isHex32";

const validators: { [key: Validator]: (value: string) => string } = {
  isRequired: value => (value != null && `${value}`.trim() !== ''
    ? ''
    : 'Поле не должно быть пустым.'),

  isNumber: value => (Number.isNaN(Number(value)) ? 'Должно быть числом.' : ''),

  isInteger: value => (Number.isInteger(Number(value)) ? '' : 'Должно быть целым числом'),

  isTimestamp: value => (value != null && !moment(value, ['x'], true).isValid()
    ? 'Неверная дата.'
    : ''),

  isDate: value => (value != null
    && value !== ''
    && !moment(value, ['D.M.YYYY', 'D/M/YYYY', 'D-M-YYYY'], true).isValid()
    ? 'Неверная дата.'
    : ''),

  isDateWithTime: value => (value != null
    && value !== ''
    && !moment(
      value,
      ['D.M.YYYY H:mm', 'D/M/YYYY H:mm', 'D-M-YYYY H:mm'],
      true,
    ).isValid()
    ? ''
    : 'Неверная дата.'),

  isHex: value => (value != null && value !== '' && !value.match(/^[0-9a-fA-F]+$/gm)
    ? 'Неверный формат (HEX)'
    : ''),

  isHex8: value => (value != null && value !== '' && !value.match(/^[0-9a-fA-F]{8}$/g)
    ? 'Неверный формат (HEX 8)'
    : ''),

  isHex16: value => (value != null && value !== '' && !value.match(/^[0-9a-fA-F]{16}$/g)
    ? 'Неверный формат (HEX 16)'
    : ''),

  isHex32: value => (value != null && value !== '' && !value.match(/^[0-9a-fA-F]{32}$/g)
    ? 'Неверный формат (HEX 32)'
    : ''),
};

export default validators;
