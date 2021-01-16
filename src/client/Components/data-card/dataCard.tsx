import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { HelpButton } from '../help-button/help-button';

export interface DataCardProps {
  title?: string;
  description?: string;
  helpText?: string;
  children?: any;
  min?: boolean;
}

export const DataCard = (props: DataCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const { children, title, description, helpText, min } = props;

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

              {min ? <h4 className="card-title">{title}</h4> : <h3 className="card-title">{title}</h3> }
              
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
