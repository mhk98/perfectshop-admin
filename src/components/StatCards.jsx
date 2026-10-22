import { Clock, ShoppingCart, Users, UserCheck } from 'lucide-react';

const fmt = (n) => Number(n || 0).toLocaleString('en-BD');

export default function StatCards({ summary = {}, loading }) {
  const stats = [
    {
      label: 'Sales Amount',
      value: loading ? '—' : `৳ ${fmt(summary.totalSales)}`,
      icon: Clock,
      gradient: 'linear-gradient(135deg, #111111, #2B2B29)',
    },
    {
      label: 'Total Order',
      value: loading ? '—' : fmt(summary.totalOrders),
      icon: ShoppingCart,
      gradient: 'linear-gradient(135deg, #F0B000, #FFD54F)',
      dark: true,
    },
    {
      label: 'Total Visitors',
      value: loading ? '—' : fmt(summary.totalVisitors),
      icon: Users,
      gradient: 'linear-gradient(135deg, #1F1F1E, #3A3A37)',
    },
    {
      label: 'Total Customers',
      value: loading ? '—' : fmt(summary.totalCustomers),
      icon: UserCheck,
      gradient: 'linear-gradient(135deg, #D69A00, #FFC107)',
      dark: true,
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
