import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/types';
import {useMemo} from 'react';
import {MAX_NEAR_PLACES_COUNT} from '../../consts';

type NearPlacesProps = {
  offers: Offer[];
}

function NearPlaces({offers}: NearPlacesProps): JSX.Element {
  const currentOffers = useMemo(() => offers.slice(0, MAX_NEAR_PLACES_COUNT), [offers]);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {currentOffers.map((item: Offer) => (
          <PlaceCard key={item.id} offer={item} size='big' page='near-places' />
        ))}
      </div>
    </section>
  );
}

export default NearPlaces;
