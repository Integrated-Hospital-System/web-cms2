import axios from '../axios/axios';

export function getAccount (payload) {
  return { type : 'accounts/getAccount', payload }
}

export function asyncGetAccount (user) {
  return async (dispatch) => {
    try {
      let response = await axios ({
        method: 'POST',
        url : '/login',
        data : user
      })
      dispatch(getAccount(response.data.account));
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}