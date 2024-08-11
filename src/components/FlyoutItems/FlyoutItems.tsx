import { useDispatch, useSelector } from 'react-redux';
import styles from './FlyoutItems.module.css';
import { RootState } from '../../redux/store';
import { unselectAllItems } from '../../redux/slices/itemsDetailsSlice';
import Download from '../Download/Download';

function FlyoutItems() {
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemsDetails.selectedCharacters
  );

  const dispatch = useDispatch();
  const removeItems = () => {
    dispatch(unselectAllItems());
  };

  return (
    <div className={styles.flyout_container}>
      <div className={styles.flyout_container_unselect_all}>
        <button
          className={styles.flyout_container_unselectAll_button}
          onClick={removeItems}
        >
          Unselect all
        </button>
      </div>
      <div className={styles.flyout_container_items}>
        <h2 className={styles.flyout_container_items_selected}>
          {selectedCharacters.length} Items are selected
        </h2>
      </div>
      <div className={styles.flyout_container_download}>
        <Download />
      </div>
    </div>
  );
}
export default FlyoutItems;
