import React, { useEffect, useState } from 'react';

interface IconProps {
  name: string;
}

// @ts-ignore
const reqSvgs = require.context('../../static/svg', true, /\.svg$/);
const paths: Array<string> = reqSvgs.keys();
const svgs = paths.map((path) => {
  return {
    key: path,
    body: reqSvgs(path),
  };
});

export const FlagIcon = (props: IconProps) => {
  const { name } = props;
  let path = paths.filter((x) => x.includes(name))[0];
  let svg = svgs.filter((x) => x.key === path)[0];
  // @ts-ignore
  return <img alt="" src={svg.body} />;
};
