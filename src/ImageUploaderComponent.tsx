import { useContext } from 'react';
import { IContext, ThemeContext } from './App';

function ImageUploaderComponent() {
  const context = useContext<null | IContext>(ThemeContext);
  const handleImageChange = context?.handleImageChange;
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}
export default ImageUploaderComponent;
