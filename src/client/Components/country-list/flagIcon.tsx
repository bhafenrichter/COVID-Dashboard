import React, { useEffect, useState } from 'react';

interface IconProps {
  name: string;
  placeType: string;
}

// @ts-ignore
let reqCountrySvgs = require.context(
  '../../static/svg/countries',
  true,
  /\.svg$/
);
let countryPaths: Array<string> = reqCountrySvgs.keys();
const countrySvgs = countryPaths.map((x) => {
  return {
    key: x,
    body: reqCountrySvgs(x),
  };
});

// @ts-ignore
let reqStateSvgs = require.context('../../static/svg/states', true, /\.svg$/);
let statePaths: Array<string> = reqStateSvgs.keys();
const stateSvgs = statePaths.map((x: any) => {
  return {
    key: x,
    body: reqStateSvgs(x),
  };
});

export const FlagIcon = (props: IconProps) => {
  const { name, placeType } = props;
  let paths: Array<string> = [];
  let svg = {};

  paths = countryPaths.filter(
    (x) => x.includes(name) || x.includes(name.toLowerCase())
  );

  if (paths.length > 0 && placeType !== 'state') {
    svg = countrySvgs.filter((x) => x.key === paths[0])[0];
  } else {
    paths = statePaths.filter(
      (x) => x.includes(name) || x.includes(name.toLowerCase())
    );
    svg = stateSvgs.filter((x) => x.key === paths[0])[0];
  }

  // @ts-ignore
  return (
    <img
      alt={name}
      // @ts-ignore
      src={svg?.body}
      className="flag-icon"
      width="50"
      height="50"
    />
  );
};
