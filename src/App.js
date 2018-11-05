import React, { Component } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import AdminTree from './Components/Trees/AdminTree';
import LeftSideTree from './Components/Trees/LeftSideTree';

class App extends Component {
  render() {
    return (
      <Layout>
        <div className="row p-3">
          <div className="col-2">
            <LeftSideTree />
          </div>
          <div className="col-10">
            <div className="offset-md-4 h-50">
              <AdminTree />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;
