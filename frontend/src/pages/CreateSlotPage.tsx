import React, { useCallback, useEffect, useState } from 'react';
import '../styles/CreateSlotPage/createSlotPage.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DropDown from '../Components/DropDown';
import useDropDown from '../hooks/useDropDown';
import { required } from '../helper';
import { getTimeList } from '../helper/DateTimeHelper';
import { Button } from 'antd';
import { DisplayState } from '../types/commonTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import withAuth from '../Components/AuthHOC/AuthHOC';
import { createSlots } from '../helper/handleAPI';
import ConfirmCreateSlotModal from '../Components/CreateSlot/ConfirmCreateSlotModal';
import BaseContainer from '../Components/BaseContainer';

/**
 *
 * @returns React.Component
 *
 * @description
 * This Component can be used by TA to create slots.
 * TA id is fetched from user reducer as only a TA can create slots.
 * Upon selection of valid date range and time createSlots API is called.
 * If the slots are created successfully then user sees a success modal.
 *
 * This component uses Calendar from react-calendar and inhouse dropdown hook and component
 */

function CreateSlotPage() {
  const [displayState, setDisplayState] = useState<DisplayState>('DEFAULT');
  const { id: teachingAssistantId } = useSelector(
    (state: RootState) => state.user
  );
  const startTimeDropDownState = useDropDown(
    { id: 'startTime', value: '', errorMessage: 'Required' },
    [required]
  );
  const [showDateError, setShowDateError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const endTimeDropDownState = useDropDown(
    { id: 'endTime', value: '', errorMessage: 'Required' },
    [required]
  );
  const [dateRange, setDateRange] = useState([]);
  /*
   * Set the minimum time to 8:30 am
   */
  useEffect(() => {
    startTimeDropDownState.setList(getTimeList('08:30'));
  }, []);

  useEffect(() => {
    setShowDateError(false);
  }, [dateRange]);

  useEffect(() => {
    const endTimeList = getTimeList(startTimeDropDownState.key);
    endTimeDropDownState.setList(endTimeList);
  }, [startTimeDropDownState.key]);

  const onDateChange = (e: Array<string>) => {
    console.log(e);
    setDateRange(e);
  };

  const onCreateSlotClicked = useCallback(async () => {
    if (dateRange.length === 0) setShowDateError(true);
    else {
      setDisplayState('LOADING');
      if (dateRange.length === 1) {
        const endDate = new Date(dateRange[0]);
        endDate.setHours(23, 59, 59);
        dateRange.push(endDate);
      }
      const body = {
        teachingAssistantId,
        dateRange,
        startTime: startTimeDropDownState.key,
        endTime: endTimeDropDownState.key
      };
      await createSlots(body);
      setShowModal(true);
      setDisplayState('SUCCESS');

      return () => {
        setShowModal(false);
      };
    }
  }, [dateRange, endTimeDropDownState.key, startTimeDropDownState.key]);

  return (
    <BaseContainer>
      <div className="base-slot-container">
        <div className="column_flex">
          <h1 className="heading">Create Slots</h1>
          <div className="slot-container">
            <Calendar
              calendarType="US"
              allowPartialRange={true}
              selectRange={true}
              onChange={onDateChange}
              minDate={new Date()}
            />
            <div className="column_flex">
              <div className="row_flex">
                <DropDown
                  placeholder="Start time"
                  dropDownState={startTimeDropDownState}
                  label={'Start Time'}
                  id={startTimeDropDownState.id}
                />
                <DropDown
                  placeholder="End time"
                  dropDownState={endTimeDropDownState}
                  label={'End Time'}
                  id={endTimeDropDownState.id}
                />
              </div>
              <div className="left">
                <div className="btnContainer left">
                  <Button
                    type="primary"
                    style={{ marginLeft: '0px' }}
                    loading={displayState === 'LOADING'}
                    onClick={onCreateSlotClicked}
                  >
                    Create Slots
                  </Button>
                </div>
                {showDateError && (
                  <p className="error-text">Please select date</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ConfirmCreateSlotModal
          showModal={showModal}
          handleClick={() => setShowModal(false)}
        />
      </div>
    </BaseContainer>
  );
}

export default withAuth(CreateSlotPage);
