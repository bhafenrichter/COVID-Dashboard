import React, { useEffect, useState } from 'react';
import { ee, EVTS } from '../../scripts/eventEmitter';
import { Modal } from '../modal/modal';

export interface LoadingIndicatorProps {}

export const LoadingIndicator = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    ee.subscribe(EVTS.SHOW_LOADING, () => {
      setVisible(true);
    });

    ee.subscribe(EVTS.HIDE_LOADING, () => {
      setVisible(false);
    });
  }, []);

  return (
    <Modal
      visible={visible}
      onClose={() => {}}
      width={100}
      height={100}
      hideCloseButton={true}>
      <div className="loading-indicator">
        <img
          src="http://localhost:3001/static/gif/loading.gif"
          className="loading-img"
        />
        <p>Loading...</p>
      </div>
    </Modal>
  );
};
