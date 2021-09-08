import store from '../store';
import { setEgmList } from '../store/actions/egmAction';

const AGENT_URL = 'http://220.135.67.240:8000';
const LOCAL_SERVER = '192.168.10.60';

const getHeader = (token = null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  return headers;
};

export const getEgmProps = async () => {
  const apiGet = `${AGENT_URL}/EgmPropConfigApi?localSvr=${LOCAL_SERVER}`;
  const response = await fetch(apiGet);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch egm.');
  }

  if (data.code !== 14) {
    throw new Error(data.msg || 'Could not fetch egm.');
  }

  store.dispatch(setEgmList(data.propConfigList));

  return data;
};

export const postEgmProps = async reqData => {
  const headers = getHeader();

  const response = await fetch(`${AGENT_URL}/EgmPropConfigApi`, {
    method: 'POST',
    headers,
    body: JSON.stringify(reqData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not set egm.');
  }

  if (data.code !== 15) {
    throw new Error(data.msg || 'Set Egm fail');
  }

  return data;
};
