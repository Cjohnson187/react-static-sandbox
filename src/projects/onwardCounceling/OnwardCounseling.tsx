import { Mail, Calendar, Users, Briefcase } from 'lucide-react';

// --- Color Palette and Configuration ---
// Primary: Teal (#1D4A47) - Trust, stability
// Secondary: Copper (#C87E5A) - Warmth, movement
// Background: Cream (#F3F3F3)

// Hero Image Placeholder (using a natural, calm visual)
const HeroImage = () => (
    <div className="bg-gray-300 h-96 w-full rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-center h-full bg-cover bg-center"
             style={{ backgroundImage: "url('https://placehold.co/800x600/b3c6c9/1D4A47?text=Grounded+Comfort')" }}>
        </div>
    </div>
);

// Main Application Component (equivalent to App.js rendering the HomePage)
const OnwardCounseling = () => {
    return (
        <div className="min-h-screen bg-[#F3F3F3] font-sans">
            <Header />
            <main className="pt-20"> {/* Padding for fixed header */}
                <HomePage />
            </main>
            <Footer />
        </div>
    );
};

// 1. Header Component
const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-4xl text-[#1D4A47] font-bold">O</span>
                <span className="text-2xl font-semibold text-gray-800 tracking-wider">Onward Counseling</span>
            </div>
            
            {/* Navigation (Hidden on small screens, simplified here) */}
            <nav className="hidden md:flex space-x-8">
                <a href="#onward-counseling" className="text-gray-600 hover:text-[#1D4A47] transition duration-150">Home</a>
                <a href="#onward-counseling" className="text-gray-600 hover:text-[#1D4A47] transition duration-150">Our Focus</a>
                <a href="#onward-counseling" className="text-gray-600 hover:text-[#1D4A47] transition duration-150">About</a>
                <a href="#onward-counseling" className="text-gray-600 hover:text-[#1D4A47] transition duration-150">Contact</a>
            </nav>

            {/* CTA Button */}
            <a 
                href="#onward-counseling" 
                className="px-6 py-2 rounded-full text-white font-semibold bg-[#C87E5A] hover:bg-[#A36A4C] transition duration-200 shadow-md"
            >
                Book Consultation
            </a>
        </div>
    </header>
);

// 2. Home Page Content
const HomePage = () => {
    return (
        <>
            <HeroSection />
            <CoreFocusSection />
            <TestimonialSection />
            <CtaBanner />
        </>
    );
};

// 2.1 Hero Section
const HeroSection = () => (
    <section id="home" className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1D4A47] leading-tight">
                Navigating Change. <br className="hidden sm:inline" />
                <span className="text-[#C87E5A]">Grounded Counseling</span> for Adults.
            </h1>
            <p className="text-xl text-gray-700">
                Offering secure and collaborative therapy to help you manage **life transitions, stress, and burnout**, and move toward a stronger, more purposeful future.
            </p>
            <div className="flex space-x-4">
                <a 
                    href="#onward-counseling" 
                    className="px-8 py-3 text-lg rounded-full text-white font-bold bg-[#C87E5A] hover:bg-[#A36A4C] transition duration-200 shadow-lg"
                >
                    Start Your Journey
                </a>
                <a 
                    href="#onward-counseling" 
                    className="px-8 py-3 text-lg rounded-full text-[#1D4A47] border-2 border-[#1D4A47] hover:bg-[#1D4A47] hover:text-white transition duration-200 font-semibold"
                >
                    Learn Our Approach
                </a>
            </div>
        </div>
        <HeroImage />
    </section>
);

// 2.2 Core Focus Section (The "Why" Section)
const focusAreas = [
    { icon: Briefcase, title: 'Career & Burnout', description: 'Find balance and rediscover purpose in high-stress professional lives.' },
    { icon: Users, title: 'Relationships & Transitions', description: 'Process major life shifts, like divorce, loss, or new beginnings, with resilience.' },
    { icon: Calendar, title: 'Anxiety & Stress Management', description: 'Develop concrete tools to manage daily anxiety and overcome feeling overwhelmed.' },
];

const CoreFocusSection = () => (
    <section id="focus" className="bg-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-[#1D4A47] mb-4">Focusing on Where You Are Going</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Our approach is rooted in mindfulness and evidence-based techniques to address the core challenges facing modern adults.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {focusAreas.map((item, index) => (
                    <div key={index} className="bg-[#F3F3F3] p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-[#C87E5A]">
                        <item.icon className="w-10 h-10 text-[#C87E5A] mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-[#1D4A47] mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 2.3 Testimonial Section
const testimonials = [
    "\"The change in my outlook after a few months was incredible. I finally feel equipped to handle pressure and move forward.\"",
    "\"Spenser's approach is grounded and practical. It helped me navigate a huge career transition without losing myself in the process.\"",
];

const TestimonialSection = () => (
    <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1D4A47]">Voices of Progress</h2>
            <p className="text-lg text-gray-600">Hear from clients who have found their way forward.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((quote, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-[#C87E5A]">
                    <p className="text-2xl italic text-gray-700 leading-relaxed mb-4">
                        {quote}
                    </p>
                    <p className="text-right font-semibold text-[#1D4A47]">- Client (Anonymized)</p>
                </div>
            ))}
        </div>
    </section>
);

// 2.4 Final Call-to-Action Banner
const CtaBanner = () => (
    <section className="bg-[#1D4A47] py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready for your next step?</h2>
        <p className="text-xl text-[#BFC9CA] mb-8">
            Schedule a free, confidential 15-minute consultation to see if we're the right fit.
        </p>
        <a 
            href="#onward-counseling" 
            className="inline-block px-10 py-4 text-xl rounded-full text-white font-bold bg-[#C87E5A] hover:bg-[#A36A4C] transition duration-200 shadow-xl"
        >
            Book a Free Consultation Today
        </a>
    </section>
);

// 3. Footer Component
const Footer = () => (
    <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>&copy; {new Date().getFullYear()} Onward Counseling. All Rights Reserved.</p>
            <div className="flex space-x-6">
                <a href="#onward-counseling" className="hover:text-[#C87E5A] transition duration-150">Privacy Policy</a>
                <a href="#onward-counseling" className="hover:text-[#C87E5A] transition duration-150">Terms of Service</a>
                <a href="mailto:contact@onwardcounseling.com" className="hover:text-[#C87E5A] transition duration-150 flex items-center">
                    <Mail className="w-4 h-4 mr-1" /> Contact Us
                </a>
            </div>
        </div>
    </footer>
);

export default OnwardCounseling;
