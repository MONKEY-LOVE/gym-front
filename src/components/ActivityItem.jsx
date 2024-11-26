export default function ActivityItem({ icon: Icon, title, time, type }) {
  const colors = {
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    info: 'bg-primary-100 text-primary-600',
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-150">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${colors[type]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
      <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-150">
        View
      </button>
    </div>
  );
}