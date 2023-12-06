import {useState} from 'react';
import {SortOption} from '../../consts';
import {SortingType} from '../../types/types';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import {setSortedType} from '../../store/app-process/app-process';
import {getActiveSortedType} from '../../store/app-process/selectors';

function Sorting(): JSX.Element {
  const values: typeof SortOption[SortingType][] = Object.values(SortOption);

  const [isOpened, setIsOpened] = useState(false);
  const activeSortedType = useAppSelector(getActiveSortedType);
  const dispatch = useAppDispatch();

  function handleTypeClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleKeydown(evt: React.KeyboardEvent<HTMLFormElement>) {
    if (evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setIsOpened(false);
    }
  }

  function handleOnClickOption(clickedOption: typeof SortOption[SortingType]) {
    dispatch(setSortedType(clickedOption));
  }

  function getOpenedClass() {
    if (isOpened) {
      return 'places__options--opened';
    } else {
      return '';
    }
  }

  function getActiveClass(value: SortOption) {
    if (value === activeSortedType) {
      return 'places__option--active';
    } else {
      return '';
    }
  }

  return (
    <form className='places__sorting' action="#" method="get" onKeyDown={handleKeydown}>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0} onClick={handleTypeClick}>
        {activeSortedType}
        <svg className='places__sorting-arrow' width={7} height={4}>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${getOpenedClass()}`}>
        {values.map((value) => (
          <li
            key={value}
            className={`places__option ${getActiveClass(value)}`}
            tabIndex={0}
            onClick={() => {
              handleOnClickOption(value);
              handleTypeClick();
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
