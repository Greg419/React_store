import React from 'react'
import Products from 'components/Products'
import Layout from 'Layout'

class App extends React.Component{
    render() {
        return (
            // Layout.js: 公版佈局
            <Layout>
                <Products/>
            </Layout>
        );
    }
}
export default App;