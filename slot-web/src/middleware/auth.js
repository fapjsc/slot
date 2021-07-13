// Login
export const login = (props, data) => {
  if (data.name === '0001' && data.password === '0001') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwMURlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0002' && data.password === '0002') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwMkRlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0003' && data.password === '0003') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwM0RlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0004' && data.password === '0004') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwNERlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0005' && data.password === '0005') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwNURlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0006' && data.password === '0006') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwNkRlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0007' && data.password === '0007') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwN0RlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0008' && data.password === '0008') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwOERlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0009' && data.password === '0009') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAwOURlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0010' && data.password === '0010') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxMERlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0011' && data.password === '0011') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxMURlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0012' && data.password === '0012') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxMkRlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0013' && data.password === '0013') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxM0RlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0014' && data.password === '0014') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxNERlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0015' && data.password === '0015') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxNURlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0016' && data.password === '0016') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxNkRlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0017' && data.password === '0017') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxN0RlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0018' && data.password === '0018') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxOERlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0019' && data.password === '0019') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAxOURlbW8x&casino=casino_demo_1`);
  } else if (data.name === '0020' && data.password === '0020') {
    localStorage.setItem('auth', data);
    props.history.push(`/load/?player=${data.name}&at=MDAyMERlbW8x&casino=casino_demo_1`);
  } else {
    alert('帳號密碼錯誤');
  }
};

// Login State
export const isLogin = () => {
  if (localStorage.getItem('auth')) return true;
  return false;
};
