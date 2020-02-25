import React from "react";

export default function UserProfile(props) {
  const logout = () => {
    global.auth.logout(); //清除 localStorage 的 jw token 即可登出
    props.close("logout"); // 關閉登出頁面同時傳出 logout 字串
  };

  return (
    <div className="user-profile">
      <p className="title has-text-centered">Profile</p>
      {/* Bulma# Disabled form */}
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label">Nickname</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.nickname}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Email</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.email}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Type</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.type === 1 ? "Manager" : "General User"}
            />
          </div>
        </div>
      </fieldset>
      {/* 登出, 取消按鈕 */}
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger" type="button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="control">
          <button
            className="button"
            type="button"
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
