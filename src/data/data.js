import { HiUserAdd, HiClock, HiCheck } from 'react-icons/hi';

//ESTA DATA ES DE EJEMPLO NO SE ESTA USANDO ACTUALMENTE
export const stats = [
    { title: 'Users', value: '2,847', percentage: 12 },
    { title: 'Revenue', value: '46,590', percentage: 8.2 },
    { title: 'Orders', value: '1,234', percentage: 5.4 },
    { title: 'Products', value: '789', percentage: 15.6 },
  ];
  
export const activities = [
    { 
      icon: HiUserAdd, 
      title: 'New user registered', 
      time: '2 minutes ago',
      type: 'success'
    },
    { 
      icon: HiClock, 
      title: 'System update pending', 
      time: '30 minutes ago',
      type: 'warning'
    },
    { 
      icon: HiCheck, 
      title: 'Monthly report generated', 
      time: '1 hour ago',
      type: 'info'
    },
  ];