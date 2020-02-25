import React from "react";
import axios from "commons/axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ToolBox from "components/ToolBox";
import Product from "components/Product";
import Panel from "components/Panel";
import AddInventory from "components/AddInventory";

class Products extends React.Component {
  // 將商品列表 設為受控組件
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0
  };

  // 設置 商品列表 資料來源
  componentDidMount() {
    // fetch('http://localhost:3003/products')
    //     .then(response => response.json())
    //     .then(data =>{
    //         this.setState({
    //             products: data,
    //             sourceProducts: data
    //         });
    //     });

    axios.get("http://localhost:3003/products").then(response => {
      this.setState({
        products: response.data,
        sourceProducts: response.data
      });
    });

    this.updateCartNum();
  }

  // 欲對 products[] 做搜尋邏輯的篩選, 但須抓取 <ToolBox/> 內的 text 輸入值
  // 故將此 function 傳進 <ToolBox/> 以獲取 handleChange event 的 e.target.value
  search = text => {
    // 1.copy the Array
    let _products = [...this.state.sourceProducts];
    // 每次 text 有變動時, 都要重抓未被filter過的數組 sourceProducts 來做邏輯判斷

    // 2.filter the Array

    // filter() 會回傳一個陣列，其條件是 return 後方為 true 的物件
    // 滿足 return 條件的 "p物件" 才會被存回 _products[]
    _products = _products.filter(p => {
      // 語法1:
      // const matchArray = p.name.match(new RegExp(text, 'gi'));
      // return matchArray !== null;

      // 語法1.1:
      return p.name.match(new RegExp(text, "gi"));

      // 語法2:
      // return p.name.toLowerCase().indexOf(text.toLowerCase()) > -1
    });

    // 3.set State
    this.setState({
      products: _products
    });
  };

  // 調用者跟彈出層唯一有鏈結的地方, 所以底下要將參數得傳上來透過這裡的 callback()
  toAdd = () => {
    Panel.open({
      component: AddInventory,
      // 會在 Panel.open() 內 綁定到 Panel的 state.callback
      productsCallback: data => {
        if (data) {
          this.add(data);
        }
      }
    });
  };

  add = formData => {
    const _products = [...this.state.products];
    _products.push(formData);

    const _sProducts = [...this.state.sourceProducts];
    _sProducts.push(formData);

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  update = formData => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === formData.id);
    // array 的 index 值為 _index 開始替換, 共替換1個資料, 替換值為 formData
    _products.splice(_index, 1, formData);

    const _sProducts = [...this.state.sourceProducts];
    const _sIndex = _products.findIndex(p => p.id === formData.id);
    _sProducts.splice(_sIndex, 1, formData);

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  // 於 <Product/> 內刪除產品後, 會將該產品的 id 傳出來, 做畫面同步渲染
  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum
    });
  };

  initCartNum = async () => {
    const user = global.auth.getUser() || {};
    // get 請求也可以透過發送參數 params, 來作篩選條件
    const res = await axios.get("/carts", {
      params: {
        userId: user.email
      }
    });
    const carts = res.data || [];
    const cartNum = carts
      .map(cart => cart.mount) // [2, 3, 2]
      .reduce((a, value) => a + value, 0); // a: 是累加器, 分別將 array 內的元素 value 累加到 a, 初始值為 0
    return cartNum;
  };

  render() {
    return (
      <div>
        {/* 將 state.products 傳進<ToolBox/>做搜尋邏輯判斷並修改, 
                    而 state.products 一有變動就會重新渲染UI */}
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          {/* 套用 Bulma -> Columns */}
          <div className="columns is-multiline is-desktop">
            {/* TransitionGroup: <<<< 做動畫的組件 >>>>
                            <TransitionGroup> 會預設一個空的 <div>, 影響我們原本的布局, 需透過 component={null} 將其移除 */}
            <TransitionGroup component={null}>
              {this.state.products.map(p => {
                return (
                  // 注意 這裡是 className"s", 且 product-fade 為動態生成 className 的前綴詞
                  <CSSTransition
                    classNames="product-fade"
                    timeout={{ enter: 300, exit: 300 }}
                    key={p.id}
                  >
                    <div className="column is-3" key={p.id}>
                      <Product
                        product={p}
                        update={this.update}
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          {/* 若getUser有抓到登入者資料, 判斷其 type 值為1(管理者), add按鈕就會被渲染出來 */}
          {(global.auth.getUser() || {}).type === 1 && (
            <button className="button is-primary add-btn" onClick={this.toAdd}>
              add
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Products;
