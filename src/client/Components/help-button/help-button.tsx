import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

interface HelpButtonProps {
  text: string;
  direction?: string;
  onClick: () => void;
}

export function HelpButton(props: HelpButtonProps) {
  const { text, direction, onClick } = props;

  return (
    <div className="help-icon" onClick={onClick}>
      <OverlayTrigger
        key={'0'}
        overlay={<Tooltip id={`tooltip-${'0'}`}>{text}</Tooltip>}>
        <FaInfoCircle />
      </OverlayTrigger>
    </div>
  );
}
