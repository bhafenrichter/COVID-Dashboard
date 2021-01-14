import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import { createPortal } from 'react-dom';

interface ModalProps {
  visible: boolean;
  content?: any;
  onClose: () => void;
}

const modalElement = document.getElementById('modal-root') as Element;

export function Modal(props: ModalProps) {
  const { content, onClose, visible } = props;
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  return createPortal(
    <Rodal visible={visibility} onClose={onClose}>
      <div>{content}</div>
    </Rodal>,
    modalElement
  );
}
