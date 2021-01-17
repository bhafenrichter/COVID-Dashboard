import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Col } from 'react-bootstrap';

import { HelpButton } from './../help-button/help-button';

interface InfoCardProps {
  helpText: string;
  wrapperClass: string;
  content?: string | number;
  description?: string;
}

interface InfoCardState {
  flipped: boolean;
}

export default function InfoCard(props: InfoCardProps) {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('');
  const [flipped, setFlipped] = useState(false);
  const { wrapperClass, content, description } = props;

  // sets the height of the back of the card to be the same
  useLayoutEffect(() => {
    if (left.current && right.current) {
      setHeight(left.current.offsetHeight + 'px');
    }
  }, [description]);

  return (
    <Col lg="3">
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <div ref={left} className={wrapperClass + ' info-card'}>
          <HelpButton
            text={'How is this calculated?'}
            direction="bottomright"
            onClick={() => setFlipped(!flipped)}
          />

          <div>
            <p className="info-box-description">{description}</p>
            <h3 className="info-box-content">{content}</h3>
          </div>
        </div>
        <div ref={right} className={wrapperClass + ' info-card'}>
          <HelpButton
            text={'How is this calculated?'}
            direction="bottomright"
            onClick={() => setFlipped(!flipped)}
          />

          <div ref={right} style={{ height: height }}>
            <p className="info-box-description">{description}</p>
          </div>
        </div>
      </ReactCardFlip>
    </Col>
  );
}
