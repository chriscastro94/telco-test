import { INavData } from '@coreui/angular';
 
export const navItems: INavData[] = [

  {
    name: 'Administración',
    url: '/admin',
    icon: 'fa fa-thumb-tack',
    children: [
      {
        name: 'Usuarios',
        url: '/admin/usuarios',
        icon: 'fa fa-thumb-tack',
      },
      {
        name: 'Roles',
        url: '/admin/roles',
        icon: 'fa fa-thumb-tack',
      },
      {
        name: 'Aplicaciones',
        url: '/admin/aplicaciones',
        icon: 'fa fa-thumb-tack',
      }]
  }
];
