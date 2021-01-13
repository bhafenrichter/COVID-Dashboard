import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { HelpButton } from '../help-button/help-button';

export interface DataCardProps {
  title?: string;
  description?: string;
  helpText?: string;
  children?: any;
}

export const DataCard = (props: DataCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const { children, title, description, helpText } = props;

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <div className="card">
        <div className="card-body">
          <HelpButton
            text={'How is this calculated?'}
            direction="topright"
            onClick={() => setFlipped(!flipped)}
          />
          {title !== null ? (
            <div>
              <h3 className="card-title">{title}</h3>
              <p className="card-description">{description}</p>
            </div>
          ) : null}
          {children}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <HelpButton
            text={'How is this calculated?'}
            direction="topright"
            onClick={() => setFlipped(!flipped)}
          />
          {helpText}
        </div>
      </div>
    </ReactCardFlip>
  );
};
