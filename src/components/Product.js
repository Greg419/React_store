import React from "react";
import axios from "commons/axios";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { formatPrice } from "commons/helper";
import Panel from "components/Panel";
import EditInventory from "components/EditInventory";
// import Products from './Products';

class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete
      },
      productsCallback: data => {
        if (data) {
          // 會在 Panel.open() 內 綁定到 Panel的 state.callback
          this.props.update(data);
        }
      }
    });
  };

  addCart = async () => {
    const user = global.auth.getUser() || {};
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.info("Please Login First");
      return;
    }
    try {
      const { id, name, image, price } = this.props.product;
      // 將 carts[] 內每個 elem 的 productId 與此 product id 比對,
      // 若有回傳表示此 product 為第二筆後的同商品
      const res = await axios.get(`/carts?productId=${id}&&userId=${user.email}`);
      const carts = res.data;
      // carts[]已存在同個商品. 則 mount +1
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.mount += 1;
        await axios.put(`carts/${cart.id}`, cart); // 根據 cart.id, 將加過 mount 的 cart 資料寫回 carts[]
      } else {
        // 否則新添第一筆 product 到 carts[]
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
          userId: user.email
        };
        await axios.post("/carts", cart);
      }
      toast.success("Add cart successed!");
      // 狀態提升: 透過父組件 function: updateCartNum(), 修改父組件 <Products/> 的 state.cartNum, 達到同步渲染兄弟組件 <ToolBox/> 的畫面
      this.props.updateCartNum();
    } catch (error) {
      toast.error("Add cart failed!");
    }
  };

  renderManagerBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right">
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h" onClick={this.toEdit}></i>
          </span>
        </div>
      );
    }
  };

  render() {
    // 獲取上層傳入的產品資訊
    const { name, image, tags, price, status } = this.props.product;

    const _pClass = {
      available: "product",
      unavailable: "product out-stock"
    };
    return (
      // 依 status 決定, 是否加上 "out-stock" 的 class 值
      <div className={_pClass[status]}>
        <div className="p-content">
          {/* 管理者編輯商品 Icon, 登入者為Manager才會被渲染出來 */}
          {this.renderManagerBtn()}
          <div className="img-wrapper">
            {/* out-stock-text 要在 _pClass值為 'product out-stock'時才會被css拉到上層 */}
            <div className="out-stock-text">Out of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt={name} />
            </figure>
          </div>
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        <div className="p-footer">
          <p className="price">{formatPrice(price)}</p>
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
