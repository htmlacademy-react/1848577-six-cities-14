import {Offer} from '../../types/types';
import {CITIES} from '../../consts';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesListProps = {
  offers: Offer[];
}

function FavoritesList({offers}: FavoritesListProps): JSX.Element | null {
  const favoritesCards: Offer[][] = [];
  CITIES?.forEach((item) => {
    const filterCards = offers.filter((el) => el.city.name === item && el.isFavorite);
    if(filterCards.length !== 0) {
      favoritesCards.push(filterCards);
    }
  });

  return offers.length ? (
    <ul className="favorites__list">
      {favoritesCards.map((item) => (
        <li key={item[0].id} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{item[0].city.name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {item.map((el: Offer) => (
              <FavoriteCard key={el.id} offer={el} />
            ))}
          </div>
        </li>
      ))}
    </ul>) : null;
}

export default FavoritesList;