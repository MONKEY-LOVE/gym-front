import { HiUsers, HiCurrencyDollar, HiShoppingCart, HiCollection } from 'react-icons/hi';

const icons = {
  Usuarios: HiUsers,
  Ganancias: HiCurrencyDollar,
  Orders: HiShoppingCart,
  Products: HiCollection,
};

const colors = {
  Usuarios: 'from-primary-400 to-primary-600',
  Ganancias: 'from-secondary-400 to-secondary-600',
  Orders: 'from-green-400 to-green-600',
  Products: 'from-orange-400 to-orange-600',
};

export default function StatsCard({ title, value, percentage }) {
  const Icon = icons[title];

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">
            {title === 'Revenue' ? '$' : ''}{value}
          </p>
        </div>
        <div className={`bg-gradient-to-br ${colors[title]} p-4 rounded-xl`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}