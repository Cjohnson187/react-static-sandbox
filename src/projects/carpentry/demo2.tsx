import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Hammer, ClipboardList } from 'lucide-react';

// --- Mock Data ---
const MOCK_FEATURED_PIECES = [
  { id: 1, name: "Edge Table", tag: "Signature Piece", description: "A dramatic fusion of spalted maple and steel, perfect for a modern entry. Hand-sanded to a glass-smooth finish.", price: 5900, imageUrl: "/assets/carpentry/veronika-fitart-bUmtYSRQpHs-unsplash.webp" },
  { id: 2, name: "Cutting Board", tag: "Available Now", description: "Inlaid geometric patterns using salvaged teak and walnut. A true conversation starter.", price: 2100, imageUrl: "/assets/carpentry/sergey-kotenev-M8COBu-_Va8-unsplash.webp" },
];

// --- Utility Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Featured Work', href: '#featured' },
    { name: 'Custom Orders', href: '#custom' },
    { name: 'The Craft', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-sm shadow-md border-b border-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            {/* Using a mix of serif/sans-serif for artistic feel */}
            <a href="#" onClick={(event) => event.preventDefault()} className="text-3xl font-serif font-extrabold text-amber-300 tracking-wider">
              WOOD & GRAIN
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={(event) => event.preventDefault()} className="text-lg text-stone-300 hover:text-amber-300 transition duration-150 font-light tracking-wide">
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Utility Icons */}
          <div className="flex items-center space-x-6">
            <button className="p-2 rounded-full text-stone-400 hover:text-amber-300 transition">
              <ShoppingCart className="h-6 w-6" />
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-stone-400 hover:text-amber-300 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-800 border-t border-stone-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={(event) => event.preventDefault()} className="block w-full p-2 text-base font-medium text-stone-300 hover:bg-stone-700 hover:text-white rounded-md">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="relative h-[85vh] bg-stone-900 flex items-center shadow-inner">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-30" 
      // Background image suggesting a workshop or raw material
      style={{
        backgroundImage: `url("/assets/carpentry/ricky-kharawala-4dVDBMAho8c-unsplash.webp")`,
      }}
    />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
      {/* Narrative Text Block */}
      <div className="text-left py-12">
        <p className="text-lg uppercase tracking-widest text-amber-400 mb-2 font-medium">Artisanal Craftsmanship</p>
        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
          Furniture with a <span className="text-amber-300 italic">History</span>, Built for the Future.
        </h1>
        <p className="text-xl text-stone-300 mb-8 max-w-md">
          We honor the material by hand-selecting every slab and using traditional joinery methods that define heirloom quality.
        </p>
        <a 
          href="#featured" 
          onClick={(event) => event.preventDefault()}
          className="inline-flex items-center justify-center px-10 py-4 border-2 border-amber-300 text-lg font-semibold rounded-lg shadow-xl text-amber-300 hover:bg-amber-300 hover:text-stone-900 transition duration-300"
        >
          View Our Featured Works
        </a>
      </div>

      {/* Decorative Image/Shape (Optional) */}
      <div className="hidden md:flex justify-end">
        {/* Placeholder for an artistic logo or simple geometric wood element */}
        <div className="w-64 h-64 bg-amber-900/50 rounded-tl-[50%] rounded-br-[50%] animate-pulse"></div>
      </div>
    </div>
  </section>
);

interface FeaturedPieceProps {
  piece: typeof MOCK_FEATURED_PIECES[0];
  isReversed: boolean;
}

const FeaturedPiece: React.FC<FeaturedPieceProps> = ({ piece, isReversed }) => {
  const imageOrder = isReversed ? 'md:order-last' : 'md:order-first';
  const textOrder = isReversed ? 'md:order-first' : 'md:order-last';

  return (
    // Outer div provides full-width background color and vertical padding
    <div className={`py-16 md:py-24 ${isReversed ? 'bg-stone-800' : 'bg-stone-700'}`}>
      {/* Inner container centers content and applies horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Grid layout for the content - Now balanced by image height */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center`}>
          
          {/* Image Block: md:col-span-7 - FIXED HEIGHT ADDED FOR CONSISTENCY */}
          <div className={`md:col-span-7 rounded-2xl overflow-hidden shadow-2xl ${imageOrder} h-96 md:h-[30rem]`}>
            <img 
              src={piece.imageUrl} 
              alt={piece.name} 
              // IMPORTANT: h-full w-full object-cover ensures image fills the fixed 30rem height container
              className="w-full h-full object-cover transition duration-500 hover:scale-[1.02] cursor-pointer" 
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = 'https://placehold.co/900x600/2A201C/E8D5C4?text=Image+Loading+Error';
              }}
            />
          </div>
          
          {/* Text Block: md:col-span-5. Padding is inherited from the main container above. */}
          <div className={`md:col-span-5 ${textOrder}`}> 
            <p className="text-sm uppercase tracking-widest text-amber-400 mb-2">{piece.tag}</p>
            <h3 className="text-4xl font-serif font-bold text-white mb-4 leading-snug">{piece.name}</h3>
            <p className="text-stone-300 text-lg mb-6">{piece.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-amber-300">${piece.price.toLocaleString('en-US')}</span>
            </div>
            <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-stone-900 text-lg font-semibold py-3 px-8 rounded-full transition duration-150 shadow-lg hover:shadow-xl">
              <ShoppingCart className="w-5 h-5 mr-3" /> Inquire / Purchase
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const StudioShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-900 font-sans text-stone-100">
      <Header />
      
      <main>
        <HeroSection />

        {/* Collection Header (Needs its own centered wrapper) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center pt-20 pb-10">
            <h2 className="text-5xl font-serif font-bold text-white">
              The Collection
            </h2>
            <p className="text-xl text-stone-400 mt-4 max-w-2xl mx-auto">
              Each piece is an individual expression of grain, form, and function.
            </p>
          </header>
        </div>
        
        {/* Featured Pieces Section (Now full-width, as padding is internal to the component) */}
        <section id="featured">
          {/* Asymmetrical Featured Pieces */}
          {MOCK_FEATURED_PIECES.map((piece, index) => (
            <FeaturedPiece 
              key={piece.id} 
              piece={piece} 
              isReversed={index % 2 !== 0} // Alternate layout for visual interest
            />
          ))}
        </section>


        {/* Call to Action for Custom Orders */}
        <section id="custom" className="bg-stone-900 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center border-2 border-dashed border-amber-500/50 p-10 rounded-xl">
            <ClipboardList className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Dreaming of a Custom Creation?
            </h3>
            <p className="text-lg text-stone-300 mb-8">
              The majority of my work is custom-commissioned. I partner with clients from initial concept sketches to final builds.
            </p>
            <a 
              href="#contact" 
              onClick={(event) => event.preventDefault()}
              className="inline-flex items-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-2xl text-stone-900 bg-amber-400 hover:bg-amber-300 transition duration-300 transform hover:scale-105"
            >
              <Hammer className="w-5 h-5 mr-3" /> Contact Me
            </a>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-stone-500 text-sm">
          &copy; {new Date().getFullYear()} Wood & Grain. All rights reserved. | Handcrafted. Designed to Last.
        </div>
      </footer>
    </div>
  );
};

export default StudioShowcase;
