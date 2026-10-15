import { Clock, ShoppingCart, Users, UserCheck } from 'lucide-react';

const fmt = (n) => Number(n || 0).toLocaleString('en-BD');

export default function StatCards({ summary = {}, loading }) {
  const stats = [
    {
      label: 'Sales Amount',
      value: loading ? '—' : `৳ ${fmt(summary.totalSales)}`,
      icon: Clock,
<<<<<<< HEAD
      gradient: 'linear-gradient(135deg, #111111, #2B2B29)',
=======
      gradient: 'linear-gradient(135deg, #141413, #3D3D3A)',
>>>>>>> e4e6a26886c2b1dccee797f1a0fcc2d93316c974
    },
    {
      label: 'Total Order',
      value: loading ? '—' : fmt(summary.totalOrders),
      icon: ShoppingCart,
<<<<<<< HEAD
      gradient: 'linear-gradient(135deg, #F0B000, #FFD54F)',
      dark: true,
=======
      gradient: 'linear-gradient(135deg, #B87A00, #E09A00)',
>>>>>>> e4e6a26886c2b1dccee797f1a0fcc2d93316c974
    },
    {
      label: 'Total Visitors',
      value: loading ? '—' : fmt(summary.totalVisitors),
      icon: Users,
<<<<<<< HEAD
      gradient: 'linear-gradient(135deg, #1F1F1E, #3A3A37)',
=======
      gradient: 'linear-gradient(135deg, #2B2B29, #5C5C57)',
>>>>>>> e4e6a26886c2b1dccee797f1a0fcc2d93316c974
    },
    {
      label: 'Total Customers',
      value: loading ? '—' : fmt(summary.totalCustomers),
      icon: UserCheck,
<<<<<<< HEAD
      gradient: 'linear-gradient(135deg, #D69A00, #FFC107)',
      dark: true,
=======
      gradient: 'linear-gradient(135deg, #7A5200, #B87A00)',
>>>>>>> e4e6a26886c2b1dccee797f1a0fcc2d93316c974
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`rounded-xl p-4 ${s.dark ? 'text-gray-900' : 'text-white'} flex items-center justify-between shadow`}
          style={{ background: s.gradient }}
        >
          <div>
            <div className={`text-xl font-bold ${loading ? 'animate-pulse' : ''}`}>{s.value}</div>
            <div className="text-sm opacity-90 mt-0.5">{s.label}</div>
          </div>
          <div className="opacity-70">
            <s.icon size={28} />
          </div>
        </div>
      ))}
    </div>
  );
}
