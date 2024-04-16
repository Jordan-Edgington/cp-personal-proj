import axios from 'axios'

export const api = axios.create({
    // baseURL: "http://127.0.0.1:8000/api/" -- this for dev environment
    baseURL: "https://munch-memo.duckdns.org/api/",
    withCredentials:true
})

export const userConfirmation = async () => {
    try {
        // const token = localStorage.getItem("token");
        // if (token) {
        //     api.defaults.headers.common["Authorization"] = `Token ${token}`
        // }
        
        const response = await api.get('users/info/');
        console.log('response', response);
        
        if (response.status === 200) {
            console.log(response.data);
            return { user: response.data.user, email: response.data.email, display_name: response.data.display_name };
        } else {
            console.log('Error in userConfirmation:', response);
            return null;
        }
    } catch (error) {
        console.log('No token provided from cookies.', error);
        return null;
    }
};
    // } else {
    //     console.log('userConfirmation: no token in localStorage')
    //     return null
    // }