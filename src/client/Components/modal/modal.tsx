import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import { createPortal } from 'react-dom';

interface ModalProps {
  visible: boolean;
  children: any;
  className?: string;
  onClose: () => void;
  width?: number;
  height?: number;
  hideCloseButton?: boolean;
}

const modalElement = document.getElementById('modal-root') as Element;

export function Modal(props: ModalProps) {
  const {
    children,
    onClose,
    visible,
    className,
    width,
    height,
    hideCloseButton,
  } = props;
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  return createPortal(
    <Rodal
      visible={visibility}
      onClose={onClose}
      className={className}
      width={width}
      height={height}
      showCloseButton={!hideCloseButton}>
      <div>{children}</div>
    </Rodal>,
    modalElement
  );
}
