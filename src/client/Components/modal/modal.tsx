import React, { useState } from 'react';
import Rodal from 'rodal';

interface ModalProps {
  content?: any;
}

export function Modal(props: ModalProps) {
  const [visible, setVisible] = useState(true);
  const { content } = props;

  return (
    <Rodal visible={visible} onClose={() => setVisible(false)}>
      <div>{content}</div>
    </Rodal>
  );
}
