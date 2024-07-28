import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { PeopleArray } from '../../types/types';
import './Download.css';

export function convertToCSV(data: PeopleArray[]) {
  const csvHeaders = [
    'name      ',
    'birth_year      ',
    'eye_color      ',
    'created      ',
    'edited      ',
    'height      ',
    'mass      ',
    'url      ',
  ];
  const csvData = data.map((item) => {
    return [
      item.name,
      item.birth_year,
      item.eye_color,
      item.created,
      item.edited,
      item.height,
      item.mass,
      item.url,
    ];
  });

  const csvString = [csvHeaders, ...csvData]
    .map((row) => row.join(','))
    .join('\n');

  return csvString;
}
function Download() {
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemsDetails.selectedCharacters
  );

  const csvString = convertToCSV(selectedCharacters);
  const filename = `${selectedCharacters.length}_people.csv`;
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);

  return (
    <a
      download={filename}
      href={url}
      role="link"
      className="flyout-container_download_button"
    >
      Download
    </a>
  );
}
export default Download;
