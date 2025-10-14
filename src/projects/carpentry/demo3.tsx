import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Tag } from 'lucide-react';

// --- Mock Data (Using 1:1 Aspect Ratio) ---
const MOCK_FEATURED_PIECES = [
  { id: 1, name: "Live Edge Console", tag: "Signature Piece", description: "Dramatic spalted maple with clean black steel frame. A bold statement.", price: 5900, imageUrl: "/assets/carpentry/veronika-fitart-bUmtYSRQpHs-unsplash.webp" },
  { id: 2, name: "Inlaid Cutting Board", tag: "Available Now", description: "Salvaged teak and walnut geometric patterns. Hand-oiled finish.", price: 280, imageUrl: "/assets/carpentry/sergey-kotenev-M8COBu-_Va8-unsplash.webp" },
  { id: 3, name: "Walnut Dining Set", tag: "Commissioned Work", description: "Seating for six, featuring seamless butterfly joinery and a timeless finish. This description is intentionally longer to ensure it hits the two-line limit perfectly.", price: 12500, imageUrl: "/assets/carpentry/costa-live-h_BP6DlGOvo-unsplash.webp" },
  { id: 4, name: "Oak and Steel Chair", tag: "New Design", description: "Ergonomic oak seat with minimalist, matte black steel legs. Sold as a pair.", price: 950, imageUrl: "/assets/carpentry/kelly-miller-BL6XQLZeXpg-unsplash.webp" },
  { id: 5, name: "Reclaimed Wood Credenza", tag: "Best Seller", description: "A floating credenza built from 100-year-old reclaimed barnwood.", price: 4200, imageUrl: "/assets/carpentry/urban-vintage-ynaMTwl3R1A-unsplash.webp" },
  { id: 6, name: "Modern Desk", tag: "Available Now", description: "Clean, floating desktop with integrated cable management. Maple wood.", price: 3100, imageUrl: "/assets/carpentry/thuan-tran-Wmo8hpd9XhI-unsplash.webp" },
];


// --- Utility Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Gallery', href: '#gallery' },
    { name: 'Process', href: '#process' },
    { name: 'Commissions', href: '#commissions' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="#carpentry-demo3" className="text-3xl font-serif font-light text-gray-800 tracking-wider">
              <span className="font-semibold text-amber-700">The</span> Grain Collective
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a key={link.name}  onClick={(event) => event.preventDefault()} href={link.href} className="text-lg text-gray-600 hover:text-amber-700 transition duration-150 font-medium tracking-wide">
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Utility Icons and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:text-amber-700 transition border border-transparent hover:border-amber-700">
              <ShoppingBag className="h-6 w-6" />
            </button>
            
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-amber-700 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-start">
            {navLinks.map(link => (
              // <a key={link.name} href={link.href} className="block w-full p-2 text-base font-medium text-gray-700 hover:bg-amber-50 rounded-md" onClick={() => setIsOpen(false)}></a>
              <a key={link.name} onClick={(event) => event.preventDefault()} href={link.href} className="block w-full p-2 text-base font-medium text-gray-700 hover:bg-amber-50 rounded-md" >
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
  <section className="h-[70vh] bg-white flex items-center shadow-lg mb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-1 gap-12 text-center">
      <div className="py-12">
        <h1 className="text-6xl lg:text-7xl font-sans font-extralight text-gray-900 leading-tight mb-4">
          The Art of the <span className="font-semibold text-amber-700">Grain</span>
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Honest materials, meticulous joinery, and designs built to simplify and elevate the spaces they inhabit.
        </p>
        <a 
          href="#gallery" 
          onClick={(event) => event.preventDefault()}
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gray-800 rounded-full shadow-lg hover:bg-amber-700 transition duration-300 transform hover:scale-[1.02]"
        >
          Explore the Gallery <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  </section>
);

interface ProductCardProps {
  piece: typeof MOCK_FEATURED_PIECES[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ piece }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col">
      
      {/* Image Container with 1:1 Aspect Ratio (w-1, h-1) */}
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100">
        <img 
          src={piece.imageUrl} 
          alt={piece.name} 
          className="w-full h-full object-cover group-hover:opacity-85 transition duration-500" 
          loading="lazy"
          // Adding a fall-back for image errors, though placeholders are used
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = "https://placehold.co/600x600/EAEAEA/808080?text=Image+Unavailable";
          }}
        />
      </div>
      
      {/* Text Content: 
        1. Added 'relative' to make absolute positioning of the action bar work.
        2. Added 'h-[130px]' to fix the content area height (sufficient for title + price + 2 lines description).
        3. Added 'pb-12' to reserve space at the bottom for the absolutely positioned action bar.
      */}
      <div className="relative px-6 py-4 h-[130px] pb-12"> 
        
        {/* Top section with Title and Price */}
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-semibold text-gray-900 leading-snug hover:text-amber-700 transition cursor-pointer">
              {piece.name}
            </h3>
            <span className="text-2xl font-bold text-amber-700">${piece.price.toLocaleString('en-US')}</span>
        </div>
        
        {/* Description: Removed min-h-10. Now relies on the parent's fixed height to enforce uniformity. */}
        <div className="text-sm text-gray-500 overflow-hidden line-clamp-2">
            {piece.description}
        </div>

        {/* Action bar: ABSOLUTELY POSITIONED 
          - Ensures perfect bottom alignment across all cards.
        */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pt-2 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs font-medium uppercase text-gray-500 flex items-center">
              <Tag className="w-3 h-3 mr-1 text-amber-600" /> {piece.tag}
            </span>
            <button className="flex items-center text-sm font-medium text-amber-700 hover:text-gray-900 transition">
              View Details 
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const GalleryGrid = () => (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
            <h2 className="text-5xl font-sans font-light text-gray-900 border-b-2 border-amber-700/50 inline-block pb-2">
              Current Works
            </h2>
            <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
              A curated selection of available pieces and custom commissioned designs.
            </p>
        </header>

        {/* Responsive, Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_FEATURED_PIECES.map((piece) => (
                <ProductCard key={piece.id} piece={piece} />
            ))}
        </div>
    </section>
);

const CallToAction = () => (
    <section id="commissions" className="bg-gray-800 py-20 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className="text-5xl font-serif font-light text-white mb-4">
              Your Vision, Our Craft.
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              We specialize in bringing ambitious furniture concepts to life. Let's start the design process together.
            </p>
            <a 
              href="#contact" 
              onClick={(event) => event.preventDefault()}
              className="inline-flex items-center px-12 py-4 text-lg font-medium rounded-full shadow-2xl text-gray-900 bg-amber-400 hover:bg-amber-300 transition duration-300"
            >
              Start a Commission
            </a>
        </div>
    </section>
);


// --- Main Component ---
const GalleryShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      
      <main>
        <HeroSection />
        <GalleryGrid />
        <CallToAction />
      </main>
      
      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-lg font-semibold text-gray-800 mb-3">The Grain Collective</div>
            <p className="text-sm text-gray-500">Inquiries: studio@graincollective.com</p>
            <p className="text-sm text-gray-500 mt-6">
                &copy; {new Date().getFullYear()} The Grain Collective. All rights reserved. | Built with Respect for Wood.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default GalleryShowcase;
