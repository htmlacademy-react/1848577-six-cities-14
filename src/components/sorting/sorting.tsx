import {useState} from 'react';
import {SortOption} from '../../consts';
import {SortingType, State} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setSortingType} from '../../store/action';

function Sorting(): JSX.Element {
  const values: typeof SortOption[SortingType][] = Object.values(SortOption);

  const [isOpened, setIsOpened] = useState(false);
  const activeSortingType = useAppSelector((state: State): typeof SortOption[SortingType] => state.activeSortingType);
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
    dispatch(setSortingType({activeSortingType: clickedOption}));
  }

  function isOpenedClass() {
    if (isOpened) {
      return 'places__options--opened';
    } else {
      return '';
    }
  }

  function isActiveClass(value: SortOption) {
    if (value === activeSortingType) {
      return 'places__option--active';
    } else {
      return '';
    }
  }

  return (
    <form className='places__sorting' action="#" method="get" onKeyDown={handleKeydown}>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0} onClick={handleTypeClick}>
        {activeSortingType}
        <svg className='places__sorting-arrow' width={7} height={4}>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpenedClass()}`}>
        {values.map((value) => (
          <li
            key={value}
            className={`places__option ${isActiveClass(value)}`}
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
