import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Col } from 'react-bootstrap';
interface InfoCardProps {
  helpText: string;
  wrapperClass: string;
  content?: string;
  description?: string;
}

interface InfoCardState {
  flipped: boolean;
}

export default function InfoCard(props: InfoCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { wrapperClass, content, description } = props;
  return (
    <Col lg="3">
      <div
        className={wrapperClass + ' info-card'}
        onClick={() => setFlipped(!flipped)}>
        <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
          <div>
            <p className="info-box-description">{description}</p>
            <h3 className="info-box-content">{content}</h3>
          </div>

          <div>This is the back of the card.</div>
        </ReactCardFlip>
      </div>
    </Col>
  );
}
