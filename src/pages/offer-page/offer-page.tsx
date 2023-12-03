import {Navigate, useParams} from 'react-router-dom';
import {Offer, State} from '../../types/types';
import ButtonBookmark from '../../components/ui/button-bookmark/button-bookmark';
import {upperCaseFirst} from '../../utils/utils';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import MainHeader from '../../components/main-header/main-header';
import {useAppSelector} from '../../hooks';

function OfferPage() {
  const activeCity = useAppSelector((state: State): string => state.activeCity);
  const offers: Offer[] = useAppSelector((state) => state.offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const offerId = useParams().id;
  const offerById = offers.find((item) => item.id === offerId);

  if (offerById) {
    const {title, images, isPremium, type, bedrooms, maxAdults, price, goods, host, description} = offerById;

    return (
      <div className="page">
        <MainHeader />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.slice(0, 6).map((src: string): JSX.Element => (
                  <div key={src} className="offer__image-wrapper">
                    <img className="offer__image" src={src} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {title}
                  </h1>
                  <ButtonBookmark offer={offerById} isBig />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: '80%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">4.8</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {upperCaseFirst(type)}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((good: string): JSX.Element => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {host.name}
                    </span>
                    <span className="offer__user-status">
                      {host.isPro && 'Pro'}
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {description}
                    </p>
                  </div>
                </div>
                <ReviewsList />
              </div>
            </div>
            <Map page='offer' city={filteredOffers[0].city} offers={offers} location={filteredOffers[0].city.location} />
          </section>
          <div className="container">
            <NearPlaces offers={offers} />
          </div>
        </main>
      </div>
    );
  }
  return <Navigate to="*" />;
}

export default OfferPage;
