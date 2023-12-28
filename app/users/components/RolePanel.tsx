import { IconCheckbox } from '@/app/components/checkboxes';
import { Stack, Text } from '@chakra-ui/react';
import {
  FiCpu,
  FiDollarSign,
  FiDownload,
  FiGrid,
  FiSettings,
  FiTruck,
  FiUpload,
  FiUsers,
} from 'react-icons/fi';

export default function RolePanel() {
  const roles = [
    { role: 'Admin', displayName: 'Administrator', icon: <FiSettings /> },
    { role: 'Director', displayName: 'Director', icon: <FiUsers /> },
    { role: 'Finance', displayName: 'Finance', icon: <FiDollarSign /> },
    {
      role: 'SalesSpecialist',
      displayName: 'Sales specialist',
      icon: <FiUpload />,
    },
    { role: 'SalesManager', displayName: 'Sales manager', icon: <FiUpload /> },
    {
      role: 'PurchaseSpecialist',
      displayName: 'Purchase specialist',
      icon: <FiDownload />,
    },
    {
      role: 'PurchaseManager',
      displayName: 'Purchase manager',
      icon: <FiDownload />,
    },
    {
      role: 'ProductionPlanner',
      displayName: 'Production planner',
      icon: <FiCpu />,
    },
    {
      role: 'ProductionManager',
      displayName: 'Production manager',
      icon: <FiCpu />,
    },
    {
      role: 'InventorySpecialist',
      displayName: 'Inventory specialist',
      icon: <FiGrid />,
    },
    {
      role: 'InventoryManager',
      displayName: 'Inventory manager',
      icon: <FiGrid />,
    },
    {
      role: 'LogisticsSpecialist',
      displayName: 'Logistics specialist',
      icon: <FiTruck />,
    },
  ];
  return (
    <Stack spacing={5}>
      {roles.map((i) => (
        <IconCheckbox
          key={i.role}
          id={`role-${i.role}`}
          name="roles"
          icon={i.icon}
          value={i.role}
        >
          <Text>{i.displayName}</Text>
        </IconCheckbox>
      ))}
    </Stack>
  );
}
