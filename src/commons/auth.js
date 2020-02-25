import decode from "jwt-decode";

const JWT = "store_token_id";

// Login.js 判斷登入成功後, 以 JWT 為 key值, 將Token存入 localStorage
const setToken = token => {
  localStorage.setItem(JWT, token);
};

// 以 JWT 為 key值取出 token
const getToken = token => {
  return localStorage.getItem(JWT);
};

const isLogin = () => {
  const jwToken = getToken();
  // 抓得到 Token 表示使用者有登入 ==> !!jwToken 為 true
  return !!jwToken && !isTokenExpired(jwToken);
};

// 判斷 token 是否逾期
const isTokenExpired = token => {
  try {
    const _info = decode(token);
    // token.exp 時間戳小於當前時間 表示已預期
    if (_info.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

const getUser = () => {
  const jwToken = getToken();
  if (isLogin()) {
    const user = decode(jwToken);
    return user;
  } else {
    return null;
  }
};

// 予 UserProfile 的 Logout btn 登出用
const logout = () => {
  localStorage.removeItem(JWT);
}

// global 取代 export: 於其他 component 不須import 即可使用
global.auth = {
  setToken,
  getToken,
  getUser,
  isLogin,
  logout
};
