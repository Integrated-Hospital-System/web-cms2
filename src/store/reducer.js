const initialState = {
  accountStore : {

  }
}

function reducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'accounts/getAccount' :
      return { ...initialState, accountStore : payload }
    case 'accounts/deleteAccount' :
      return { ...state, accountStore : payload }
    default : 
      return state;
  }
}

export default reducer;