import React, { useEffect, useState } from 'react';
import { getTotalUsersRequest, getPlansRequest, getPlanDineroRequest, getPlansStatsRequest } from '../api/axios';
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, ComposedChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { UsersIcon, ChartBarIcon, CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/24/outline';



const monthlySubscriptions = [
    { month: 'Jan', basic: 400, premium: 300, enterprise: 200 },
    { month: 'Feb', basic: 500, premium: 400, enterprise: 250 },
    { month: 'Mar', basic: 600, premium: 500, enterprise: 300 },
    { month: 'Apr', basic: 550, premium: 450, enterprise: 280 },
    { month: 'May', basic: 700, premium: 600, enterprise: 350 },
    { month: 'Jun', basic: 800, premium: 700, enterprise: 400 },
];

const revenueData = [
    { month: 'Jan', revenue: 25000, subscribers: 900 },
    { month: 'Feb', revenue: 35000, subscribers: 1150 },
    { month: 'Mar', revenue: 45000, subscribers: 1400 },
    { month: 'Apr', revenue: 40000, subscribers: 1280 },
    { month: 'May', revenue: 55000, subscribers: 1650 },
    { month: 'Jun', revenue: 65000, subscribers: 1900 },
];

const COLORS = ['#6A5ACD', '#5F5FAF', '#7A7EFD', '#8A7FF6'];






function StatCard({ title, value, icon: Icon, trend }) {
    const isPositive = trend > 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold mt-1">{value}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                </div>
            </div>
            <div className="mt-4">
                <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
            </div>
        </div>
    );
}

function ChartCard({ children, title }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="h-[300px]">{children}</div>
        </div>
    );
}

const Stats = () => {
    const [subscriptionsByType, setSubscriptionsByType] = useState([]); // Estado para las suscripciones

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPlans, setTotalPlans] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0); // Nuevo estado para dinero ganado este mes
    const [loading, setLoading] = useState(true);
    const [plansLoading, setPlansLoading] = useState(true);
    const [moneyLoading, setMoneyLoading] = useState(true); // Cargando dinero ganado
    const [error, setError] = useState(null);
    const [plansError, setPlansError] = useState(null);
    const [moneyError, setMoneyError] = useState(null); // Error al obtener dinero ganado

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setPlansLoading(true);
                setMoneyLoading(true);

                // Obtener total de usuarios
                const userResponse = await getTotalUsersRequest();
                setTotalUsers(userResponse.data.total.count);  // Accede a 'count' para los usuarios

                // Obtener total de planes activos
                const plansResponse = await getPlansRequest();
                setTotalPlans(plansResponse.data.plans);  // Accede a 'plans' para los planes

                // Obtener el dinero ganado este mes
                const moneyResponse = await getPlanDineroRequest();
                setTotalMoney(moneyResponse.data.dinero);  // Accede al dinero ganado este mes

                setPlansLoading(false);
                setMoneyLoading(false);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setPlansError(error.message);
                setMoneyError(error.message); // Maneja error de dinero ganado
                setLoading(false);
                setPlansLoading(false);
                setMoneyLoading(false);
            }
        };

        fetchStats();
    }, []);
    useEffect(() => {
        const fetchPlansStats = async () => {
            try {
                const statsResponse = await getPlansStatsRequest();
                console.log(statsResponse);  // Verifica toda la respuesta aquí

                // Si los datos para los gráficos están en 'subscriptions'
                if (statsResponse && statsResponse.data && Array.isArray(statsResponse.data.subscriptions)) {
                    const subscriptions = statsResponse.data.subscriptions.map(item => ({
                        name: item.tipo_plan,  // Asegúrate de que 'tipo_plan' sea correcto
                        value: parseInt(item.total_personas, 10),  // Convertir 'total_personas' a número
                    }));
                    setSubscriptionsByType(subscriptions);
                }
            } catch (error) {
                console.error("Error al obtener los datos de los gráficos:", error);
            }
        };

        fetchPlansStats();
    }, []);




    const subscriptionStats = [
        {
            title: 'Usuarios Totales',
            value: loading ? 'Cargando...' : error || totalUsers,
            trend: 12,
            icon: UsersIcon,
        },
        {
            title: 'Planes Activos',
            value: plansLoading ? 'Cargando...' : plansError || totalPlans,
            trend: 8,
            icon: ChartBarIcon,
        },
        {
            title: 'Total generado este mes',
            value: '$' + (moneyLoading ? 'Cargando...' : moneyError || totalMoney),
            trend: 22,
            icon: CurrencyDollarIcon,
        },
        {
            title: 'Total de ingresos',
            value: '$29.80',
            trend: 5,
            icon: CreditCardIcon,
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {subscriptionStats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            trend={stat.trend}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ChartCard title="Distribucion de suscripciones">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subscriptionsByType}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {subscriptionsByType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Suscripciones adqueridas mes a mes">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlySubscriptions}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="basic" stackId="a" fill="#4f46e5" />
                                <Bar dataKey="premium" stackId="a" fill="#3b82f6" />
                                <Bar dataKey="enterprise" stackId="a" fill="#60a5fa" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Revenue & Subscriber Growth">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="revenue" fill="#4f46e5" />
                                <Line yAxisId="right" type="monotone" dataKey="subscribers" stroke="#60a5fa" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Revenue Trend */}
                    <ChartCard title="Monthly Revenue Trend">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="#93c5fd" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
}

export default Stats;
