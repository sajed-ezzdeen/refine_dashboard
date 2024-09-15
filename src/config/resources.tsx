import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";
/**
 * A resource item is an object that contains the following properties:
 *  list: A React component that renders the list view of the resource.
 *  create: A React component that renders the create view of the resource.
 *  edit: A React component that renders the edit view of the resource.
 *  show: A React component that renders the show view of the resource.
 *  icon: A React component that renders the icon of the resource.
 *  delete: A React component that renders the delete view of the resource.
 *  or clone: A React component that renders the clone view of the resource.
 */

export const resources: IResourceItem[] = [
 
    {
        name: 'dashboard', 
        list: '/', 
        meta: {
            label: 'Dashboard', 
            icon: <DashboardOutlined /> 
        }
    }, 

    {
        name: 'companies', 
        list: '/companies', 
        show: '/companies/:id',  
        create: '/companies/new',
        edit: '/companies/edit/:id',
        meta: {
            label: 'Companies', 
            icon: <ShopOutlined /> 
        }


    },

    {
        name: 'tasks', 
        list: '/tasks', 
        create: '/tasks/new',
        edit: '/tasks/edit/:id',
        meta: {
            label: 'Tasks', 
            icon: <ProjectOutlined /> 
        }


    }

    
]