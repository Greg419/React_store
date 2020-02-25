import React from "react";
import axios from "commons/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  const onSubmit = async data => {
    // 有 register 的標籤.value 都會被包在data傳遞進來
    // 3. 處理註冊邏輯
    try {
      const { nickname, email, password } = data;
      // 等待 json server 的 post 端口驗證 email 與 password 後, 回傳一組 Token
      const res = await axios.post("/auth/register", {
        nickname,
        email,
        password,
        type: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken); // 登入成功後 將 Token 存到 localStorage
      toast.success("Register Successed");
      // 4.跳轉到首頁視圖
      props.history.push("/");
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <p className="title has-text-centered">Register</p>
          <label className="label">Nickname</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && "is-danger"}`}
              type="text"
              placeholder="Nickname"
              // 將 name 的值, 設定與 State 的屬性名稱相同, 才好動態命名
              name="nickname"
              // React-Hook-Form 套件解構的元件: register, handleSubmit, errors
              // 標籤 register 後可設置許多屬性, 如 required, pattern ...
              ref={register({
                required: {
                  // 不可為空
                  message: "nickname is required"
                }
              })}
            />
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              placeholder="Email"
              // 將 name 的值, 設定與 State 的屬性名稱相同, 才好動態命名
              name="email"
              // React-Hook-Form 套件解構的元件: register, handleSubmit, errors
              // 標籤 register 後可設置許多屬性, 如 required, pattern ...
              ref={register({
                required: {
                  // 不可為空
                  message: "email is required"
                },
                pattern: {
                  // 限制條件
                  value: /^([A-Za-z0-9])+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                  message: "invalid email"
                }
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="password"
              placeholder="Password"
              name="password"
              ref={register({
                required: {
                  // 不可為空
                  message: "password is required"
                },
                minLength: {
                  // 最小長度
                  value: 6,
                  message: "cannt be less than 6 digitals"
                }
              })}
            />
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
