import React, { useState } from 'react';
import { BusStop, TrainStation } from '../types';
import { Navigation, Bus, Train, Star, Footprints, Compass, MapPin } from 'lucide-react';

interface NearbyScreenProps {
  busStops: BusStop[];
  trainStations: TrainStation[];
  onToggleBusFavorite: (stopId: string) => void;
  onToggleTrainFavorite: (stationId: string) => void;
  onSelectBusStop: (stop: BusStop) => void;
  onSelectTrainStation: (station: TrainStation) => void;
}

export const NearbyScreen: React.FC<NearbyScreenProps> = ({
  busStops,
  trainStations,
  onToggleBusFavorite,
  onToggleTrainFavorite,
  onSelectBusStop,
  onSelectTrainStation,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'bus' | 'mrt'>('all');
  const [selectedRadius, setSelectedRadius] = useState<number>(500); // meters

  // Combine and sort stops by distance
  const combinedTransit = [
    ...busStops.map((b) => ({ ...b, transitType: 'bus' as const })),
    ...trainStations.map((t) => ({ ...t, transitType: 'mrt' as const })),
  ]
    .filter((item) => {
      if (filterType === 'bus') return item.transitType === 'bus';
      if (filterType === 'mrt') return item.transitType === 'mrt';
      return true;
    })
    .filter((item) => (item.distanceMeters ?? 0) <= selectedRadius)
    .sort((a, b) => (a.distanceMeters ?? 9999) - (b.distanceMeters ?? 9999));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[24px] text-[#191c21] mb-1">Nearby Transit</h2>
            <p className="text-[14px] text-[#424752]">
              Stops & stations within walking distance of your current location.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-[#a0f399]/40 text-[#217128] px-3 py-1.5 rounded-full text-xs font-semibold">
            <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: '8s' }} />
            GPS Active
          </div>
        </div>
      </div>

      {/* Radar Map / Visual Compass Widget */}
      <div className="relative overflow-hidden rounded-2xl bg-[#003f87] text-white p-5 shadow-sm">
        {/* Background Grid Circles */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
          <div className="w-96 h-96 rounded-full border border-white" />
          <div className="w-64 h-64 rounded-full border border-white absolute" />
          <div className="w-32 h-32 rounded-full border border-white absolute" />
          <div className="w-full h-[1px] bg-white absolute" />
          <div className="h-full w-[1px] bg-white absolute" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a0f399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a0f399]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#bbd0ff]">
                Current Location
              </span>
            </div>
            <span className="text-xs font-semibold text-[#bbd0ff] bg-[#0056b3] px-2.5 py-1 rounded-full">
              Anson Rd / Tanjong Pagar
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold">5 Transit Points Detected</div>
              <div className="text-xs text-[#bbd0ff] mt-0.5">
                Closest: Opp Tanjong Pagar Stn (85m, ~1 min walk)
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#0056b3]/80 p-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setSelectedRadius(300)}
                className={`px-2 py-1 rounded font-semibold transition-colors ${
                  selectedRadius === 300 ? 'bg-white text-[#003f87]' : 'text-white/80'
                }`}
              >
                300m
              </button>
              <button
                onClick={() => setSelectedRadius(500)}
                className={`px-2 py-1 rounded font-semibold transition-colors ${
                  selectedRadius === 500 ? 'bg-white text-[#003f87]' : 'text-white/80'
                }`}
              >
                500m
              </button>
              <button
                onClick={() => setSelectedRadius(1000)}
                className={`px-2 py-1 rounded font-semibold transition-colors ${
                  selectedRadius === 1000 ? 'bg-white text-[#003f87]' : 'text-white/80'
                }`}
              >
                1km
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filterType === 'all'
              ? 'bg-[#003f87] text-white shadow-xs'
              : 'bg-[#f2f3fc] text-[#424752] hover:bg-[#e7e8f0]'
          }`}
        >
          All ({busStops.length + trainStations.length})
        </button>
        <button
          onClick={() => setFilterType('bus')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filterType === 'bus'
              ? 'bg-[#003f87] text-white shadow-xs'
              : 'bg-[#f2f3fc] text-[#424752] hover:bg-[#e7e8f0]'
          }`}
        >
          <Bus className="h-3.5 w-3.5" /> Bus Stops ({busStops.length})
        </button>
        <button
          onClick={() => setFilterType('mrt')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filterType === 'mrt'
              ? 'bg-[#003f87] text-white shadow-xs'
              : 'bg-[#f2f3fc] text-[#424752] hover:bg-[#e7e8f0]'
          }`}
        >
          <Train className="h-3.5 w-3.5" /> MRT Stations ({trainStations.length})
        </button>
      </div>

      {/* Nearby Transit Stops List */}
      <div className="space-y-3">
        {combinedTransit.map((item) => {
          if (item.transitType === 'bus') {
            const stop = item as BusStop;
            return (
              <div
                key={stop.id}
                className="bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87]/50 p-4 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div
                    onClick={() => onSelectBusStop(stop)}
                    className="cursor-pointer flex-1 flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0056b3]/10 flex items-center justify-center text-[#003f87] shrink-0 mt-0.5">
                      <Bus className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#191c21] hover:text-[#003f87] transition-colors">
                        {stop.name}
                      </div>
                      <div className="text-xs text-[#424752] mt-0.5 flex items-center gap-2">
                        <span>Stop ID: {stop.id}</span>
                        <span>•</span>
                        <span>{stop.road}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b6d24] bg-[#a0f399]/40 px-2 py-0.5 rounded">
                          <Footprints className="h-3 w-3" />
                          {stop.walkTimeMin} min walk ({stop.distanceMeters}m)
                        </span>
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

                {/* Quick Departure Badges Preview */}
                <div className="mt-3 pt-3 border-t border-[#79747E]/10 flex items-center gap-2 overflow-x-auto pb-1">
                  {stop.services.map((svc) => (
                    <div
                      key={svc.serviceNo}
                      onClick={() => onSelectBusStop(stop)}
                      className="cursor-pointer shrink-0 flex items-center gap-2 bg-[#f2f3fc] hover:bg-[#e7e8f0] px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      <span className="font-bold text-[#003f87] bg-white px-1.5 py-0.5 rounded shadow-2xs">
                        {svc.serviceNo}
                      </span>
                      <span
                        className={`font-semibold ${
                          svc.nextArrivalSec <= 30 ? 'text-[#1B5E20]' : 'text-[#191c21]'
                        }`}
                      >
                        {svc.nextArrivalSec <= 30
                          ? 'Arriving'
                          : `${Math.ceil(svc.nextArrivalSec / 60)} min`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            const stn = item as TrainStation;
            return (
              <div
                key={stn.id}
                className="bg-[#ffffff] rounded-xl border border-[#79747E]/20 hover:border-[#003f87]/50 p-4 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div
                    onClick={() => onSelectTrainStation(stn)}
                    className="cursor-pointer flex-1 flex items-start gap-3"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: stn.lineColor }}
                    >
                      <Train className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#191c21] hover:text-[#003f87] transition-colors">
                        {stn.name}
                      </div>
                      <div className="text-xs text-[#424752] mt-0.5">
                        {stn.code} • {stn.line}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b6d24] bg-[#a0f399]/40 px-2 py-0.5 rounded">
                          <Footprints className="h-3 w-3" />
                          {stn.walkTimeMin} min walk ({stn.distanceMeters}m)
                        </span>
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

                {/* Quick Departure Badges Preview */}
                <div className="mt-3 pt-3 border-t border-[#79747E]/10 flex flex-wrap gap-2">
                  {stn.arrivals.map((arr, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectTrainStation(stn)}
                      className="cursor-pointer flex items-center gap-2 bg-[#f2f3fc] hover:bg-[#e7e8f0] px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: arr.lineColor }}
                      />
                      <span className="font-medium text-[#191c21]">{arr.direction}:</span>
                      <span
                        className={`font-bold ${
                          arr.nextArrivalSec <= 30 ? 'text-[#1B5E20]' : 'text-[#003f87]'
                        }`}
                      >
                        {arr.nextArrivalSec <= 30
                          ? 'Arriving'
                          : `${Math.ceil(arr.nextArrivalSec / 60)} min`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
