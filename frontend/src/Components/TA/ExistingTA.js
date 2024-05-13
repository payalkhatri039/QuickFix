import { useEffect } from 'react';
import {
  getAllFAQs,
  getAllFAQsAccordingToTA
} from '../../redux/actions/TA/index';

import { useDispatch, useSelector } from 'react-redux';
import TA from './TA';

/**
 * @returns React.Component
 *
 * This component is called when we have to show the existing assignment list on the
 * Teaching Assistant tab
 */
export const ExistingTA = () => {
  const { id } = useSelector((state) => state.user);
  console.log('TA ID IS', id);

  const dispatch = useDispatch();
  const tas = useSelector((state) => state.ta);
  console.log(tas);
  useEffect(() => {
    dispatch(getAllFAQsAccordingToTA(id));
  }, []);
  return (
    <>
      <div className="FAQForm">
        {Array.isArray(tas) && tas?.map((ta) => <TA key={ta._id} ta={ta} />)}
      </div>
    </>
  );
};

export default ExistingTA;
