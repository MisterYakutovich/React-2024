import styles from './Checkbox.module.css';
import { PeopleArray } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setSelectedCharacters } from '../../redux/slices/itemsDetailsSlice';

interface CheckboxProps {
  element: PeopleArray;
}
function Checkbox({ element }: CheckboxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemsDetails.selectedCharacters
  );
  console.log(selectedCharacters);
  const isChecked = selectedCharacters.some(
    (character) => character.name === element.name
  );
  console.log(isChecked);
  const handleChange = () => {
    if (isChecked) {
      dispatch(
        setSelectedCharacters(
          selectedCharacters.filter(
            (character) => character.name !== element.name
          )
        )
      );
    } else {
      dispatch(setSelectedCharacters([...selectedCharacters, element]));
    }
  };
  return (
    <div>
      <input
        data-testid="checkbox"
        className={styles.input_checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
}
export default Checkbox;
