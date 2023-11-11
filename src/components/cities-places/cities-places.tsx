import PlaceCard from '../place-card/place-card';
import Map from '../map/map';
import {Offer} from '../../types/types';
import {useState} from 'react';

type CitiesPlacesProps = {
  offers: Offer[];
}

function CitiesPlaces({offers}: CitiesPlacesProps): JSX.Element | null {

  const activeCity = offers[1].city;
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);
  const handleCardHover = (offerId: Offer['id'] | null) => setActiveOfferId(offerId);

  if (!offers.length) {
    return null;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">312 places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((item: Offer) => (
              <PlaceCard key={item.id} offer={item} size='big' page='cities' onCardHover={handleCardHover} />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map page="cities" offers={offers} location={activeCity.location} activeOfferId={activeOfferId} />
        </div>
      </div>
    </div>
  );
}

export default CitiesPlaces;
