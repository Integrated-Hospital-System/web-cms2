const initialState = {
  accountStore : {

  }
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'accounts/getAccount' :
      return { ...state, accountStore : payload }
    case 'accounts/deleteAccount' :
      return { ...state, accountStore : payload }
    default : 
      return state;
  }
}