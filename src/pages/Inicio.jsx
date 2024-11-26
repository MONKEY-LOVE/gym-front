import Hero from '../components/Inicio/Hero'
import PricingSection from '../components/Inicio/PricingSection'
import Footer from '../components/Inicio/Footer'


import React from 'react'

const Inicio = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Hero />
            <PricingSection />
            <Footer />
        </div>
    )
}

export default Inicio