// @flow
import React from 'react';
import { Radiobutton } from '@lora/components';

export type Props = {
  value?: string | number | null | typeof undefined,
  isChecked?: boolean,
  children?: React$Node,
  onClick?: ({ value: $PropertyType<Props, "value"> }) => void,
  style?: { [key: string]: string },
  className?: string
};

const Component = ({
  value = Component.defaultProps.value,
  isChecked = Component.defaultProps.isChecked,
  children = Component.defaultProps.children,
  onClick = Component.defaultProps.onClick,
  ...props
}: Props) => (
  <Radiobutton
    checked={isChecked}
    value={children}
    onClick={() => onClick({ value })}
    point
    {...props}
  />
);

Component.defaultProps = {
  value: undefined,
  isChecked: false,
  onClick: () => {},
  children: undefined,
  style: undefined,
  className: undefined,
};

export default Component;
