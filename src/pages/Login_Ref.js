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
           isLike : false,
           count : 0
        };
    }

    // refs
    emailRef = React.createRef();
    passwordRef = React.createRef();

    handleSubmit = event =>{
        // 1.阻止默認事件
        event.preventDefault();

        // 2. 獲取表單數據
        const formData = {
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value
        };
        console.log(formData);

        // 3. 處理登入邏輯

        // 4.跳轉到首頁視圖
        this.props.history.push('/');
    };

    handleClick = () => {
        this.setState({
            isLike : !this.state.isLike
        });

        this.setState({
            count : this.state.count + 1
        });

        // 欲使用更新後的 state 邏輯, 需取 prevState 內容
        // console.log(this.state.count); 在外部取 count 值會是 "0"
	    // 需用 prevState.count 才抓的到 "1", 這樣 +2 後的值才會為 "3"
        this.setState(prevState => {
            return { count : prevState.count + 2 };
        });
    };

    render(){
        // refer to https://bulma.io/documentation/form/general/
        return (
            // <React.Fragment></React.Fragment> 可包兩個以上的標籤做渲染
            <div className="login-wrapper">
                <form className="box login-box" onSubmit={ this.handleSubmit }>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Email" ref={ this.emailRef } />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" ref={ this.passwordRef } />
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-fullwidth is-primary">Login</button>
                    </div>
                </form>

                <div className="control">
                        <button className="button is-fullwidth is-link" onClick={ this.handleClick }>
                            { this.state.isLike ? 'Dislike' : 'Like' }
                        </button>
                </div>
            </div>
        ); // JSX Babel Emmet
    }
}

export default Login;