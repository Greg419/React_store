import React from 'react'
import axios from 'commons/axios'
import { toast } from 'react-toastify';

class AddInventory extends React.Component {

    state = {
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available'
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
            // 將從 <form/> 抓取來的 formData 的資料, 提交到 http://localhost:3003/products
            // 可從.then(res=>{}) 抓到提交完的完整資料 res.data
            if(this.state.name && this.state.price && this.state.image){
                axios.post('products', formData).then(res => {
                    this.props.close(res.data);
                    toast("Add successed!!")
                })
            } else {
                toast.info("欄位資料請勿空白")
            }
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
                <p className="title has-text-centered">Add Inventory</p>
                <form onSubmit={this.submit}>
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
                            <button className="button is-link" name="submit">Submit</button>
                        </div>
                        <div className="control">
                            <button 
                                className="button" 
                                type="button" 
                                onClick={()=>{ 
                                    this.props.close();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="control">
                            <button className="button is-primary" onClick={this.showToast}>ShowToast</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddInventory;