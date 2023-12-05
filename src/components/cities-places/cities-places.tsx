import PlaceCard from '../place-card/place-card';
import Map from '../map/map';
import {OfferPreview} from '../../types/types';
import {useMemo, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {sortByOption} from '../../utils/utils';
import Sorting from '../sorting/sorting';
import MainNoPlaces from '../main-no-places/main-no-places';
import {getFilteredOffers} from '../../store/offers-data/selectors';
import {getActiveCity, getActiveSortedType} from '../../store/app-process/selectors';

type CitiesProps = {
  onCityChange: (isLength: boolean) => void;
};

function CitiesPlaces({onCityChange}: CitiesProps): JSX.Element | null {

  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getFilteredOffers);
  const [activeOffer, setActiveOffer] = useState<OfferPreview | undefined>();
  const handleCardHover = (selectedCardId:OfferPreview['id'] | null) => {
    const currentPoint: OfferPreview | undefined = offers.find((offer) =>
      offer.id === selectedCardId,
    );
    setActiveOffer(currentPoint);
  };
  const activeSortType = useAppSelector(getActiveSortedType);
  const currentOffers = useMemo(
    () => sortByOption(offers, activeSortType),
    [activeSortType, offers]
  );

  if (currentOffers.length === 0) {
    onCityChange(true);
    return <MainNoPlaces city={activeCity} />;
  }

  return (
    <div className='cities'>
      <div className='cities__places-container container'>
        <section className='cities__places places'>
          <h2 className='visually-hidden'>Places</h2>
          <b className='places__found'>{currentOffers.length} places to stay in {activeCity}</b>
          <Sorting />
          <div className='cities__places-list places__list tabs__content'>
            {currentOffers.map((item: OfferPreview) => (
              <PlaceCard key={item.id} offer={item} size='big' page='cities' onCardHover={handleCardHover} />
            ))}
          </div>
        </section>
        <div className='cities__right-section'>
          <Map page='cities' city={currentOffers[0].city} offers={currentOffers} location={currentOffers[0].city.location} activeOfferId={activeOffer?.id} />
        </div>
      </div>
    </div>
  );
}

export default CitiesPlaces;
