import PricingCard from './PricingCard';

export default function PricingSection() {
    const plans = [
        {
            name: "Basico 1 mes",
            price: "$20.000",
            features: [
                "Acceso a todas las sucursales",
                "Acceso a casilleros",
                "Agua gratis dispensador",
                "Acceso Aplicacion movil",
                "Internet Gratis"
            ]
        },
        {
            name: "Premium 3 meses",
            price: "$50.000",
            features: [
                "todo lo de basico",
                "Acceso a todas las sucursales",
                "Personal trainer",
                "Clases grupales ilimitadas",
                "Nutricionista online",
                "Body composicion analitica",
            ]
        },
        {
            name: "Elite 6 meses",
            price: "$80.000",
            features: [
                "todo lo de premium ",
                "24/7 gym access",
                "Massage therapy sessions",
                "Casilleros privados",
                "Acceso a sauna",
            ]
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Planes</h2>
                    <p className="text-xl text-gray-600">Elige el plan perfecto para tu viaje fitness                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard
                            key={plan.name}
                            plan={plan}
                            isPopular={index === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}