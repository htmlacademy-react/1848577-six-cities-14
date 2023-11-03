import FavoritesList from '../../components/favorites-list/favorites-list';
import MainHeader from '../../components/main-header/main-header';
import {Offer} from '../../types/types';

type FavoritePageProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritePageProps): JSX.Element {
  return (
    <div className="page">
      <MainHeader />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={offers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
