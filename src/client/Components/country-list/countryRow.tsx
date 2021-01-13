import React from 'react';

export interface CountryRowProps {
  country: string;
  stat: string;
}

export const CountryRow = function (props: CountryRowProps) {
  const { country, stat } = props;
  return (
    <div className="country-row">
      <div className="country-flag">
        <img src="https://restcountries.eu/data/usa.svg" />
      </div>
      <p className="text">{country}</p>
      <p className="text">{stat}</p>
    </div>
  );
};
