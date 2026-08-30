import React from 'react';
import { ActiveTab } from '../types';
import { Bus, Search, Navigation, RotateCw, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  isRefreshing,
  onRefresh,
  simSpeed,
  setSimSpeed,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#79747E]/20 bg-[#ffffff] backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-[800px] items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        {/* Brand & Bus Icon */}
        <div className="flex items-center gap-3">
          <button
            id="brand-menu-btn"
            aria-label="NextRide Home"
            onClick={() => setActiveTab('home')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#424752] transition-colors hover:bg-[#e7e8f0]/60 active:scale-95"
          >
            <Bus className="h-6 w-6 text-[#003f87]" />
          </button>
          <div className="flex items-baseline gap-2">
            <h1
              onClick={() => setActiveTab('home')}
              className="cursor-pointer font-bold tracking-tight text-[#003f87] text-[32px] sm:text-[40px] leading-tight"
            >
              NextRide
            </h1>
            <span className="hidden text-[11px] font-semibold text-[#1b6d24] uppercase tracking-wider bg-[#a0f399]/40 px-2 py-0.5 rounded-full sm:inline-block">
              Live
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <button
            id="desktop-nav-home"
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'home'
                ? 'bg-[#f2f3fc] text-[#003f87]'
                : 'text-[#424752] hover:bg-[#e7e8f0]/50'
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill={activeTab === 'home' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>
          <button
            id="desktop-nav-search"
            onClick={() => {
              setActiveTab('search');
              onOpenSearch();
            }}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'search'
                ? 'bg-[#f2f3fc] text-[#003f87]'
                : 'text-[#424752] hover:bg-[#e7e8f0]/50'
            }`}
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          <button
            id="desktop-nav-nearby"
            onClick={() => setActiveTab('nearby')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'nearby'
                ? 'bg-[#f2f3fc] text-[#003f87]'
                : 'text-[#424752] hover:bg-[#e7e8f0]/50'
            }`}
          >
            <Navigation className="h-4 w-4" />
            Nearby
          </button>
        </nav>

        {/* Right Tools: Refresh & Mobile Search */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Simulation Speed Pill */}
          <div className="hidden sm:flex items-center gap-1 rounded-full bg-[#f2f3fc] px-2.5 py-1 text-xs text-[#424752] border border-[#79747E]/10">
            <Sparkles className="h-3 w-3 text-[#0056b3]" />
            <span className="font-medium">Tick:</span>
            <button
              onClick={() => setSimSpeed(simSpeed === 1 ? 5 : simSpeed === 5 ? 0 : 1)}
              className="ml-1 rounded font-bold text-[#003f87] hover:underline"
              title="Click to toggle simulation speed (1x, 5x, Paused)"
            >
              {simSpeed === 1 ? '1x Realtime' : simSpeed === 5 ? '5x Speed' : 'Paused'}
            </button>
          </div>

          <button
            id="refresh-arrivals-btn"
            aria-label="Refresh arrivals"
            onClick={onRefresh}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#424752] transition-colors hover:bg-[#e7e8f0]/60 active:scale-90"
            title="Refresh arrivals now"
          >
            <RotateCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin text-[#003f87]' : ''}`} />
          </button>

          <button
            id="mobile-search-btn"
            aria-label="Search"
            onClick={() => {
              setActiveTab('search');
              onOpenSearch();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#424752] transition-colors hover:bg-[#e7e8f0]/60 md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
