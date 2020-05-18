// @flow
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './style.css';

// TODO: initialization of the DOM node might be moved into <Tooltip />
const TooltipDOM: HTMLElement = document.createElement('div');
TooltipDOM.setAttribute('id', 'tooltip');
if (document.body) {
  document.body.appendChild(TooltipDOM);
}

type Props = {|
  isVisible: boolean,
  isHovered: boolean,
  toolRef: { current: HTMLDivElement | null },
  children?: React$Node,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
  style?: { [key: string]: string },
  className?: string
|};

const Tip = ({
  isVisible,
  isHovered,
  toolRef,
  children,
  onMouseEnter,
  onMouseLeave,
  style,
  className,
}: Props) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tipRef = useRef(null);

  useEffect(
    () => {
      if (toolRef.current != null && tipRef.current != null) {
        const toolRect = toolRef.current.getBoundingClientRect();
        const tipRect = tipRef.current != null
          ? tipRef.current.getBoundingClientRect()
          : toolRect;

        const top = toolRect.bottom + tipRect.height > window.innerHeight
          ? toolRect.top - tipRect.height
          : toolRect.bottom;

        const left = toolRect.left + tipRect.width > window.innerWidth
          ? toolRect.right - tipRect.width
          : toolRect.left;

        if (top > window.innerHeight) onMouseLeave();

        setCoords({ top, left });
      }
    },
    [isVisible, isHovered],
  );

  return (
    isVisible
    && createPortal(
      <div
        ref={tipRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        styleName="tooltip"
        className={className}
        style={{
          position: 'absolute',
          zIndex: 1000,
          padding: 8,
          ...coords,
          ...style,
        }}
      >
        {children}
      </div>,
      TooltipDOM,
    )
  );
};

export default Tip;
