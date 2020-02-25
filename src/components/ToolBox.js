import React from 'react'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';

class ToolBox extends React.Component{
    state = {
        searchText: ''
    };

    handleChange = e => {
        const value = e.target.value
        this.setState(
            { searchText: value }
        );
        // 將 user 輸入的搜尋值 pass 上去給 <Products/>
        this.props.search(value);
        // ps. search() 是父層 <Products/> 的函式, 傳進來目的就是要抓這裡的 e.target.value
        // 以便 <Products/> 針對 user 的輸入,  對 products[] 做搜尋條件篩選
    }

    clearSearchText = e =>{
        this.setState(
            { searchText: '' }
        );
        this.props.search(e.target.value);
    };

    goCart = () => {
        if(!global.auth.isLogin()) {
            this.props.history.push('/login');
            toast.info('Please Login First')
            return;
        }
        this.props.history.push('/cart');
    }

    render(){
        return (
            <div className="tool-box">
                <div className="logo-text">Store</div>
                {/* Search部分 採用 Bulma 中的樣式 */}
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                                type="text" 
                                className="input search-input" 
                                placeholder="Search Product Name" 
                                value={ this.state.searchText }
                                onChange={ this.handleChange }
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={ this.clearSearchText }>X</button>
                        </div>
                    </div>
                </div>
                {/* <Link to="/cart" className="cart-box"> */}
                <div className="cart-box" onClick={this.goCart}>
                    {/* 購物車圖示, 引用 Font Awesome */}
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
            </div>
        );
    }
}

// 未在 Router.js 內被匹配過的組件會沒有 props.history 屬性, 需透過 withRouter 來賦予
export default withRouter(ToolBox);