import { Mail, Calendar, Users, Briefcase } from 'lucide-react';

// --- Color Palette and Configuration (Option 3: Minimalist & Trustworthy) ---
// Primary: Charcoal Gray (#333333) - Authority, Text
// Secondary: Soft Lavender/Muted Blue (#8E9AAF) - Calm, Subtle Accent
// Background: Creamy White (#F9F9F9) - Clean, Non-sterile white

const CHARCOAL = '#333333';
const LAVENDER = '#8E9AAF';
const CREAM = '#F9F9F9';

// Hero Image Placeholder (using a simple, elegant visual)
const HeroImage = () => (
    <div className="h-96 w-full rounded-lg shadow-md overflow-hidden bg-gray-100">
        <div className="flex items-center justify-center h-full bg-cover bg-center"
             style={{ backgroundImage: `url('https://placehold.co/800x600/${CHARCOAL.substring(1)}/${LAVENDER.substring(1)}?text=SOPHISTICATED+SPACE')` }}>
        </div>
    </div>
);

// Main Application Component
const OnwardCounseling3 = () => {
    return (
        <div className="min-h-screen font-sans" style={{backgroundColor: CREAM}}>
            <Header />
            <main className="pt-24"> {/* Adjusted padding for larger header */}
                <HomePage />
            </main>
            <Footer />
        </div>
    );
};

// 1. Header Component
const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm" style={{backgroundColor: CREAM}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-5xl font-extralight" style={{color: CHARCOAL}}>O</span>
                <span className="text-2xl font-light tracking-widest uppercase" style={{color: CHARCOAL}}>Onward Counseling</span>
            </div>
            
            {/* Navigation (Hidden on small screens) */}
            <nav className="hidden md:flex space-x-10 font-medium uppercase text-sm">
                <a href="#home" className="text-gray-600 hover:opacity-75 transition duration-150" style={{color: CHARCOAL}}>Home</a>
                <a href="#focus" className="text-gray-600 hover:opacity-75 transition duration-150" style={{color: CHARCOAL}}>Focus Areas</a>
                <a href="#about" className="text-gray-600 hover:opacity-75 transition duration-150" style={{color: CHARCOAL}}>About</a>
                <a href="#contact" className="text-gray-600 hover:opacity-75 transition duration-150" style={{color: CHARCOAL}}>Contact</a>
            </nav>

            {/* CTA Button - Outline style for minimalism */}
            <a 
                href="#" 
                className="px-6 py-2 rounded-full font-semibold border-2 uppercase text-sm hover:opacity-80 transition duration-200"
                style={{borderColor: LAVENDER, color: LAVENDER}}
            >
                Book
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
    <section id="home" className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-16 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold uppercase leading-tight" style={{color: CHARCOAL}}>
                Navigating Change. <br className="hidden sm:inline" />
                <span style={{color: LAVENDER}}>Grounded Counseling</span> for Adults.
            </h1>
            <p className="text-xl text-gray-700 font-light max-w-lg">
                Offering a secure, collaborative, and non-judgmental space to manage **stress, burnout, and complex life transitions**.
            </p>
            <div className="flex space-x-4 pt-4">
                <a 
                    href="#" 
                    className="px-8 py-3 text-lg rounded-full font-bold uppercase transition duration-200 shadow-md"
                    style={{backgroundColor: LAVENDER, color: 'white'}} 
                >
                    Start Your Journey
                </a>
                <a 
                    href="#focus" 
                    className="px-8 py-3 text-lg rounded-full font-semibold uppercase border-2 transition duration-200" 
                    style={{borderColor: CHARCOAL, color: CHARCOAL}}
                >
                    Our Approach
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
    <section id="focus" className="py-24 mt-20" style={{backgroundColor: CHARCOAL}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold uppercase text-white mb-4">Focusing on Where You Are Going</h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto font-light" style={{color: CREAM}}>
                We utilize mindfulness and evidence-based techniques to address the core challenges of modern adult life.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {focusAreas.map((item, index) => (
                    <div key={index} 
                        className="p-8 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4"
                        style={{backgroundColor: CREAM, borderColor: LAVENDER}}
                    > 
                        <item.icon className="w-10 h-10 mx-auto mb-4" style={{color: LAVENDER}} />
                        <h3 className="text-xl font-semibold uppercase mb-3 tracking-wider" style={{color: CHARCOAL}}>{item.title}</h3> 
                        <p className="text-gray-600 font-light">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 2.3 Testimonial Section
const TestimonialSection = () => {
    const testimonials = [
        "\"The change in my outlook after a few months was incredible. I finally feel equipped to handle pressure and move forward.\"",
        "\"Spenser's approach is grounded and practical. It helped me navigate a huge career transition without losing myself in the process.\"",
    ];
    return (
        <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold uppercase" style={{color: CHARCOAL}}>Voices of Progress</h2> 
                <p className="text-lg text-gray-600 font-light">Hear from clients who have found their way forward.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
                {testimonials.map((quote, index) => (
                    <div key={index} 
                        className="p-8 rounded-lg shadow-xl"
                        style={{backgroundColor: CREAM, border: `1px solid ${LAVENDER}`}}
                    > 
                        <p className="text-2xl italic leading-relaxed mb-4" style={{color: CHARCOAL}}>
                            {quote}
                        </p>
                        <p className="text-right font-medium text-sm pt-2" style={{color: LAVENDER}}>- Client (Anonymized)</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// 2.4 Final Call-to-Action Banner
const CtaBanner = () => (
    <section className="py-20 text-center" style={{backgroundColor: LAVENDER}}> 
        <h2 className="text-4xl font-bold text-white mb-4 uppercase">Ready for your next step?</h2>
        <p className="text-xl text-white mb-10 font-light">
            Schedule a free, confidential 15-minute consultation to see if we're the right fit.
        </p>
        <a 
            href="#" 
            className="inline-block px-10 py-4 text-xl rounded-full font-bold uppercase shadow-xl transition duration-200" 
            style={{backgroundColor: CHARCOAL, color: CREAM}}
        >
            Book a Free Consultation Today
        </a>
    </section>
);

// 3. Footer Component
const Footer = () => (
    <footer className="py-10 text-sm" style={{backgroundColor: CHARCOAL, color: CREAM}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-light">&copy; {new Date().getFullYear()} Onward Counseling. All Rights Reserved.</p>
            <div className="flex space-x-6">
                <a href="#" className="hover:opacity-75 transition duration-150">Privacy Policy</a>
                <a href="#" className="hover:opacity-75 transition duration-150">Terms of Service</a>
                <a href="mailto:contact@onwardcounseling.com" className="hover:opacity-75 transition duration-150 flex items-center">
                    <Mail className="w-4 h-4 mr-1" style={{color: LAVENDER}} /> Contact Us
                </a>
            </div>
        </div>
    </footer>
);

export default OnwardCounseling3;
