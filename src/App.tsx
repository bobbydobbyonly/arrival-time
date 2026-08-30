import { useState } from 'react';
import { ActiveTab, BusStop, TrainStation } from './types';
import { useTransitEngine } from './hooks/useTransitEngine';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { BusArrivalCard } from './components/BusArrivalCard';
import { TrainArrivalCard } from './components/TrainArrivalCard';
import { SearchScreen } from './components/SearchScreen';
import { NearbyScreen } from './components/NearbyScreen';
import { RouteDetailModal } from './components/RouteDetailModal';
import { StationDetailModal } from './components/StationDetailModal';
import { LiveSimulationBar } from './components/LiveSimulationBar';
import { Star, Plus, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedRouteService, setSelectedRouteService] = useState<string | null>(null);
  const [selectedBusStop, setSelectedBusStop] = useState<BusStop | null>(null);
  const [selectedTrainStation, setSelectedTrainStation] = useState<TrainStation | null>(null);

  const {
    busStops,
    trainStations,
    isLtaConfigured,
    isRefreshing,
    nextRefreshInSec,
    simSpeed,
    setSimSpeed,
    notifications,
    trainAlerts,
    addAlertReminder,
    refreshArrivals,
    toggleBusFavorite,
    toggleTrainFavorite,
  } = useTransitEngine();

  // Filter pinned items
  const favoriteBusStops = busStops.filter((b) => b.isFavorite);
  const favoriteTrainStations = trainStations.filter((t) => t.isFavorite);
  const hasFavorites = favoriteBusStops.length > 0 || favoriteTrainStations.length > 0;

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c21] font-sans pb-24 md:pb-12 selection:bg-[#bbd0ff] selection:text-[#003f87]">
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setActiveTab('search')}
        isRefreshing={isRefreshing}
        onRefresh={refreshArrivals}
        simSpeed={simSpeed}
        setSimSpeed={setSimSpeed}
      />

      {/* Main Content Area (constrained to max-w-[800px] per design specs) */}
      <main className="w-full max-w-[800px] mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* TAB 1: HOME / FAVORITES */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header Title Section */}
            <div>
              <h2 className="font-semibold text-[24px] leading-[32px] text-[#191c21] mb-1">
                Favorites
              </h2>
              <p className="text-[16px] leading-[24px] text-[#424752]">
                Your pinned stops and stations for quick access.
              </p>
            </div>

            {/* Live Ticker & Sync Bar */}
            <LiveSimulationBar
              isLtaConfigured={isLtaConfigured}
              isRefreshing={isRefreshing}
              nextRefreshInSec={nextRefreshInSec}
              onRefresh={refreshArrivals}
              notifications={notifications}
              trainAlerts={trainAlerts}
            />

            {/* Pinned Bus Stops List */}
            {favoriteBusStops.map((stop) => (
              <BusArrivalCard
                key={stop.id}
                busStop={stop}
                onToggleFavorite={toggleBusFavorite}
                onSelectService={(serviceNo) => setSelectedRouteService(serviceNo)}
                onOpenStopDetails={(st) => setSelectedBusStop(st)}
              />
            ))}

            {/* Pinned MRT Stations List */}
            {favoriteTrainStations.map((station) => (
              <TrainArrivalCard
                key={station.id}
                station={station}
                onToggleFavorite={toggleTrainFavorite}
                onOpenStationDetails={(stn) => setSelectedTrainStation(stn)}
              />
            ))}

            {/* Empty State when no favorites are pinned */}
            {!hasFavorites && (
              <div className="p-8 border-2 border-dashed border-[#c2c6d4] rounded-xl flex flex-col items-center justify-center text-center bg-[#ffffff]/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f2f3fc] flex items-center justify-center text-[#79747E]">
                  <Star className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#191c21]">No favorites pinned yet</h3>
                  <p className="text-[14px] text-[#424752] mt-1 max-w-sm">
                    Tap the star icon on any bus stop or MRT station in Search or Nearby to pin it
                    here for instant live arrivals.
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActiveTab('search')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#003f87] text-white font-semibold text-xs hover:bg-[#0056b3] transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Browse Transit Stops
                  </button>
                  <button
                    onClick={() => setActiveTab('nearby')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f2f3fc] text-[#003f87] font-semibold text-xs hover:bg-[#e7e8f0] transition-colors"
                  >
                    <MapPin className="h-4 w-4" /> View Nearby
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SEARCH */}
        {activeTab === 'search' && (
          <div className="animate-in fade-in duration-150">
            <SearchScreen
              busStops={busStops}
              trainStations={trainStations}
              onToggleBusFavorite={toggleBusFavorite}
              onToggleTrainFavorite={toggleTrainFavorite}
              onSelectBusStop={(stop) => setSelectedBusStop(stop)}
              onSelectTrainStation={(stn) => setSelectedTrainStation(stn)}
              onSelectRoute={(serviceNo) => setSelectedRouteService(serviceNo)}
            />
          </div>
        )}

        {/* TAB 3: NEARBY */}
        {activeTab === 'nearby' && (
          <div className="animate-in fade-in duration-150">
            <NearbyScreen
              busStops={busStops}
              trainStations={trainStations}
              onToggleBusFavorite={toggleBusFavorite}
              onToggleTrainFavorite={toggleTrainFavorite}
              onSelectBusStop={(stop) => setSelectedBusStop(stop)}
              onSelectTrainStation={(stn) => setSelectedTrainStation(stn)}
            />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Bus Route Live Tracker Modal */}
      <RouteDetailModal
        serviceNo={selectedRouteService}
        onClose={() => setSelectedRouteService(null)}
      />

      {/* Station / Stop Departure Timetable Modal */}
      <StationDetailModal
        busStop={selectedBusStop}
        trainStation={selectedTrainStation}
        onClose={() => {
          setSelectedBusStop(null);
          setSelectedTrainStation(null);
        }}
        onToggleBusFavorite={toggleBusFavorite}
        onToggleTrainFavorite={toggleTrainFavorite}
        onSelectService={(serviceNo) => setSelectedRouteService(serviceNo)}
        onSetAlarm={(title) => addAlertReminder(title)}
      />
    </div>
  );
}
