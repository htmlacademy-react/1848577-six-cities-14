import {CityName} from '../../consts';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getActiveCity} from '../../store/app-process/selectors';
import {changeActiveCity} from '../../store/app-process/app-process';
import {memo} from 'react';

const LocationsList = memo((): JSX.Element => {
  const cities: CityName[] = Object.values(CityName);
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  function isActiveCityClass (city: CityName): string {
    let activeCityClass;
    if (city === activeCity) {
      activeCityClass = 'tabs__item--active';
    } else {
      activeCityClass = '';
    }

    return activeCityClass;
  }

  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {cities.map((item) => (
          <li key={item} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${isActiveCityClass(item)}`}
              href="#"
              onClick={(evt: React.MouseEvent<HTMLElement>) => {
                evt.preventDefault();
                dispatch(changeActiveCity(item));
              }}
            >
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});

LocationsList.displayName = 'LocationList';

export default LocationsList;
