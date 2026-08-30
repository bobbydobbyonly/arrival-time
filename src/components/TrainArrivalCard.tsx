import React, { useState } from 'react';
import { TrainStation, TrainArrival } from '../types';
import { Train, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface TrainArrivalCardProps {
  station: TrainStation;
  onToggleFavorite: (stationId: string) => void;
  onOpenStationDetails?: (station: TrainStation) => void;
}

export const TrainArrivalCard: React.FC<TrainArrivalCardProps> = ({
  station,
  onToggleFavorite,
  onOpenStationDetails,
}) => {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  // In the screenshot, the primary direction (Towards Pasir Ris) is shown directly
  const displayedArrivals = showAllPlatforms ? station.arrivals : station.arrivals.slice(0, 1);
  const remainingCount = station.arrivals.length - 1;

  const renderArrivalTime = (arr: TrainArrival) => {
    const isArrivingNow = arr.nextArrivalSec <= 30;
    const minutes = Math.ceil(arr.nextArrivalSec / 60);

    const subMinutes =
      arr.subsequentArrivalSec !== undefined
        ? arr.subsequentArrivalSec <= 30
          ? 'Arriving'
          : `${Math.ceil(arr.subsequentArrivalSec / 60)} min`
        : null;

    return (
      <div className="text-right">
        {isArrivingNow ? (
          <div className="inline-block px-2 py-1 bg-[#1B5E20] text-white font-bold text-[14px] leading-[20px] rounded mb-1 shadow-xs animate-pulse">
            Arriving
          </div>
        ) : (
          <div className="text-[32px] leading-[40px] font-bold text-[#191c21] tracking-tight">
            {minutes}{' '}
            <span className="text-[16px] leading-[24px] font-normal text-[#424752]">min</span>
          </div>
        )}

        {subMinutes && (
          <div className="text-[16px] leading-[24px] text-[#424752]">
            Next: {subMinutes}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id={`mrt-station-card-${station.id}`}
      className="bg-[#F2F2F7] rounded-xl border border-[#79747E]/20 overflow-hidden transition-all duration-200 hover:border-[#79747E]/40 shadow-xs"
    >
      {/* Station Header */}
      <div className="p-4 flex justify-between items-start border-b border-[#79747E]/10 bg-[#f2f3fc]">
        <div
          className="cursor-pointer group"
          onClick={() => onOpenStationDetails && onOpenStationDetails(station)}
        >
          <h3 className="text-[18px] leading-[26px] text-[#191c21] font-semibold flex items-center gap-2 group-hover:text-[#003f87] transition-colors">
            <Train className="text-[#722b00] h-5 w-5 fill-[#722b00]/10" />
            {station.name}
          </h3>
          <p className="text-[12px] leading-[16px] text-[#424752] font-medium mt-1">
            {station.code} • {station.line}
            {station.distanceMeters && ` • ${station.distanceMeters}m away`}
          </p>
        </div>

        <button
          id={`favorite-train-${station.id}`}
          aria-label={station.isFavorite ? 'Unpin station' : 'Pin station'}
          onClick={() => onToggleFavorite(station.id)}
          className="text-[#003f87] hover:bg-[#e1e2ea]/60 p-2 rounded-full transition-colors active:scale-90"
        >
          <Star
            className={`w-6 h-6 transition-transform ${
              station.isFavorite
                ? 'fill-[#003f87] text-[#003f87]'
                : 'text-[#79747E] stroke-[1.5]'
            }`}
          />
        </button>
      </div>

      {/* Train Platform Arrival List */}
      <div className="divide-y divide-[#79747E]/10">
        {displayedArrivals.map((arr, idx) => (
          <div
            key={idx}
            id={`train-arrival-row-${station.id}-${idx}`}
            onClick={() => onOpenStationDetails && onOpenStationDetails(station)}
            className="p-4 flex items-center justify-between bg-[#ffffff] hover:bg-[#f9f9ff] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Vertical MRT Line Color Bar */}
              <div
                className="w-4 h-16 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: arr.lineColor || station.lineColor }}
              />
              <div>
                <div className="text-[14px] leading-[20px] font-bold text-[#191c21]">
                  {arr.direction}
                </div>
                <div className="text-[16px] leading-[24px] text-[#424752]">
                  {arr.platform}
                </div>
              </div>
            </div>

            {/* Arrival Time */}
            {renderArrivalTime(arr)}
          </div>
        ))}
      </div>

      {/* Expand / Show All Platforms Bar */}
      {remainingCount > 0 && (
        <div className="bg-[#f2f3fc] border-t border-[#79747E]/10 px-4 py-2 flex items-center justify-between text-xs font-semibold text-[#003f87]">
          <button
            onClick={() => setShowAllPlatforms(!showAllPlatforms)}
            className="flex items-center gap-1 hover:underline py-1"
          >
            {showAllPlatforms ? (
              <>
                <ChevronUp className="h-4 w-4" /> Show primary platform only
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> Show other platforms (
                {station.arrivals.slice(1).map((a) => a.platform).join(', ')})
              </>
            )}
          </button>

          {onOpenStationDetails && (
            <button
              onClick={() => onOpenStationDetails(station)}
              className="text-[#424752] hover:text-[#003f87] transition-colors"
            >
              All Train Timings
            </button>
          )}
        </div>
      )}
    </section>
  );
};
