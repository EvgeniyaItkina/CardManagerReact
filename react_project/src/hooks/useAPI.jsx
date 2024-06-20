import { useState, useCallback } from 'react';
import axios from 'axios';

const baseCardsURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
const baseUsersURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users"

const useAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiCall = useCallback(async (method, payload = {}) => {
    try {
      const token = localStorage.getItem('token');
      const header = {
        headers: {
          'x-auth-token': token,
        }
      };
      setIsLoading(true);
      let response;

      switch (method) {
        case METHOD.CARDS_GET_ALL:
          response = await axios.get(baseCardsURL);
          break;
        case METHOD.CARDS_GET_ONE:
          response = await axios.get(`${baseCardsURL}/${payload.id}`);
          break;
        case METHOD.CARDS_CREATE:
          response = await axios.post(baseCardsURL, payload, header);
          break;
        case METHOD.CARDS_GET_MY_CARDS:
          response = await axios.get(`${baseCardsURL}/my-cards`, header);
          break;
        case METHOD.CARDS_DELETE:
          response = await axios.delete(`${baseCardsURL}/${payload.id}`, header);
          break;
        case METHOD.CARDS_UPDATE:
          const { id: updateId, ...updatePayload } = payload;
          response = await axios.put(`${baseCardsURL}/${updateId}`, updatePayload, header);
          break;
        case METHOD.CARDS_LIKE_UNLIKE:
          response = await axios.patch(`${baseCardsURL}/${payload.id}`, {}, header);
          break;

        case METHOD.USER_REGISTER:
          response = await axios.post(baseUsersURL, payload);
          break;
        case METHOD.USER_LOGIN:
          response = await axios.post(`${baseUsersURL}/login`, payload);
          break;
        case METHOD.USERS_GET_ALL:
          response = await axios.get(baseUsersURL, header);
          break;
        case METHOD.USERS_GET_ONE:
          response = await axios.get(`${baseUsersURL}/${payload.id}`, header);
          break;
        case METHOD.USERS_UPDATE:
          response = await axios.put(`${baseUsersURL}/${payload.id}`, payload, header);
          break;
        case METHOD.USER_UPDATE_STATUS:
          response = await axios.patch(`${baseUsersURL}/${payload.id}`, {}, header);
          break;
        case METHOD.USER_DELETE:
          response = await axios.delete(`${baseUsersURL}/${payload.id}`, header);
          break;

        default:
          throw new Error('Invalid API method');
      }

      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return [data, error, isLoading, apiCall];
}

export const METHOD = {
  CARDS_GET_ALL: 'CARDS_GET_ALL',
  CARDS_GET_ONE: 'CARDS_GET_ONE',
  CARDS_CREATE: 'CARDS_CREATE',
  CARDS_UPDATE: 'CARDS_UPDATE',
  CARDS_GET_MY_CARDS: 'CARDS_GET_MY_CARDS',
  CARDS_DELETE: 'CARDS_DELETE',
  CARDS_LIKE_UNLIKE: 'CARDS_LIKE_UNLIKE',

  USERS_GET_ALL: 'USERS_GET_ALL',
  USERS_GET_ONE: 'USERS_GET_ONE',
  USERS_UPDATE: 'USERS_UPDATE',
  USER_REGISTER: "USER_REGISTER",
  USER_LOGIN: "USER_LOGIN",
  USER_UPDATE_STATUS: "USER_UPDATE_STATUS",
  USER_DELETE: "USER_DELETE"
};
export default useAPI;