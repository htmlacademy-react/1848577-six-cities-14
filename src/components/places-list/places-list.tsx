import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/types';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList({offers}: PlacesListProps): JSX.Element | null {
  return offers.length ? (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item: Offer) => (
        <PlaceCard key={item.id} offer={item} />
      ))}
    </div>
  ) : null;
}

export default PlacesList;
