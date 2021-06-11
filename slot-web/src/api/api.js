import Config from './config';

const apiGet = async targetApi => {
  let url = `${Config.apiUrl}${targetApi}`;
  let options = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    insecure: true,
  };
  //   console.log('apiGet calling url: ', url);
  //   console.log('apiGet calling options: ', options);

  let response = await fetch(url, options);
  let responseProcessed = await response.json();
  console.log('apiGet calling responseProcessed: ', responseProcessed);
  console.log(responseProcessed.apiToken);

  return responseProcessed;
};

const apiPost = async (targetApi, data, token) => {
  let url = `${Config.apiUrl}${targetApi}`;
  let options = {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  console.log('apiGet calling url: ', url);
  console.log('apiGet calling options: ', options);

  let response = await fetch(url, options);
  let responseProcessed = await response.json();
  console.log('apiGet calling responseProcessed: ', responseProcessed);

  return responseProcessed;
};

export default { apiGet, apiPost };
