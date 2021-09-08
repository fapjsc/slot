import { useReducer, useEffect } from 'react';
import { validate } from '../../lib/validator';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        // isValid: true,
      };

    case 'TOUCH':
      return {
        ...state,
        isTouch: action.isTouch,
      };

    default:
      return state;
  }
};

const Input = props => {
  const initialInputState = {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouch: false,
  };

  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

  const onChangeHandler = e => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH', isTouch: true });
  };

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  //=== Style ====//
  const inputBoxStyle = `form-group col ${
    !inputState.isValid && inputState.isTouch && 'form-group col has-danger'
  }`;

  const inputStyle = `form-control ${
    !inputState.isValid && inputState.isTouch && 'form-control is-invalid'
  }`;

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        autoComplete="off"
        className={inputStyle}
      />
    ) : props.element === 'textarea' ? (
      <textarea
        id={props.id}
        row={props.row || 3}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        autoComplete="off"
        className={inputStyle}
      />
    ) : props.element === 'select' ? (
      <select
        id={props.id}
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        disabled={props.disabled}
        className="form-select"
      >
        {props.selectOption.map(el => (
          <option key={el}>{el}</option>
        ))}
      </select>
    ) : null;

  return (
    <div className={inputBoxStyle}>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouch && (
        <div className="invalid-feedback">{props.errorText}</div>
      )}
    </div>
  );
};

export default Input;
