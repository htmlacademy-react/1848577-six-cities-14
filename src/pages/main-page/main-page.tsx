import CitiesPlaces from '../../components/cities-places/cities-places';
import MainHeader from '../../components/main-header/main-header';
import LocationsList from '../../components/locations-list/locations-list';
import {Offer} from '../../types/types';

type MainPageProps = {
  offers: Offer[];
}

function MainPage({offers}: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <MainHeader />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        <CitiesPlaces offers={offers} />
      </main>
    </div>
  );
}

export default MainPage;
