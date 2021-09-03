export const login = (history, data, url) => {
  if (
    (data.name === '0001' && data.password === '0001') ||
    (data.name === '0002' && data.password === '0002') ||
    (data.name === '0003' && data.password === '0003') ||
    (data.name === '0004' && data.password === '0004') ||
    (data.name === '0005' && data.password === '0005') ||
    (data.name === '0006' && data.password === '0006') ||
    (data.name === '0007' && data.password === '0007') ||
    (data.name === '0008' && data.password === '0008') ||
    (data.name === '0009' && data.password === '0009') ||
    (data.name === '00010' && data.password === '00010') ||
    (data.name === '00011' && data.password === '00011') ||
    (data.name === '00012' && data.password === '00012') ||
    (data.name === '00013' && data.password === '00013') ||
    (data.name === '00014' && data.password === '00014') ||
    (data.name === '00015' && data.password === '00015') ||
    (data.name === '00016' && data.password === '00016') ||
    (data.name === '00017' && data.password === '00017') ||
    (data.name === '00018' && data.password === '00018') ||
    (data.name === '00019' && data.password === '00019') ||
    (data.name === '00020' && data.password === '00020') ||
    (data.name === '00021' && data.password === '00021') ||
    (data.name === '00022' && data.password === '00022') ||
    (data.name === '00023' && data.password === '00023') ||
    (data.name === '00024' && data.password === '00024') ||
    (data.name === '00025' && data.password === '00025') ||
    (data.name === '100' && data.password === '100') ||
    (data.name === '101' && data.password === '101') ||
    (data.name === '102' && data.password === '102') ||
    (data.name === '103' && data.password === '103') ||
    (data.name === '104' && data.password === '104') ||
    (data.name === '105' && data.password === '105') ||
    (data.name !== '105' && data.password !== '105')
  ) {
    localStorage.setItem('auth', data);
    history.push(url);
  } else {
    alert('帳號密碼錯誤');
  }
};

// Login State
export const isLogin = () => {
  if (localStorage.getItem('auth')) return true;
  return false;
};
