import {OfferPreview} from '../../types/types';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getFavoritesOffers} from '../../store/offers-data/selectors';
import PlaceCard from '../place-card/place-card';

function getFavoritesByCity(favorites: OfferPreview[]){
  return favorites.reduce<{[key: string]: OfferPreview[]}>((acc, curr) => {
    const city = curr.city.name;

    if(!(city in acc)) {
      acc[city] = [];
    }

    acc[city].push(curr);
    return acc;
  }, {});
}

function FavoritesList() {
  const favorites = useAppSelector(getFavoritesOffers);

  const favoritesByCity = getFavoritesByCity(favorites);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(favoritesByCity).map(([city, groupedFavorites]) => (
              <li key={city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {groupedFavorites.map((item) =>
                    <PlaceCard key={item.id} offer={item} size='small' page='favorites' />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesList;

//
// import PlaceCard from '../place-card/place-card';
//     <ul className="favorites__list">
//       {favoritesCards.map((item) => (
//         <li key={item[0].id} className="favorites__locations-items">
//           <div className="favorites__locations locations locations--current">
//             <div className="locations__item">
//               <a className="locations__item-link" href="#">
//                 <span>{item[0].city.name}</span>
//               </a>
//             </div>
//           </div>
//           <div className="favorites__places">
//             {item.map((el: OfferPreview) => (
//               <PlaceCard key={el.id} offer={el} size='small' page='favorites' />
//             ))}
//           </div>
//         </li>
//       ))}
//     </ul>)
