import { AES, enc } from "crypto-js";
const accessTokenKey: any = process.env.NEXT_PUBLIC_LS_ACCESS_TOKEN_KEY;
const refreshTokenKey: any = process.env.NEXT_PUBLIC_LS_REFRESH_ACCESS_KEY;

export const getUser = () => {
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  }

  return null;
};

export const setToken = async (token: string) => {
  if (token) {
    const encryptedToken = AES.encrypt(
      JSON.stringify(token),
      accessTokenKey
    ).toString();
    await localStorage.removeItem("_at");

    localStorage.setItem("_at", encryptedToken);
  }
};

export const setRefreshToken = (refreshToken: string) => {
  if (refreshToken) {
    const encryptedToken = AES.encrypt(
      JSON.stringify(refreshToken),
      refreshTokenKey
    ).toString();
    localStorage.setItem("_rt", encryptedToken);
  }
};

export const getRefreshToken = () => {
  const token: any = localStorage.getItem("_rt");

  if (token) {
    const bytes = AES.decrypt(token, refreshTokenKey);

    try {
      return JSON.parse(bytes.toString(enc.Utf8));
    } catch (Exception) {
      return null;
    }
  }

  return null;
};

export const getToken = () => {
  const token: any = localStorage.getItem("_at");
  if (token) {
    const bytes = AES.decrypt(token, accessTokenKey);
    try {
      return JSON.parse(bytes.toString(enc.Utf8));
    } catch (Exception) {
      return null;
    }
  }

  return null;
};

export const isUserLoggedIn = () => {
  const tokenJwt = getToken();

  if (!tokenJwt) {
    return false;
  }

  const dataUser = decodeToken(tokenJwt);
  return !!(tokenJwt && dataUser);
};

export const decodeToken = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
};

export const getAccessToken = (): string | null => {
  const token: any = localStorage.getItem("_at");
  if (token) {
    const bytes = AES.decrypt(token, accessTokenKey);

    try {
      return JSON.parse(bytes.toString(enc.Utf8));
    } catch (Exception) {
      return null;
    }
  }

  return null;
};

export const clearAuth = () => {
  localStorage.removeItem("_at");
  localStorage.removeItem("_rt");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
