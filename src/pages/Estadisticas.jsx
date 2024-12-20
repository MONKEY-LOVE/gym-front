import React, { useEffect, useState } from 'react';
import { getTotalUsersRequest, getPlansRequest, getPlanDineroRequest, getPlansStatsRequest } from '../api/axios';
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, ComposedChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { UsersIcon, ChartBarIcon, CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/24/outline';



const suscripcionesMensuales = [
    { mes: 'Ene', mensual: 400, Trimestral: 300, Semestral: 200, Anual: 100 },
    { mes: 'Feb', mensual: 500, Trimestral: 400, Semestral: 250, Anual: 150 },
    { mes: 'Mar', mensual: 600, Trimestral: 500, Semestral: 300, Anual: 200 },
    { mes: 'Abr', mensual: 550, Trimestral: 450, Semestral: 280, Anual: 180 },
    { mes: 'May', mensual: 700, Trimestral: 600, Semestral: 350, Anual: 250 },
    { mes: 'Jun', mensual: 800, Trimestral: 700, Semestral: 400, Anual: 300 },
    { mes: 'Jul', mensual: 750, Trimestral: 650, Semestral: 380, Anual: 280 },
    { mes: 'Ago', mensual: 770, Trimestral: 690, Semestral: 390, Anual: 290 },
    { mes: 'Sep', mensual: 720, Trimestral: 680, Semestral: 370, Anual: 270 },
    { mes: 'Oct', mensual: 740, Trimestral: 700, Semestral: 380, Anual: 280 },
    { mes: 'Nov', mensual: 760, Trimestral: 710, Semestral: 400, Anual: 300 },
    { mes: 'Dic', mensual: 800, Trimestral: 750, Semestral: 420, Anual: 320 },
];


const Talleres = [
    { mes: 'Ene', cardio: 40, boxeo: 30, Yoga: 20 },
    { mes: 'Feb', cardio: 50, boxeo: 40, Yoga: 25 },
    { mes: 'Mar', cardio: 60, boxeo: 50, Yoga: 30 },
    { mes: 'Abr', cardio: 55, boxeo: 40, Yoga: 28 },
    { mes: 'May', cardio: 70, boxeo: 10, Yoga: 35 },
    { mes: 'Jun', cardio: 80, boxeo: 20, Yoga: 40 },
    { mes: 'Jul', cardio: 75, boxeo: 50, Yoga: 38 },
    { mes: 'Ago', cardio: 77, boxeo: 60, Yoga: 39 },
    { mes: 'Sep', cardio: 72, boxeo: 60, Yoga: 37 },
    { mes: 'Oct', cardio: 74, boxeo: 70, Yoga: 38 },
    { mes: 'Nov', cardio: 76, boxeo: 71, Yoga: 400 },
    { mes: 'Dic', cardio: 8, boxeo: 70, Yoga: 42 },
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
                setTotalUsers(userResponse.data.total.count);

                // Obtener total de planes activos
                const plansResponse = await getPlansRequest();
                setTotalPlans(plansResponse.data.plans);

                // Obtener el dinero ganado este mes
                const moneyResponse = await getPlanDineroRequest();
                setTotalMoney(moneyResponse.data.dinero);

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
                        name: item.tipo_plan,
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
            value: '$1.010.000',
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
                            <BarChart data={suscripcionesMensuales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="mensual" stackId="a" fill="#4f46e5" />
                                <Bar dataKey="Trimestral" stackId="a" fill="#3b82f6" />
                                <Bar dataKey="Semestral" stackId="a" fill="#60a5fa" />
                                <Bar dataKey="Anual" stackId="a" fill="#93c5fd" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Crecimiento de ingresos y suscriptores">
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
                    <ChartCard title="Tendencia de ingresos mensuales">
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

                    {/* Talleres */}
                    <ChartCard tittle="Talleres mas solicitados">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Talleres}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cardio" stackId="a" fill="#4f46e5" />
                                <Bar dataKey="boxeo" stackId="a" fill="#3b82f6" />
                                <Bar dataKey="yoga" stackId="a" fill="#60a5fa" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
}

export default Stats;
