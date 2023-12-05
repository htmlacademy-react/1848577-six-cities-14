import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Offer, OfferPreview} from '../../types/types';
import ButtonBookmark from '../../components/ui/button-bookmark/button-bookmark';
import {getRatingWidth, upperCaseFirst} from '../../utils/utils';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import MainHeader from '../../components/main-header/main-header';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import {fetchReviewsAction, fetchNearPlacesAction, fetchOfferAction, fetchFavoritesAction} from '../../store/api-action';
import Loading from '../loading/loading';
import {MAX_OFFER_PAGE_IMAGES_COUNT, Status} from '../../consts';
import {getNearPlaces, getOffer, getOfferStatus} from '../../store/offer-data/selectors';
import {dropOffer} from '../../store/offer-data/offer-data';
import {getAuthCheckedStatus} from '../../store/user-process/selectors';

function OfferPage(): JSX.Element {
  const offerId = useParams().id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearPlacesAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchFavoritesAction());
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [offerId, dispatch]);

  const currentOffer = useAppSelector(getOffer);
  const nearPlaces = useAppSelector(getNearPlaces);
  const loadingStatus = useAppSelector(getOfferStatus);
  const isAuth = useAppSelector(getAuthCheckedStatus);

  const minimizeCurrentOffer = (offer: Offer): OfferPreview => ({
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city.name,
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom
      },
    },
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom
    },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    previewImage: offer.images[0]
  });

  return (
    <div className="page">
      {(loadingStatus === Status.Loading || currentOffer === null) && (
        <Loading />
      )}
      {(loadingStatus === Status.Success && currentOffer !== null) && (
        <>
          <MainHeader />
          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {currentOffer.images.slice(0, MAX_OFFER_PAGE_IMAGES_COUNT).map((src: string): JSX.Element => (
                    <div key={src} className="offer__image-wrapper">
                      <img className="offer__image" src={src} alt="Photo studio" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  {currentOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">
                      {currentOffer.title}
                    </h1>
                    <ButtonBookmark offerId={currentOffer.id} isFavorite={currentOffer.isFavorite} isBig />
                  </div>
                  <div className="offer__rating rating">
                    <div className="offer__stars rating__stars">
                      <span style={{width: `${getRatingWidth(currentOffer.rating)}`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="offer__rating-value rating__value">
                      {currentOffer.rating}
                    </span>
                  </div>
                  <ul className="offer__features">
                    <li className="offer__feature offer__feature--entire">
                      {upperCaseFirst(currentOffer.type)}
                    </li>
                    <li className="offer__feature offer__feature--bedrooms">
                      {currentOffer.bedrooms} Bedrooms
                    </li>
                    <li className="offer__feature offer__feature--adults">
                      Max {currentOffer.maxAdults} adults
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">&euro;{currentOffer.price}</b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">What&apos;s inside</h2>
                    <ul className="offer__inside-list">
                      {currentOffer.goods.map((good: string): JSX.Element => (
                        <li key={good} className="offer__inside-item">
                          {good}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="offer__host">
                    <h2 className="offer__host-title">Meet the host</h2>
                    <div className="offer__host-user user">
                      <div className={`offer__avatar-wrapper ${currentOffer.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                        <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                      </div>
                      <span className="offer__user-name">
                        {currentOffer.host.name}
                      </span>
                      <span className="offer__user-status">
                        {currentOffer.host.isPro && 'Pro'}
                      </span>
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">
                        {currentOffer.description}
                      </p>
                    </div>
                  </div>
                  <ReviewsList>
                    {isAuth && <ReviewForm offerId={currentOffer.id}/>}
                  </ReviewsList>
                </div>
              </div>
              <Map page='offer' city={currentOffer.city} offers={[...nearPlaces, minimizeCurrentOffer(currentOffer)]} location={currentOffer.city.location} />
            </section>
            <div className="container">
              <NearPlaces offers={nearPlaces} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default OfferPage;
