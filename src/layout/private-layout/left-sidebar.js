import { HomeOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { AuthContext } from 'context/auth-context'
import React, { useContext } from 'react'


const LeftSidebar = () => {
    const { permissions } = useContext(AuthContext);

    const items = [
        {
            label: 'Home',
            path: '/',
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: 'Access Control',
            key: 'access-control',
            icon: <SafetyOutlined />,
            children: [
                {
                    label: 'User',
                    path: '/access-control/user',
                    key: 'user',
                    permission: 'user list',
                },
                {
                    label: 'Role',
                    path: '/access-control/role',
                    key: 'role',
                    permission: 'role list',
                }
            ]
        },
        {
            label: 'Configuration',
            key: 'configuration',
            icon: <SafetyOutlined />,
            children: [
                {
                    label: 'Inventory',
                    key: 'inventory',
                    children: [
                        {
                            label: 'Inventory 1',
                            path: '/configuration/inventory',
                            key: 'inventory-1',
                            permission: 'inventory list',
                        },
                        {
                            label: 'Inventory 2',
                            path: '/configuration/inventory-2',
                            key: 'inventory-2',
                            permission: 'inventory list',
                        },
                    ]
                    
                },
                {
                    label: 'Customer',
                    path: '/configuration/customer',
                    key: 'customer',
                }
            ]
        },
    ]

    const onClick = (e) => {
        console.log('click', e);
    };


    return (
        // This menu is designed to be used for displaying 3 levels
        <Menu
            onClick={(e) => onClick(e)}
            style={{
                width: 256,
                height: '100vh',
            }}
            mode="vertical"
            items={
                // level 1 = root level
                items.map((item, index) => {
                    // console.log(item?.permission, permissions, permissions?.includes(item?.permission));
                    return {
                        ...item,
                        label: <Link to={item?.path}>{item?.label}</Link>,
                        // level 2
                        children: item?.children?.map((l2_item, l2_index) => {
                            // if (l2_item) has permission then check permission exist in permissions array, otherwise return
                            let return_status = 0;
                            if (l2_item?.permission) {
                                if (permissions?.includes(l2_item?.permission)) {
                                    return_status = 1;
                                }
                            }
                            else{
                                return_status = 1;
                            }
                            return return_status && {
                                ...l2_item,
                                label: <Link to={l2_item?.path}>{l2_item?.label}</Link>,
                                // level 3
                                children: l2_item?.children?.map((l3_item, l2_index) => {
                                    // if (l3_item) has permission then check permission exist in permissions array, otherwise return
                                    let return_status = 0;
                                    if (l3_item?.permission) {
                                        if (permissions?.includes(l3_item?.permission)) {
                                            return_status = 1;
                                        }
                                    }
                                    else{
                                        return_status = 1;
                                    }
                                    return return_status && {
                                        ...l3_item,
                                        label: <Link to={l3_item?.path}>{l3_item?.label}</Link>
                                    }
                                })
                            }
                        })
                    }
                })
            }
        >


        </Menu>
    )
};
export default LeftSidebar;