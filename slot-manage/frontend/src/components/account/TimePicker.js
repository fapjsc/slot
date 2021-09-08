import { useState } from 'react';

// Style
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineFileSearch } from 'react-icons/ai';

// Time Picker
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TimePicker = () => {
  //==== Time Initial ====//
  // 當前時間
  const currentTime = new Date();
  // 前一天
  const theDayBefore = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  // 前一個月
  const aMonthAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 31);
  //======================//

  const [startTime, setStartTime] = useState(theDayBefore);
  const [endTime, setEndTime] = useState(currentTime);

  const onSubmitHandler = e => {
    e.preventDefault();

    if (startTime.getTime() > endTime.getTime()) {
      console.log('錯誤的時間');
      return;
    }

    const getStartTime = formatTimer(startTime);
    const getEndTime = formatTimer(endTime);
    console.log(getStartTime, 'start');
    console.log(getEndTime, 'end');
  };

  const formatTimer = times => {
    return times.toLocaleDateString() + ' ' + times.getHours() + ':' + times.getMinutes();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Form style={fontStyle} onSubmit={onSubmitHandler}>
        <Row className="p-4">
          <Form.Group as={Col} md={5}>
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

          <Form.Group as={Col} md={5}>
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
            <Button type="submit" style={{ backgroundColor: '#D9E3F1' }}>
              <AiOutlineFileSearch style={{ fontSize: '2rem' }} />
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </MuiPickersUtilsProvider>
  );
};

const fontStyle = {
  backgroundColor: '#D9E3F1',
  maxWidth: '768px',
  borderRadius: '5rem',
  paddingLeft: '2rem',
};

export default TimePicker;
