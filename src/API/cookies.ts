import Cookie from "js-cookie"


export const setToken = (key: string, token: string) => {
    Cookie.set(key, token, {
        sameSite: "strict", 
        secure: true
    })
};

export const getToken = (key: string)=> {
    return Cookie.get(key)
};
  
export const removeToken = (key: string) => {
    Cookie.remove(key)
};