import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { HelpButton } from '../help-button/help-button';

export interface DataCardProps {
  title?: string;
  description?: string;
  helpText?: string;
  children?: any;
  min?: boolean;
  customClass?: string;
}

export const DataCard = (props: DataCardProps) => {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('');
  const [flipped, setFlipped] = useState(false);
  const { children, title, description, helpText, min, customClass } = props;

  // sets the height of the back of the card to be the same
  useLayoutEffect(() => {
    if (left.current && right.current) {
      setHeight(left.current.offsetHeight + 'px');
    }
  }, [children]);

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <div ref={left} className={`card ${customClass}`}>
        <div className="card-body">
          {helpText ? (
            <HelpButton
              text={'How is this calculated?'}
              direction="topright"
              onClick={() => setFlipped(!flipped)}
            />
          ) : null}

          {title !== null ? (
            <div>
              {min ? (
                <h4 className="card-title">{title}</h4>
              ) : (
                <h3 className="card-title">{title}</h3>
              )}

              <p className="card-description">{description}</p>
            </div>
          ) : null}
          {children}
        </div>
      </div>
      <div
        ref={right}
        className={`card ${customClass}`}
        style={{ height: height }}>
        <div className="card-body info-box-description">
          <HelpButton
            text={'How is this calculated?'}
            direction="topright"
            onClick={() => setFlipped(!flipped)}
          />
          <p className="text centered">{helpText}</p>
        </div>
      </div>
    </ReactCardFlip>
  );
};
