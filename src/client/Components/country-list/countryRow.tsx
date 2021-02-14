import React from 'react';
import { Place } from '../../../server/models/ICOVIDDataProvider';
import { ee, EVTS } from './../../scripts/eventEmitter';
import { FlagIcon } from './flagIcon';
import { FaStar, FaRegStar } from 'react-icons/fa';

export interface CountryRowProps {
  country: Place;
  stat?: string | number;
  logo?: string;
  placeType?: string;
  showFavorite?: boolean;
}

export const CountryRow = function (props: CountryRowProps) {
  const { country, stat, placeType } = props;
  return (
    <div className="country-row">
      <div
        className="country"
        onClick={() => {
          ee.dispatch(EVTS.CHANGE_PLACE, country);
          ee.dispatch(EVTS.CLOSE_MODAL, null);
        }}>
        <div className="country-flag">
          <FlagIcon name={country.logo} placeType={placeType || ''}></FlagIcon>
        </div>
        <p className="text">{country.name}</p>
        <p className="text">{stat}</p>
      </div>
      {true ? (
        <div>
          {country.isFavorite ? (
            <FaStar
              className="favorite-selected"
              onClick={() => ee.dispatch(EVTS.REMOVE_FAVORITE, country)}
            />
          ) : (
            <FaRegStar
              className="favorite"
              onClick={() => ee.dispatch(EVTS.ADD_FAVORITE, country)}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};
