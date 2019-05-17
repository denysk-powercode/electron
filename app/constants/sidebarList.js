import routes from './routes';

const sidebarList = [
  {
    name: 'transactions',
    label: 'Transactions',
    route: routes.TRANSACTIONS,
  },
  {
    name: 'clients',
    label: 'Clients',
    route: routes.CLIENTS,
  },
  {
    name: 'materials',
    label: 'Materials',
    route: routes.MATERIALS,
  },
  {
    name: 'paydesk',
    label: 'Paydesk',
    route: routes.PAYDESK,
  },
  {
    name: 'users',
    label: 'Home',
    route: routes.USERS,
  },
];

export default sidebarList;
