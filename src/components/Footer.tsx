import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-mountain-blue-dark text-snow-white/60 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-display font-bold text-snow-white tracking-tight">
            PAVEL <span className="text-safety-orange">NENTVICH</span>
          </span>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Pavel Nentvich. All rights reserved.</p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="hover:text-safety-orange transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-safety-orange transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
