import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import './Header.css';

function Header() {
  const formData = useSelector((state: RootState) => state.form);
  const formData2 = useSelector((state: RootState) => state.uncontrollform);
  console.log(formData);
  console.log(formData2);
  const renderPhoto = (photoData: string) => {
    if (photoData) {
      return <img className="img_base64" src={` ${photoData}`} alt="Photo" />;
    } else {
      return <p>No photo available</p>;
    }
  };
  return (
    <>
      <header className="header">
        <div className="wrapper">
          <div className="header_wrapper">
            <nav className="navbar">
              <ul className="header_list">
                <li>
                  <Link to={`controller/form_1`}>
                    <div className="button">Controller</div>
                  </Link>
                </li>
                <li>
                  <Link to={`uncontroller/form_2`}>
                    <div className="button">Uncontroller</div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="unControllForm">
          <h2>Displaying UnControllForm Data</h2>
          <p className="form-data">Name: {formData2.name}</p>
          <p className="form-data">Age: {formData2.age}</p>
          <p className="form-data">Password: {formData2.password}</p>
          <p className="form-data">Photo: {renderPhoto(formData2.photo)}</p>
          <p className="form-data">Email: {formData2.email}</p>
        </div>
        <div className="controllForm">
          <h2>Displaying ControllForm Data</h2>
          <p className="form-data">Name: {formData.firstName}</p>
          <p className="form-data">Age: {formData.age}</p>
          <p className="form-data">Password: {formData.password}</p>
          <p className="form-data">Photo: {renderPhoto(formData.photo)}</p>
          <p className="form-data">Email: {formData.email}</p>
        </div>
      </main>
    </>
  );
}

export default Header;