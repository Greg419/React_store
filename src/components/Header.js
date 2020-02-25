import React from "react";
import { Link, withRouter } from 'react-router-dom'
import Panel from 'components/Panel'
import UserProfile from 'components/UserProfile'

const Header = props => {

  const toProfile = () => {
    Panel.open({
      component: UserProfile, // 實例化 UserProfile 且傳入 props與productsCallback
      props:{
        user: props.user
      },
      productsCallback: data => {
        if(data === 'logout'){
          props.history.go(0); // route 至當前頁面以刷新畫面
        }
      }
    })
  }

  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <Link to="/">Home</Link>
        </div>
        <div className="end">
          {/* 根據登入後的 nickname 來顯示不同 Icon */}
          {props.user.nickname ? (
            <span className="nickname" onClick={toProfile}>
              {/* <i className="fas fa-user-cog"></i> */}
              <i className="fas fa-id-card"></i>
              {props.user.nickname}
            </span>
          ) : (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register"> Register</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
