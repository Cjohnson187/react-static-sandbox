import React, { useState } from 'react';
import { ShoppingCart, Menu, X, DollarSign, Rss } from 'lucide-react';

// --- Mock Data ---
const MOCK_PRODUCTS = [
  { id: 1, name: "Signature Walnut Dining Table", description: "Minimalist slab design, seats 8. Our centerpiece.", price: 4200, imageUrl: "https://placehold.co/600x400/4E342E/FBE3B8?text=Walnut+Table" },
  { id: 2, name: "Oak Office Desk", description: "Integrated cable management, solid oak.", price: 2850, imageUrl: "https://placehold.co/600x400/4F3A2C/D4B7A7?text=Oak+Desk" },
  { id: 3, name: "Mahogany Rocking Chair", description: "Ergonomically shaped, hand-sanded finish.", price: 1150, imageUrl: "https://placehold.co/600x400/2A1916/D4B7A7?text=Rocking+Chair" },
  { id: 4, name: "End Grain Cutting Board", description: "Maple and cherry inlay, oil-finished.", price: 180, imageUrl: "https://placehold.co/600x400/5C4538/D4B7A7?text=Cutting+Board" },
  { id: 5, name: "Custom Bookshelves", description: "Modular design, deep blue finish.", price: 3500, imageUrl: "https://placehold.co/600x400/404E5C/D4B7A7?text=Bookshelves" },
  { id: 6, name: "Epoxy River Coffee Table", description: "Live edge cedar and sapphire epoxy.", price: 1900, imageUrl: "https://placehold.co/600x400/25333F/D4B7A7?text=River+Table" },
];

// --- Sub-Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Updated link text and href to '#showcase'
  const navLinks = [
    { name: 'Shop', href: '#showcase' }, 
    { name: 'Showcase', href: '#showcase' }, // Both point to the main product section
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-serif font-bold text-amber-500">
              The Artisan's Edge
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-amber-400 transition duration-150 font-medium">
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Utility Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-amber-400 transition">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <span className="text-sm font-semibold bg-red-600 rounded-full h-5 w-5 flex items-center justify-center -ml-3 -mt-3 absolute z-10">3</span>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-amber-400 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="block w-full p-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
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
  <section 
    className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center shadow-2xl"
    // Updated background URL to a more realistic walnut slab image placeholder
    style={{
      backgroundImage: `url("https://placehold.co/1920x800/3e2723/FBE3B8?text=Signature+Walnut+Slab+Table")`
    }}
  >
    {/* Dark Overlay for Text Visibility */}
    <div className="absolute inset-0 bg-black/50"></div>
    
    <div className="relative text-center p-6 max-w-2xl">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
        Heirloom Quality, Hand-Built Design
      </h1>
      <p className="text-lg text-gray-200 mb-8 font-light">
        Discover bespoke furniture crafted from sustainable, hand-selected hardwoods.
      </p>
      <a 
        href="#showcase" // Updated CTA to point to the showcase section
        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-gray-900 bg-amber-400 hover:bg-amber-300 transition-transform transform hover:scale-[1.02] duration-300"
      >
        <Rss className="w-5 h-5 mr-2" /> View the Full Collection
      </a>
    </div>
  </section>
);

interface ProductCardProps {
  product: typeof MOCK_PRODUCTS[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
    <div className="aspect-w-3 aspect-h-2">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:opacity-75" 
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null; 
          e.currentTarget.src = 'https://placehold.co/600x400/292524/D4B7A7?text=Image+Unavailable';
        }}
      />
    </div>
    <div className="p-5">
      <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-2xl font-extrabold text-amber-400 flex items-center">
          <DollarSign className="w-5 h-5 mr-1" />
          {product.price.toLocaleString('en-US')}
        </span>
        <button className="flex items-center bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium py-2 px-4 rounded-full transition duration-150 shadow-md hover:shadow-lg">
          <ShoppingCart className="w-4 h-4 mr-1" /> Add
        </button>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const CarpentryShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      
      <main>
        <HeroSection />

        <section id="showcase" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            The Showcase
          </h2>
          <p className="text-xl text-center text-gray-400 mb-12">
            Ready-to-ship pieces, each built with uncompromising detail.
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-6 py-3 border border-amber-400 text-amber-400 rounded-full hover:bg-amber-400 hover:text-gray-900 transition duration-300 font-semibold">
              Load More Pieces
            </button>
          </div>
        </section>

        {/* About/Process CTA Section */}
        <section id="about" className="bg-gray-800 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Process: Where Wood Meets Soul
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Every piece starts with hand-selection, thoughtful design, and traditional joinery. Learn how we transform raw timber into furniture that lasts generations.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-amber-500 hover:bg-amber-600 transition duration-300"
            >
              Start a Custom Project
            </a>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} The Artisan's Edge. All rights reserved. | Handcrafted in the USA.
        </div>
      </footer>
    </div>
  );
};

export default CarpentryShowcase;
