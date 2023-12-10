import { storeAuth, clearAuth } from '../utils/Auth';


export const checkAuth = async () => {
    const resp = await fetch("/api/auth/refresh_token");
      if (resp.ok) {
          return resp.json()
            .then(data => {
              storeAuth(data);
              return;
            })
        } else {
          clearAuth();
          throw new Error(resp.status)
        }
  }

  export const login = async (user) => {
    const resp = await fetch("/api/auth/login", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(user)
    });
  
    if (resp.ok) {
      return resp.json().then(data => {
        storeAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userId: data.user.userId
        });
        return data.user;
      });
    } else {
      return resp.json().then(data => {
        throw new Error(data.error || "Something went wrong");
      });
    }
  }