// @flow
import React from 'react';

export type Props<T> = {
  value: T,
  onChange: ({ value: $PropertyType<Props<T>, "value"> }) => void | boolean,
  children: React$Node
};

const Component = <T>({ value, onChange, children }: Props<T>) => (
  <>
    {React.Children.map(children, child => React.cloneElement(child, {
      isChecked: value === child.props.value,
      onClick: onChange,
    }))}
  </>
);

Component.defaultProps = {};

export default Component;
