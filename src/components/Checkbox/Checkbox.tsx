import { useEffect, useState } from 'react';
import './Checkbox.css';
import { PeopleArray } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setSelectedCharacters } from '../../redux/slices/itemDetailsSlice';

interface CheckboxProps {
  i: PeopleArray;
  currentPage: number;
  selectedCharacters: string[];
  setSelectedCharacters: (characters: string[]) => void;
}
function Checkbox({ i }: CheckboxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemDetails.selectedCharacters
  );
  console.log(selectedCharacters);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    setIsChecked(selectedCharacters.includes(i.name));
  }, [selectedCharacters, i.name]);
  const handleChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      dispatch(
        setSelectedCharacters(
          selectedCharacters.filter((name) => name !== i.name)
        )
      );
    } else {
      dispatch(setSelectedCharacters([...selectedCharacters, i.name || '']));
    }
  };

  return (
    <div>
      <input
        className="input_checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
}
export default Checkbox;
