// @flow
import React, { useState, useEffect, useRef } from 'react';

import Tip from './Tip';

import './style.css';

type Props = {
  children?: React$Node,
  tip?: React$Node,
  style?: { [key: string]: string },
  className?: string,
  tipStyle?: { [key: string]: string },
  tipClassName?: string
};

const Tooltip = ({
  children,
  tip,
  style,
  className,
  tipStyle,
  tipClassName,
}: Props) => {
  const [isVisible, setVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const toolRef = useRef(null);

  useEffect(
    () => {
      const timer = isVisible && !isHovered
        ? setTimeout(() => setVisible(false), 750)
        : null;
      return () => {
        clearTimeout(timer);
      };
    },
    [isHovered],
  );

  return (
    <div
      ref={toolRef}
      style={{ position: 'relative', ...style }}
      className={className}
      onMouseEnter={() => {
        setHovered(true);
        setVisible(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <Tip
        isVisible={isVisible}
        isHovered={isHovered}
        toolRef={toolRef}
        onMouseEnter={() => {
          setHovered(true);
          setVisible(true);
        }}
        onMouseLeave={() => setHovered(false)}
        style={tipStyle}
        className={tipClassName}
      >
        {tip || children}
      </Tip>
    </div>
  );
};

Tooltip.defaultProps = {
  tip: undefined,
  children: undefined,
  style: {},
  className: '',
  tipStyle: {},
  tipClassName: '',
};

export default Tooltip;
