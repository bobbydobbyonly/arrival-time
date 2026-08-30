import React from 'react';
import { ActiveTab } from '../types';
import { Home, Search, Navigation } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      id="bottom-nav-bar"
      className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#79747E]/20 bg-[#f9f9ff] py-2 shadow-md md:hidden"
    >
      {/* Home Tab */}
      <button
        id="bottom-nav-home"
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-150 active:scale-90 ${
          activeTab === 'home'
            ? 'bg-[#a0f399] text-[#217128]'
            : 'text-[#424752] hover:bg-[#F2F2F7]'
        }`}
      >
        <Home className={`h-6 w-6 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        {activeTab === 'home' && (
          <span className="mt-0.5 text-[11px] font-bold text-[#003f87]">Home</span>
        )}
      </button>

      {/* Search Tab */}
      <button
        id="bottom-nav-search"
        onClick={() => setActiveTab('search')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-150 active:scale-90 ${
          activeTab === 'search'
            ? 'bg-[#a0f399] text-[#217128]'
            : 'text-[#424752] hover:bg-[#F2F2F7]'
        }`}
      >
        <Search className={`h-6 w-6 ${activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        {activeTab === 'search' && (
          <span className="mt-0.5 text-[11px] font-bold text-[#003f87]">Search</span>
        )}
      </button>

      {/* Nearby Tab */}
      <button
        id="bottom-nav-nearby"
        onClick={() => setActiveTab('nearby')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-150 active:scale-90 ${
          activeTab === 'nearby'
            ? 'bg-[#a0f399] text-[#217128]'
            : 'text-[#424752] hover:bg-[#F2F2F7]'
        }`}
      >
        <Navigation className={`h-6 w-6 ${activeTab === 'nearby' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        {activeTab === 'nearby' && (
          <span className="mt-0.5 text-[11px] font-bold text-[#003f87]">Nearby</span>
        )}
      </button>
    </nav>
  );
};
