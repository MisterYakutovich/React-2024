import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from './redux/store';
import './Header.css';

function Header() {
  const formData = useSelector((state: RootState) => state.form);
  console.log(formData);
  const formData2 = useSelector((state: RootState) => state.uncontrollform);
  const renderPhoto = (photoData: string) => {
    if (photoData) {
      return <img src={`data:image/jpeg;base64, ${photoData}`} alt="Photo" />;
    } else {
      return <p>No photo available</p>;
    }
  };
  return (
    <>
      <div id="sidebar">
        <h2>Displaying UnControllForm Data</h2>
        <p className="form-data">Name: {formData2.name}</p>
        <p className="form-data">Age: {formData2.age}</p>
        <p className="form-data">Password: {formData2.password}</p>
        <p className="form-data">Email: {formData2.email}</p>

        <nav>
          <ul>
            <li>
              <Link to={`controller/form_1`}>
                <div>Controller</div>
              </Link>
            </li>
            <li>
              <Link to={`uncontroller/form_2`}>
                <div>Uncontroller</div>
              </Link>
            </li>
          </ul>
        </nav>
        <h2>Displaying ControllForm Data</h2>
        <p className="form-data">Name: {formData.firstName}</p>
        <p className="form-data">Age: {formData.age}</p>
        <p className="form-data">Password: {formData.password}</p>
        <p className="form-data">Photo: {renderPhoto(formData.photo)}</p>
        <p className="form-data">Email: {formData.email}</p>
      </div>
    </>
  );
}

export default Header;
