import React from 'react'
import axios from 'commons/axios'
import { toast } from 'react-toastify';
// import Products from './Products';

class EditInventory extends React.Component {

    state = {
        id: '', 
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available'
    }

    componentDidMount(){
        const { id, name, image, tags, price, status } = this.props.product;

        this.setState({
            // id: id, name: name, ... 
            id, name, image, tags, price, status
        });
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }

    submit = e => {
        e.preventDefault();
        const formData = {...this.state}
        // TODO: read for axios.put 語法
        // 將 formData 根據 state.id 寫回 localhost:3003/products
        axios.put(`products/${this.state.id}`, formData).then(res => {
            console.log(res.data);
            this.props.close(res.data);
            toast("Edit successed!!");
        })
    }

    onDelete = () => {
        // 根據 state.id 刪除 localhost:3003/products 裡對應的資料
        axios.delete(`products/${this.state.id}`).then(res => {
            // 刪除資料後, 將id pass 到 Products, 讓其對畫面同步渲染:移除此產品
            this.props.deleteProduct(this.state.id);
            this.props.close();
            toast.success("Delete successed!!");
        })
    }

    // for Demo Toastify effection
    showToast = () => {
        toast("Default");
        toast.info("Info");
        toast.success("Success");
        toast.warning("Warning");
        toast.error("Error");
    }

    render(){
        return (
            <div className="inventory">
                <p className="title has-text-centered">Edit Inventory</p>
                <form>
                    <div className="field">
                        <div className="control">
                            <label className="label">Name</label>
                            <textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Price</label>
                            <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Tags</label>
                            <input type="text" className="input" name="tags" value={this.state.tags} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Status</label>
                            <div className="select is-fullwidth">
                                <select name="status" value={this.state.status} onChange={this.handleChange}>
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link" name="submit" onClick={this.submit}>Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-danger" type="button" onClick={this.onDelete}>Delete</button>
                        </div>
                        <div className="control">
                            <button className="button" type="button" onClick={()=>{this.props.close()}}>Cancel</button>
                        </div>
                        <div className="control">
                            <button className="button is-primary" type="button" onClick={this.showToast}>ShowToast</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditInventory;