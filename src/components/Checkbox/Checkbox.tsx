import { useState } from 'react';
import './Checkbox.css';
import { PeopleArray } from '../../types/types';

interface CheckboxProps {
  i: PeopleArray;
}
function Checkbox({ i }: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(false);
  function handleChange() {
    setChecked(!checked);
  }

  if (i.name && checked) {
    console.log(i.name);
  }

  return (
    <div>
      <input
        className="input_checkbox"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}
export default Checkbox;
