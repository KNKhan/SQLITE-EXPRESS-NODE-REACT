import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, QuestionCircleOutlined, ContactsOutlined } from '@ant-design/icons';
import './MainLayout.less';

const { Footer, Sider } = Layout;

const rootRoutes = ['/'];
const aboutSubRoutes = [];

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { children } = this.props;
    return (
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          {collapsed ? <div className="logo">K</div> : <div className="logo">Khadar Khan</div>}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[
              aboutSubRoutes.includes(window.location.pathname)
                ? '1'
                : rootRoutes.indexOf(window.location.pathname).toString(),
            ]}
          >
            <Menu.Item key="0">
              <Link to="/">
                <HomeOutlined />
                <span className="menu-item-link">Users</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {children}
          <Footer>
            Node - SQLite - Express - React 
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
