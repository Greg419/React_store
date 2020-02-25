/*
    1. 命名和綁定
    2. event
    3. this
    4. 傳遞參數
*/

import React from 'react';

class Login extends React.Component{
    // state
    constructor(props){
        super();
        this.state ={
           email : '',
           password :　''
        };
    }

    handleSubmit = event =>{
        // 1.阻止默認事件
        event.preventDefault();

        // 2. 獲取表單數據

        // 3. 處理登入邏輯

        // 4.跳轉到首頁視圖
        this.props.history.push('/');
    };

    handleChange = e => {
        console.log(e.target.name);
        // 動態命名技巧 : 需將 input 的 name 屬性值, 設定與 State 的屬性名稱相同
        this.setState({
            [e.target.name] : e.target.value
            // email : e.target.value
            // password :　e.target.value
        });
    }

    render(){
        // refer to https://bulma.io/documentation/form/general/
        return (
            // <React.Fragment></React.Fragment> 可包兩個以上的標籤做渲染
            <div className="login-wrapper">
                <form className="box login-box" onSubmit={ this.handleSubmit }>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Email"
                                // 將 name 的值, 設定與 State 的屬性名稱相同, 才能達到動態命名 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="password" 
                                placeholder="Password" 
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-fullwidth is-primary">Login</button>
                    </div>
                </form>
            </div>
        ); // JSX Babel Emmet
    }
}

export default Login;