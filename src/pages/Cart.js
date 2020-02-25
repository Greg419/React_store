import React, { useState, useEffect, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import axios from 'commons/axios'
import Layout from 'Layout'
import CartItem from 'components/CartItem'
import { formatPrice } from 'commons/helper';

const Cart = () => {
    // 使用 Hook 於非 class 內設定 state參數/setState函式
    const [carts, setCarts] = useState([]);

    // uesEffect 會於 render() 後被執行, 相當於 ComponentDidMount
    useEffect(() => {
        const user = global.auth.getUser() || {};
        axios.get(`/carts?userId=${user.email}`).then(res => setCarts(res.data)); // 只抓有登入的使用者的 carts
    }, []); 
    // 第二個參數需傳空的 [], 若是傳入 carts[], 只要carts 一被更動就會再重新 invoke useEffect() 造成無限循環


    // useMemo: 傳遞一個「建立」function 及依賴 array。
    // useMemo 只會在依賴(carts)改變時才重新計算 memoized 的值。
    const totalPrice = useMemo(() => {
        const totalPrice = carts
            .map(cart => cart.mount * parseInt(cart.price)) // 先算出各個單品的總和(單品數量*單價)
            .reduce((acc, value) => acc + value, 0); // 再累加 map[] 裡的各個單品總和, 算出購物車總價
        return formatPrice(totalPrice)
    }, [carts]);

    // 接收 CartItem 修改mount後的產品資料, 以重新渲染畫面
    const updateCart = cart => {
        const newCarts = [...carts];
        const _index = newCarts.findIndex(c => c.id === cart.id);
        newCarts.splice(_index, 1, cart) // 將 cart 寫回 carts[] 
        setCarts(newCarts);
    };

    // Cart.js 刪除完 REST API 後, 透過此 function 來更動 state.carts 達到重新渲染畫面的目的
    const deleteCart = cart => {
        const _carts = carts.filter(c => c.id !== cart.id);
        setCarts(_carts);
    };

    return(
        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    <TransitionGroup component={null}>
                        {carts.map(cart => (
                            <CSSTransition classNames="cart-item" timeout={500} key={cart.id}>
                                <CartItem 
                                    key={cart.id} 
                                    cart={cart} 
                                    updateCart={updateCart} 
                                    deleteCart={deleteCart}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                {
                    carts.length === 0 ? <p className="no-cart">NO GOODS</p> : ""
                }
                <div className="cart-total">
                    Total:
                    <span className="total-price">{totalPrice}</span>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;