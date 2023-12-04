import PlaceCard from '../place-card/place-card';
import {OfferPreview} from '../../types/types';

type NearPlacesProps = {
  offers: OfferPreview[];
}

function NearPlaces({offers}: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((item: OfferPreview) => (
          <PlaceCard key={item.id} offer={item} size='big' page='near-places' />
        ))}
      </div>
    </section>
  );
}

export default NearPlaces;
