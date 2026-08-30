import React, { useState } from 'react';
import { ServiceRoute } from '../types';
import { X, Bus, Clock, Calendar, Users, Accessibility, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICE_ROUTES } from '../data/transitData';

interface RouteDetailModalProps {
  serviceNo: string | null;
  currentStopId?: string;
  onClose: () => void;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({
  serviceNo,
  currentStopId,
  onClose,
}) => {
  if (!serviceNo) return null;

  const route: ServiceRoute = SERVICE_ROUTES[serviceNo] || {
    serviceNo: serviceNo,
    operator: 'SBS Transit',
    origin: 'Transit Terminal A',
    destination: 'Transit Interchange B',
    operatingHours: '05:30 - 23:45 daily',
    frequencyPeak: '6 - 9 min',
    frequencyOffPeak: '10 - 13 min',
    stops: [
      { stopId: '03223', stopName: 'Opp Tanjong Pagar Stn', road: 'Anson Rd', seq: 1, etaMin: 0, hasBusNow: true, busCrowd: 'medium', busType: 'Double Deck' },
      { stopId: '03218', stopName: 'Hub Synergy Pt', road: 'Anson Rd', seq: 2, etaMin: 2 },
      { stopId: '14019', stopName: 'Keppel Workshop', road: 'Keppel Rd', seq: 3, etaMin: 6, hasBusNow: true, busCrowd: 'low', busType: 'Double Deck' },
      { stopId: '14009', stopName: 'HarbourFront Int', road: 'Seah Im Rd', seq: 4, etaMin: 12 },
    ],
  };

  return (
    <div
      id="route-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 transition-all"
    >
      <div
        id="route-detail-modal"
        className="w-full max-w-[650px] max-h-[90vh] flex flex-col bg-[#ffffff] rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#003f87] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#0056b3] text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-md border border-white/20">
              {route.serviceNo}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#bbd0ff] uppercase tracking-wider">
                Bus Service Route
              </div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-1.5 mt-0.5">
                {route.origin} <ArrowRight className="h-4 w-4" /> {route.destination}
              </h2>
              <div className="text-xs text-[#bbd0ff] mt-0.5">Operated by {route.operator}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Route Stats Bar */}
        <div className="grid grid-cols-3 bg-[#f2f3fc] border-b border-[#79747E]/10 p-3 text-xs text-[#191c21]">
          <div className="flex items-center gap-2 border-r border-[#79747E]/10 pr-2">
            <Clock className="h-4 w-4 text-[#003f87]" />
            <div>
              <div className="font-bold text-[11px] text-[#424752]">Peak Freq</div>
              <div>{route.frequencyPeak}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-r border-[#79747E]/10 px-2">
            <Calendar className="h-4 w-4 text-[#003f87]" />
            <div>
              <div className="font-bold text-[11px] text-[#424752]">Off-Peak</div>
              <div>{route.frequencyOffPeak}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <ShieldCheck className="h-4 w-4 text-[#1B5E20]" />
            <div>
              <div className="font-bold text-[11px] text-[#424752]">Accessibility</div>
              <div>Wheelchair (WAB)</div>
            </div>
          </div>
        </div>

        {/* Live Route Schematic Timeline */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#424752] uppercase tracking-wider pb-2 border-b border-[#79747E]/10">
            <span>Route Stops Sequence</span>
            <span className="text-[#003f87] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1B5E20] animate-ping" /> Live Bus Positions
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-1 before:bg-[#0056b3]">
            {route.stops.map((stop) => {
              const isCurrent = currentStopId === stop.stopId || stop.stopId === '03223';
              return (
                <div key={stop.stopId} className="relative flex items-start justify-between group">
                  {/* Stop Node Dot */}
                  <div
                    className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                      isCurrent
                        ? 'bg-[#003f87] border-[#ffffff] ring-4 ring-[#003f87]/30 scale-125'
                        : 'bg-[#ffffff] border-[#0056b3]'
                    }`}
                  />

                  {/* Stop Info */}
                  <div className="pl-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-[#003f87]' : 'text-[#191c21]'
                        }`}
                      >
                        {stop.stopName}
                      </span>
                      {isCurrent && (
                        <span className="bg-[#003f87] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          YOU ARE HERE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#424752]">
                      Stop {stop.stopId} • {stop.road}
                    </div>

                    {/* Live Bus marker at this stop */}
                    {stop.hasBusNow && (
                      <div className="mt-2 inline-flex items-center gap-2 bg-[#f2f3fc] border border-[#0056b3]/30 px-3 py-1.5 rounded-lg text-xs shadow-2xs animate-pulse">
                        <Bus className="h-4 w-4 text-[#0056b3]" />
                        <span className="font-bold text-[#003f87]">
                          Bus Approaching / At Stop
                        </span>
                        <span className="text-[11px] bg-white px-2 py-0.5 rounded font-semibold text-[#191c21]">
                          {stop.busType}
                        </span>
                        <span className="text-[11px] bg-[#a0f399]/40 text-[#217128] px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {stop.busCrowd === 'low' ? 'Seats Avail' : 'Standing'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ETA from current position */}
                  <div className="text-right shrink-0">
                    <div
                      className={`text-xs font-bold ${
                        stop.etaMin === 0
                          ? 'text-[#1B5E20]'
                          : stop.etaMin < 0
                          ? 'text-[#79747E]'
                          : 'text-[#003f87]'
                      }`}
                    >
                      {stop.etaMin === 0
                        ? 'Arriving'
                        : stop.etaMin > 0
                        ? `+${stop.etaMin} min`
                        : `${stop.etaMin} min`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f2f3fc] border-t border-[#79747E]/10 flex items-center justify-between text-xs text-[#424752]">
          <span>Live GPS feeds refreshed via LTA Datamall</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#003f87] text-white font-semibold hover:bg-[#0056b3] transition-colors"
          >
            Close Route
          </button>
        </div>
      </div>
    </div>
  );
};
