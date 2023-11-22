import {CITIES} from '../../consts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action';
import {State} from '../../types/types';

function LocationsList(): JSX.Element {
  const cities: string[] = Object.values(CITIES);
  const activeCity = useAppSelector((state: State):string => state.activeCity);
  const dispatch = useAppDispatch();

  function isActiveCityClass (city: string): string {
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
                dispatch(changeCity({activeCity: item}));
              }}
            >
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationsList;
