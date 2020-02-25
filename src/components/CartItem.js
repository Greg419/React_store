import React, { useState, useMemo } from 'react'
import axios from 'commons/axios'
import { formatPrice } from 'commons/helper'

// 佈局架構: X按鈕 + 商品圖片 + 商品名稱 + 單價 + 商品數量 + 此商品總價(單價*數量)
const CartItem = props => {
    const [mount, setMount] = useState(props.cart.mount);
    const { id, name, image, price } = props.cart || {};

    // useMemo: 傳遞一個「建立」function 及依賴 array。
    // useMemo 只會在依賴(mount 與 price)改變時才重新計算 memoized 的值。
    const sumPrice = useMemo(() => {
        return formatPrice(mount * parseInt(price))
    }, [mount, price]);

    const handleChange = e => {
        const _mount = parseInt(e.target.value);
        setMount(_mount);

        // gen 一筆寫回 REST 的 cart[] 資料
        const newCart = {
            ...props.cart,
            mount: _mount
        };
        axios.put(`/carts/${id}`, newCart).then(res => {
            props.updateCart(newCart);
        });
    };

    // 刪除 REST API 的資料後, 在透過父組件的 props.deleteCart() 修改其 state
    const deleteCart = () => {
        axios.delete(`/carts/${id}`).then(res=>{
            props.deleteCart(props.cart) // 傳進來的 props.cart 即是現在要刪除的這筆商品
        });
    };

    return (
        // Bulma => is-vcentered: 垂直置中, is-narrow: 緊湊表格
        <div className="columns is-vcentered">
            <div className="column is-narrow">
                <span className="close" onClick={deleteCart}>X</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt={name} width="100" />
            </div>
            <div className="column cart-name">
                {name}
            </div>
            <div className="column">
                <span className="price"> {formatPrice(price)}</span>
            </div>
            <div className="column">
                <input 
                    type="number" 
                    className="input num-input"
                    min={1} 
                    value={mount} 
                    onChange={handleChange}
                />
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    )
}

export default CartItem;