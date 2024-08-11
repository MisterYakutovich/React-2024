
import { PeopleArray } from '../../types/types';
import PageItem from '../PageItem/PageItem';

interface PageItemCartClientProps {
  details: PeopleArray;
}
export default function PageItemCartClient({
  details,
}: PageItemCartClientProps) {
  return (
    
        <PageItem details={details} />
     
  );
}
