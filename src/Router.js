import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from 'pages/App'
import Login from 'pages/Login'
import Register from 'pages/Register'
import NotFound from 'pages/NotFound'
import Cart from 'pages/Cart'

const Router = () => (
    <BrowserRouter>
        <Switch>
            {/* Route兩個必需參數=> 1.path:定義URL, 
                                   2.component:該URL欲顯示之組件頁面
                根路徑需要精確的匹配, 必須加上 exact */}
            <Route path="/" exact component={ App } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/cart" component={ Cart } />
            {/* 未指定的路徑都導到NotFound組件頁面 */}
            <Route component={ NotFound } />
        </Switch>
    </BrowserRouter>
);

export default Router;