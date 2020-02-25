/*
    1.一次渲染
    2.隨需調用
        (1) 子組件作為參數並被渲染
        (2) 子組件可以關閉彈出層
        (3) 子組件與調用者<Products/>可以通訊
*/

import React from 'react'
// { render } 用來直接將此組件渲染出來
import { render } from 'react-dom'

class Panel extends React.Component {
    state ={
        active: false,
        component: null,
        callback: () => {}
    }

    open = (

        // 設定傳遞進來的參數之初始值
        options = {
            props:{},
            component: null,
            productsCallback: ()=>{}
        }

    ) => {
        // 解構傳進來的參數
        const { props, component, productsCallback } = options;

        // 以時間戳為組件的key值, 每次關閉再打開時, <AddInventory /> 內容都會因為不同的 key 而被清空
        const _key = new Date().getTime()
        
        // 將傳遞進來的構造函數 component(AddInventory), 需轉透過 createElement 換成可渲染的組件實例
        // ps. 此處會把 this.close() 及 ...props 傳遞給子組件 component
        const _component = React.createElement(component, { 
            ...props,
            close: this.close, 
            key:_key 
        });

        this.setState({
            active: true,
            component: _component,
            callback: productsCallback 
            // 把 Products/Product 的 productsCallback 跟 this.state.callback 串起來, this.close 就可以透過 state.callback 傳參數上去
        })
    }

    // 關閉彈出視窗時接收 <AddInventory/> 的 data
    close = data => {
        // console.log("close() datta is: ", data);
        this.setState({
             active: false
        })
        this.state.callback(data); // 此處 callback 是綁到父層的 function, 所以透過 close() 可以將子組件的的參數 data 再往上傳到 <Products/>
    }

    render () {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        }
        // panel-wrapper: 整個畫面, over-layer: 左半邊半透明區塊, panel:右半邊我們要的資料輸入快
        return (
            <div className={ _class[this.state.active] }>
                <div className="over-layer" onClick={()=>{this.close()}}></div>
                <div className="panel">
                    <div className="head">
                        {/* 若用 onClick={this.close} 的話, 會回傳一個 class 給 this.close(), 導致close()內判斷 if(data) 時為true */}
                        {/* <div className="over-layer" onClick={this.close}></div> */}
                        <span className="close" onClick={()=>{this.close()}}>X</span>
                        {this.state.component}
                    </div>
                </div>
            </div>
        );
    }
}

// 生成一個 div, 並append到 body 內
const _div = document.createElement('div')
document.body.appendChild(_div)

// 最後將 <Panel/> 渲染結果塞進該 div
const _panel = render(<Panel />, _div);

// render 會回傳一個最終的實例對象, 可供其他 component 調用此實例對象內的方法
export default _panel;