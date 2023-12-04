import PlaceCard from '../place-card/place-card';
import Map from '../map/map';
import {OfferPreview, State} from '../../types/types';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {sortByOption} from '../../utils/utils';
import Sorting from '../sorting/sorting';
import MainNoPlaces from '../main-no-places/main-no-places';

function CitiesPlaces(): JSX.Element | null {

  const activeCity = useAppSelector((state: State): string => state.activeCity);
  const offers: OfferPreview[] = useAppSelector((state: State) => state.offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  // const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);
  const [activeOffer, setActiveOffer] = useState<OfferPreview | undefined>();
  // const handleCardHover = (offerId: Offer['id'] | null) => setActiveOfferId(offerId);
  const handleCardHover = (selectedCardId:OfferPreview['id'] | null) => {
    const currentPoint: OfferPreview | undefined = filteredOffers.find((offer) =>
      offer.id === selectedCardId,
    );
    setActiveOffer(currentPoint);
  };
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
