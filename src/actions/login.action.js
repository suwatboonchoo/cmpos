import { HTTP_LOGIN_FETCHING, HTTP_LOGIN_SUCCESS, HTTP_LOGIN_FAILED, server } from "../constants";
import {httpClient} from "./../utils/HttpClient";

export const setStateLoginToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
})

export const setStateLoginToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload
})

export const setStateLoginToFailed = () => ({
  type: HTTP_LOGIN_FAILED,
})

export const autoLogin = (history)=>{
  return dispatch =>{
    let token = localStorage.getItem(server.TOKEN_KEY)
    if (token) {
      history.push("/stock")
    }
  }
}

export const logout = (history)=>{
  return (dispatch, getState)=>{
    localStorage.removeItem(server.TOKEN_KEY);
    getState().appReducer.appForceUpdate()
    history.push("/login")
  }
}

export const login = (history, credentail)=>{
    return (dispatch,getState)=>{
        dispatch(setStateLoginToFetching())
        httpClient.post(server.LOGIN_URL,credentail).then(result=>{

          if (result.data.auth) {
            let token = result.data.token
            localStorage.setItem(server.TOKEN_KEY, token)
            getState().appReducer.appForceUpdate()
  
            history.push("/stock");                            
            dispatch(setStateLoginToSuccess(result.data));
            
          } else {
            dispatch(setStateLoginToFailed());
          }
        }).catch(err=>{
          alert(JSON.stringify(err))
          dispatch(setStateLoginToFailed());
        })
       
    }
}