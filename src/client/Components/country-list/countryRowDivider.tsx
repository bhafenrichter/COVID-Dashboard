import React from 'react';

export interface CountryRowDividerProps {
  title?: string;
}

export const CountryRowDivider = (props: CountryRowDividerProps) => {
  const { title } = props;
  return (
    <div className="divider">
      <hr />
      <p className="divider-text">{title}</p>
      <hr />
    </div>
  );
};
