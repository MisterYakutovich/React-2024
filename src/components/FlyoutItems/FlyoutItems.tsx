import { useSelector } from 'react-redux';
import './FlyoutItems.css';
import { RootState } from '../../redux/store';

function FlyoutItems() {
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemsDetails.selectedCharacters
  );
  return (
    <div className="flyout-container">
      <div className="flyout-container_unselect_all">
        <button className="flyout-container_unselectAll_button">
          Unselect all
        </button>
      </div>
      <div className="flyout-container_items">
        <h2 className="flyout-container_items_selected">
          {selectedCharacters.length} Items are selected
        </h2>
      </div>
      <div className="flyout-container_download">
        <button className="flyout-container_download_button">Download</button>
      </div>
    </div>
  );
}
export default FlyoutItems;
