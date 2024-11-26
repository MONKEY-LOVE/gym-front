import { FaCheckCircle } from 'react-icons/fa';

export default function PricingCard({ plan, isPopular }) {
    return (
        <div className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${isPopular ? 'border-yellow-500 scale-105' : 'border-gray-100'} relative`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                        MAS POPULAR
                    </span>
                </div>
            )}
            <div className="text-center">
                <h3 className={`text-2xl font-bold mb-4 ${isPopular ? 'text-yellow-500' : ''}`}>
                    {plan.name}
                </h3>
                <div className="text-yellow-500 mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 text-lg">/mes</span>
                </div>
            </div>
            <ul className="space-y-4 mb-8 min-h-[320px]">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`w-full ${isPopular ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-black hover:bg-gray-800'} text-white rounded-lg py-4 font-semibold transition-colors duration-300`}>
                {isPopular ? 'Join Now - Best Value' : 'Join Now'}
            </button>
        </div>
    );
}