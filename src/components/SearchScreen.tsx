import React, { useState, useMemo } from 'react';
import { BusStop, TrainStation } from '../types';
import { Search, X, Bus, Train, Star, ArrowRight, Clock, MapPin } from 'lucide-react';
import { SERVICE_ROUTES } from '../data/transitData';

interface SearchScreenProps {
  busStops: BusStop[];
  trainStations: TrainStation[];
  onToggleBusFavorite: (stopId: string) => void;
  onToggleTrainFavorite: (stationId: string) => void;
  onSelectBusStop: (stop: BusStop) => void;
  onSelectTrainStation: (station: TrainStation) => void;
  onSelectRoute: (serviceNo: string) => void;
}

type FilterCategory = 'all' | 'buses' | 'services' | 'trains';

export const SearchScreen: React.FC<SearchScreenProps> = ({
  busStops,
  trainStations,
  onToggleBusFavorite,
  onToggleTrainFavorite,
  onSelectBusStop,
  onSelectTrainStation,
  onSelectRoute,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FilterCategory>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '03223',
    'Bus 80',
    'Tanjong Pagar',
    'Bus 145',
  ]);

  const handleSearchClick = (text: string) => {
    setQuery(text);
  };

  // Filter bus stops, routes, and train stations
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedBusStops =
      category === 'services' || category === 'trains'
        ? []
        : busStops.filter(
            (stop) =>
              stop.id.toLowerCase().includes(q) ||
              stop.name.toLowerCase().includes(q) ||
              stop.road.toLowerCase().includes(q) ||
              stop.services.some((s) => s.serviceNo.toLowerCase().includes(q))
          );

    const matchedServices =
      category === 'trains' || category === 'buses'
        ? []
        : Object.values(SERVICE_ROUTES).filter(
            (route) =>
              route.serviceNo.toLowerCase().includes(q) ||
              route.origin.toLowerCase().includes(q) ||
              route.destination.toLowerCase().includes(q) ||
              route.operator.toLowerCase().includes(q)
          );

    const matchedTrainStations =
      category === 'buses' || category === 'services'
        ? []
        : trainStations.filter(
            (stn) =>
              stn.name.toLowerCase().includes(q) ||
              stn.code.toLowerCase().includes(q) ||
              stn.line.toLowerCase().includes(q)
          );

    return {
      busStops: matchedBusStops,
      services: matchedServices,
      trainStations: matchedTrainStations,
      totalCount: matchedBusStops.length + matchedServices.length + matchedTrainStations.length,
    };
  }, [query, category, busStops, trainStations]);

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div>
        <h2 className="font-bold text-[24px] text-[#191c21] mb-1">Search Transit</h2>
        <p className="text-[14px] text-[#424752]">
          Find bus stops by ID or road name, bus service numbers, and MRT stations.
        </p>
      </div>

      {/* Search Input Bar (Material 3 pill styling) */}
      <div className="relative">
        <div className="flex items-center rounded-full bg-[#f2f3fc] border border-[#79747E]/30 px-4 py-3 shadow-xs focus-within:border-[#003f87] focus-within:ring-2 focus-within:ring-[#003f87]/20 transition-all">
          <Search className="h-5 w-5 text-[#003f87] shrink-0 mr-3" />
          <input
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stop ID (03223), bus (80, 145), or station..."
            className="w-full bg-transparent text-[16px] text-[#191c21] placeholder-[#79747E] focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#424752] hover:bg-[#e1e2ea]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(
          [
            { id: 'all', label: 'All Results' },
            { id: 'buses', label: 'Bus Stops' },
            { id: 'services', label: 'Bus Services' },
            { id: 'trains', label: 'MRT Stations' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setCategory(item.id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              category === item.id
                ? 'bg-[#003f87] text-white shadow-xs'
                : 'bg-[#f2f3fc] text-[#424752] hover:bg-[#e7e8f0]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Query is empty: Show Recent Searches & Quick Hubs */}
      {!query && (
        <div className="space-y-6 pt-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#424752] uppercase tracking-wider mb-3">
              <Clock className="h-3.5 w-3.5" /> Recent Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchClick(item)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ffffff] border border-[#79747E]/20 px-3 py-2 text-sm text-[#191c21] hover:bg-[#f2f3fc] hover:border-[#003f87]/50 transition-colors shadow-2xs"
                >
                  <span>{item}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#79747E]" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#424752] uppercase tracking-wider mb-3">
              <MapPin className="h-3.5 w-3.5 text-[#0056b3]" /> Popular Transit Hubs
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {busStops.slice(0, 3).map((stop) => (
                <div
                  key={stop.id}
                  onClick={() => onSelectBusStop(stop)}
                  className="p-3 bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87] transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0056b3]/10 flex items-center justify-center text-[#003f87]">
                      <Bus className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#191c21] group-hover:text-[#003f87]">
                        {stop.name}
                      </div>
                      <div className="text-xs text-[#424752]">
                        Stop {stop.id} • {stop.services.length} services
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#79747E] group-hover:text-[#003f87]" />
                </div>
              ))}

              {trainStations.slice(0, 2).map((stn) => (
                <div
                  key={stn.id}
                  onClick={() => onSelectTrainStation(stn)}
                  className="p-3 bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87] transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#722b00]/10 flex items-center justify-center text-[#722b00]">
                      <Train className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#191c21] group-hover:text-[#003f87]">
                        {stn.name}
                      </div>
                      <div className="text-xs text-[#424752]">{stn.line}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#79747E] group-hover:text-[#003f87]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Query Results */}
      {searchResults && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-[#424752]">
            Found {searchResults.totalCount} match{searchResults.totalCount === 1 ? '' : 'es'} for &ldquo;{query}&rdquo;
          </div>

          {/* Matched Bus Services */}
          {searchResults.services.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#003f87] uppercase tracking-wider flex items-center gap-1.5">
                <Bus className="h-3.5 w-3.5" /> Bus Routes
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResults.services.map((route) => (
                  <div
                    key={route.serviceNo}
                    onClick={() => onSelectRoute(route.serviceNo)}
                    className="p-3 bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87] transition-all cursor-pointer flex items-center justify-between shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#0056b3] text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        {route.serviceNo}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#191c21]">
                          {route.origin} ⇄ {route.destination}
                        </div>
                        <div className="text-xs text-[#424752]">
                          {route.operator} • Frequency: {route.frequencyPeak}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#003f87]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Bus Stops */}
          {searchResults.busStops.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#003f87] uppercase tracking-wider flex items-center gap-1.5">
                <Bus className="h-3.5 w-3.5" /> Bus Stops
              </div>
              <div className="space-y-2">
                {searchResults.busStops.map((stop) => (
                  <div
                    key={stop.id}
                    className="p-3 bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87] transition-all flex items-center justify-between shadow-2xs"
                  >
                    <div
                      onClick={() => onSelectBusStop(stop)}
                      className="cursor-pointer flex-1 flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#003f87]/10 flex items-center justify-center text-[#003f87] shrink-0 mt-0.5">
                        <Bus className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#191c21] hover:text-[#003f87]">
                          {stop.name}
                        </div>
                        <div className="text-xs text-[#424752]">
                          Stop ID: {stop.id} • {stop.road}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {stop.services.map((s) => (
                            <span
                              key={s.serviceNo}
                              className="px-1.5 py-0.5 rounded bg-[#f2f3fc] text-[#003f87] font-semibold text-[11px]"
                            >
                              {s.serviceNo}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBusFavorite(stop.id)}
                      className="p-2 text-[#003f87] hover:bg-[#f2f3fc] rounded-full transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          stop.isFavorite ? 'fill-[#003f87] text-[#003f87]' : 'text-[#79747E]'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched MRT Stations */}
          {searchResults.trainStations.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#722b00] uppercase tracking-wider flex items-center gap-1.5">
                <Train className="h-3.5 w-3.5" /> MRT Stations
              </div>
              <div className="space-y-2">
                {searchResults.trainStations.map((stn) => (
                  <div
                    key={stn.id}
                    className="p-3 bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87] transition-all flex items-center justify-between shadow-2xs"
                  >
                    <div
                      onClick={() => onSelectTrainStation(stn)}
                      className="cursor-pointer flex-1 flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#722b00]/10 flex items-center justify-center text-[#722b00] shrink-0 mt-0.5">
                        <Train className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#191c21] hover:text-[#003f87]">
                          {stn.name}
                        </div>
                        <div className="text-xs text-[#424752]">
                          {stn.code} • {stn.line}
                        </div>
                        <div className="flex gap-2 mt-1">
                          {stn.arrivals.map((a, i) => (
                            <span
                              key={i}
                              className="text-[11px] text-[#424752] bg-[#f2f3fc] px-2 py-0.5 rounded"
                            >
                              {a.direction}: {Math.ceil(a.nextArrivalSec / 60)} min
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleTrainFavorite(stn.id)}
                      className="p-2 text-[#003f87] hover:bg-[#f2f3fc] rounded-full transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          stn.isFavorite ? 'fill-[#003f87] text-[#003f87]' : 'text-[#79747E]'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.totalCount === 0 && (
            <div className="p-8 text-center rounded-xl border-2 border-dashed border-[#79747E]/20 bg-[#ffffff]">
              <Search className="h-8 w-8 text-[#79747E] mx-auto mb-2" />
              <div className="font-semibold text-sm text-[#191c21]">No transit results found</div>
              <div className="text-xs text-[#424752] mt-1">
                Try searching for &quot;03223&quot;, &quot;80&quot;, &quot;145&quot;, or &quot;Tanjong Pagar&quot;.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
