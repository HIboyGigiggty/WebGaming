import React, { useState,useEffect } from 'react';
import {
    CaretRightOutlined,
  CaretLeftOutlined,
  UserOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import TicGame from "../compements/ticTacToe.js"
import BakGame from "../compements/backgammon.js"
import { Layout, Menu, Button, theme } from 'antd';
import "../CSS/gamelist.css";
import Gomoku from '../compements/gomoka.js';
import Uspace from '../compements/space.js';


const { Header, Sider, Content } = Layout;


const Glist = () => {
    const [selectKey,setKey] =useState("1")

    const [collapsed, setCollapsed] = useState(false);

    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
      document.title="games"
    }, []);
function getItemK(e){
   setKey(e.key)
};


    return (
      
      <Layout>
        <meta title='games'/>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: '个人中心',
              },
              {
                key: '2',
                icon: <RocketOutlined />,
                label: '井字棋',
                children:null
              },
              {
                key: '3',
                icon: <RocketOutlined />,
                label: '五子棋',
              },
              {
                key: '4',
                icon: <RocketOutlined />,
                label: '躲避棋',
              }
            ]}
            onClick={getItemK}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectKey ==="1"&&<Uspace/>}
            {selectKey ==="2"&&<TicGame/>}
            {selectKey ==="3"&&<Gomoku/>}
            {selectKey ==="4" &&<BakGame/>}
          </Content>
        </Layout>
      </Layout>

    );
  };
  export default Glist;
  