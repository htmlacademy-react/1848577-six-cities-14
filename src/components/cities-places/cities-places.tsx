import PlaceCard from '../place-card/place-card';
import Map from '../map/map';
import {Offer, State} from '../../types/types';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {sortByOption} from '../../utils/utils';
import Sorting from '../sorting/sorting';
import MainNoPlaces from '../main-no-places/main-no-places';

function CitiesPlaces(): JSX.Element | null {

  const activeCity = useAppSelector((state: State): string => state.activeCity);
  const offers: Offer[] = useAppSelector((state: State) => state.offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);
  const handleCardHover = (offerId: Offer['id'] | null) => setActiveOfferId(offerId);
  const activeSortType = useAppSelector((state: State): string => state.activeSortingType);
  const currentOffers = sortByOption(filteredOffers, activeSortType);

  if (!filteredOffers.length) {
    return <MainNoPlaces city={activeCity} />;
  }

  return (
    <div className='cities'>
      <div className='cities__places-container container'>
        <section className='cities__places places'>
          <h2 className='visually-hidden'>Places</h2>
          <b className='places__found'>{currentOffers.length} places to stay in {activeCity}</b>
          {/* <form className='places__sorting' action="#" method="get">
            <span className='places__sorting-caption'>Sort by</span>
            <span className='places__sorting-type' tabIndex={0}>
              Popular
              <svg className='places__sorting-arrow' width={7} height={4}>
                <use xlinkHref='#icon-arrow-select'></use>
              </svg>
            </span>
            <ul className='places__options places__options--custom places__options--opened'>
              <li className='places__option places__option--active' tabIndex={0}>Popular</li>
              <li className='places__option' tabIndex={0}>Price: low to high</li>
              <li className='places__option' tabIndex={0}>Price: high to low</li>
              <li className='places__option' tabIndex={0}>Top rated first</li>
            </ul>
          </form> */}
          <Sorting />
          <div className='cities__places-list places__list tabs__content'>
            {currentOffers.map((item: Offer) => (
              <PlaceCard key={item.id} offer={item} size='big' page='cities' onCardHover={handleCardHover} />
            ))}
          </div>
        </section>
        <div className='cities__right-section'>
          <Map page='cities' offers={currentOffers} location={currentOffers[0].city.location} activeOfferId={activeOfferId} />
        </div>
      </div>
    </div>
  );
}

export default CitiesPlaces;
