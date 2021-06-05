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

  return responseProcessed;
};

export default { apiGet };
