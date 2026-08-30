import React, { useState } from 'react';
import { BusStop, BusArrival } from '../types';
import { Bus, Star, ChevronDown, ChevronUp, Users, Accessibility, Route } from 'lucide-react';

interface BusArrivalCardProps {
  busStop: BusStop;
  onToggleFavorite: (stopId: string) => void;
  onSelectService?: (serviceNo: string, stopId: string) => void;
  onOpenStopDetails?: (stop: BusStop) => void;
}

export const BusArrivalCard: React.FC<BusArrivalCardProps> = ({
  busStop,
  onToggleFavorite,
  onSelectService,
  onOpenStopDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // We display the first 2 primary services by default matching screenshot, or all if expanded
  const displayedServices = isExpanded ? busStop.services : busStop.services.slice(0, 2);
  const remainingCount = busStop.services.length - 2;

  const renderArrivalTime = (service: BusArrival) => {
    const isArrivingNow = service.nextArrivalSec <= 30;
    const minutes = Math.ceil(service.nextArrivalSec / 60);

    const subMinutes =
      service.subsequentArrivalSec !== undefined
        ? service.subsequentArrivalSec <= 30
          ? 'Arriving'
          : `${Math.ceil(service.subsequentArrivalSec / 60)} min`
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

  const getCrowdLabel = (crowd: string) => {
    switch (crowd) {
      case 'low':
        return { text: 'Seats Available', color: 'text-[#1B5E20] bg-[#a0f399]/30' };
      case 'medium':
        return { text: 'Standing Available', color: 'text-[#C43E00] bg-[#ffdbcc]/60' };
      case 'high':
        return { text: 'Limited Standing', color: 'text-[#ba1a1a] bg-[#ffdad6]/60' };
      default:
        return { text: 'Normal', color: 'text-[#424752] bg-[#e1e2ea]' };
    }
  };

  return (
    <section
      id={`bus-stop-card-${busStop.id}`}
      className="bg-[#F2F2F7] rounded-xl border border-[#79747E]/20 overflow-hidden transition-all duration-200 hover:border-[#79747E]/40 shadow-xs"
    >
      {/* Card Header */}
      <div className="p-4 flex justify-between items-start border-b border-[#79747E]/10 bg-[#f2f3fc]">
        <div
          className="cursor-pointer group"
          onClick={() => onOpenStopDetails && onOpenStopDetails(busStop)}
        >
          <h3 className="text-[18px] leading-[26px] text-[#191c21] font-semibold flex items-center gap-2 group-hover:text-[#003f87] transition-colors">
            <Bus className="text-[#003f87] h-5 w-5 fill-[#003f87]/10" />
            {busStop.name}
          </h3>
          <p className="text-[12px] leading-[16px] text-[#424752] font-medium mt-1">
            Stop ID: {busStop.id} • {busStop.road}
            {busStop.distanceMeters && ` • ${busStop.distanceMeters}m away`}
          </p>
        </div>

        <button
          id={`favorite-bus-${busStop.id}`}
          aria-label={busStop.isFavorite ? 'Unpin stop' : 'Pin stop'}
          onClick={() => onToggleFavorite(busStop.id)}
          className="text-[#003f87] hover:bg-[#e1e2ea]/60 p-2 rounded-full transition-colors active:scale-90"
        >
          <Star
            className={`w-6 h-6 transition-transform ${
              busStop.isFavorite
                ? 'fill-[#003f87] text-[#003f87]'
                : 'text-[#79747E] stroke-[1.5]'
            }`}
          />
        </button>
      </div>

      {/* Arrival Services List */}
      <div className="divide-y divide-[#79747E]/10">
        {displayedServices.map((service) => {
          const crowdInfo = getCrowdLabel(service.crowd);
          return (
            <div
              key={service.serviceNo}
              id={`bus-service-row-${busStop.id}-${service.serviceNo}`}
              onClick={() => onSelectService && onSelectService(service.serviceNo, busStop.id)}
              className="p-4 flex items-center justify-between bg-[#ffffff] hover:bg-[#f9f9ff] transition-colors cursor-pointer group"
            >
              {/* Bus Service Number Badge */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-[#0056b3] text-[#ffffff] rounded-lg flex items-center justify-center font-bold text-[30px] tracking-tight shadow-xs group-hover:bg-[#003f87] transition-colors shrink-0">
                  {service.serviceNo}
                </div>

                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-[#191c21] truncate max-w-[170px]">
                    To {service.destination}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded ${crowdInfo.color}`}
                    >
                      <Users className="h-3 w-3" />
                      {crowdInfo.text}
                    </span>
                    {service.wheelchairAccessible && (
                      <span
                        className="text-[11px] text-[#424752] bg-[#f2f3fc] p-0.5 rounded"
                        title="Wheelchair Accessible Bus"
                      >
                        <Accessibility className="h-3.5 w-3.5 text-[#0056b3]" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrival Minutes / Badge */}
              <div className="flex-1 flex justify-end gap-6 items-center">
                {renderArrivalTime(service)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expand / Show More Services Bar if there are more */}
      {remainingCount > 0 && (
        <div className="bg-[#f2f3fc] border-t border-[#79747E]/10 px-4 py-2 flex items-center justify-between text-xs font-semibold text-[#003f87]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 hover:underline py-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" /> Show fewer services
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> View {remainingCount} more service
                {remainingCount > 1 ? 's' : ''} (
                {busStop.services.slice(2).map((s) => s.serviceNo).join(', ')})
              </>
            )}
          </button>

          {onOpenStopDetails && (
            <button
              onClick={() => onOpenStopDetails(busStop)}
              className="flex items-center gap-1 text-[#424752] hover:text-[#003f87] transition-colors"
            >
              <Route className="h-3.5 w-3.5" /> Full Timetable
            </button>
          )}
        </div>
      )}
    </section>
  );
};
