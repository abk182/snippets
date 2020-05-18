// @flow
import React from 'react';

import { Radiobutton } from '@lora/components';

import './style.css';

export type Props = {
  group: Array<{| value: ?string, text: string |}>,
  value: ?string,
  onChange: ({ value: ?string, text: string }) => void,
  className?: string
};

const RadioButtonGroup = ({
  group,
  value,
  onChange,
  className,
  ...props
}: Props) => (
  <div styleName="container" className={className} {...props}>
    {group.map(el => (
      <Radiobutton
        key={el.text}
        checked={value === el.value}
        onClick={() => {
          onChange(el);
        }}
        value={el.text}
      />
    ))}
  </div>
);

RadioButtonGroup.defaultProps = {
  className: undefined,
};

export default RadioButtonGroup;
