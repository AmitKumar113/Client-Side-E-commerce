import axios from 'axios'

//setting user using email and password
export const getUser = (user) => async (dispatch) =>{
    console.log("getUser action")
    const config = { headers: { "Content-Type": "application/json" } };
    // console.log({user})
    try{
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/login`,
           user,
           config
        );
    
        console.log({data})
        localStorage.setItem("auth-token",data.authtoken)
        dispatch({
            type: 'SET_USER',
            payload: data.user
        })
        
    } catch(error){
        // console.log(error.response.data.error)
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.response.data.message
        })
    }
    
    // window.push('/')
}



//set user state if their is any auth-token in localStorage
export async function setUserByAuthtoken(dispatch){
    const authToken = localStorage.getItem('auth-token')
    if(!authToken) return;
    const config = { headers: { "Content-Type": "application/json" , "auth-token" : authToken} };
    try{
            const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user-auth`,
           config
        );
    
        console.log(data.user)
        // localStorage.setItem("auth-token",data.authtoken)
        // return(dispatch => {
            dispatch({
                type: 'SET_USER',
                payload: data.user
            })
        // })
    } catch(error){
        console.log({error})
    }
}


//set user state to {} and delete auth token from LocalStorage
export function logoutUser(dispatch){
    console.log("logout called")
    localStorage.removeItem('auth-token')
        // return(dispatch => {
            dispatch({
                type: 'LOGOUT_USER'
            })
        // })  
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

