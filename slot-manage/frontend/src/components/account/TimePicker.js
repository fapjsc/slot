import { useState } from 'react';
import { useDispatch } from 'react-redux';

//Actions
import { setCashInCondition, setCashOutCondition } from '../../store/actions/accountAction';

// Style
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineFileSearch, AiOutlineClear } from 'react-icons/ai';

// Time Picker
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TimePicker = ({ filterType }) => {
  //==== Time Initial ====//
  // 當前時間
  const currentTime = new Date();
  // 前一天
  const theDayBefore = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  // 前一個月
  const aMonthAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 31);
  //======================//

  const dispatch = useDispatch();

  const [startTime, setStartTime] = useState(theDayBefore);
  const [endTime, setEndTime] = useState(currentTime);

  const onSubmitHandler = e => {
    e.preventDefault();

    if (startTime.getTime() > endTime.getTime()) {
      alert('錯誤的時間');
      return;
    }

    const filterCondition = {
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
    };

    filterType === '開分'
      ? dispatch(setCashInCondition(filterCondition))
      : dispatch(setCashOutCondition(filterCondition));
  };

  const clearFilterCondition = () => {
    setStartTime(theDayBefore);
    setEndTime(currentTime);

    const filterCondition = {
      startTime: null,
      endTime: null,
    };

    filterType === '開分'
      ? dispatch(setCashInCondition(filterCondition))
      : dispatch(setCashOutCondition(filterCondition));
  };

  return (
    <>
      <h5>{filterType}</h5>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form style={fontStyle} onSubmit={onSubmitHandler} className="bg-dark">
          <Row className="p-4 d-flex justify-content-between">
            <Form.Group as={Col} md={4} className="">
              <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                label="開始時間"
                value={startTime}
                onChange={setStartTime}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
                minDate={aMonthAgo}
                maxDate={currentTime}
              />
            </Form.Group>

            <Form.Group as={Col} md={4} className="">
              <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                label="結束時間"
                value={endTime}
                onChange={setEndTime}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
                minDate={aMonthAgo}
                maxDate={endTime}
              />
            </Form.Group>

            <Form.Group as={Col} md={2}>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} md={3} className="d-flex justify-content-around">
              <Button type="submit" style={buttonStyle}>
                <AiOutlineFileSearch style={iconStyle} />
              </Button>

              <Button type="button" onClick={clearFilterCondition} style={buttonStyle}>
                <AiOutlineClear style={iconStyle} />
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </MuiPickersUtilsProvider>
    </>
  );
};

const fontStyle = {
  backgroundColor: '#D9E3F1',
  maxWidth: '768px',
  borderRadius: '5rem',
  paddingLeft: '2rem',
};

const buttonStyle = {
  padding: '1rem',
  width: '5rem',
  height: '5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const iconStyle = {
  fontSize: '2rem',
};

export default TimePicker;
