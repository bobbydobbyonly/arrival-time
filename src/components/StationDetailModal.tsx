import React, { useState } from 'react';
import { BusStop, TrainStation } from '../types';
import { X, Bus, Train, Star, Bell, BellRing, Users, Accessibility, ArrowRight } from 'lucide-react';

interface StationDetailModalProps {
  busStop?: BusStop | null;
  trainStation?: TrainStation | null;
  onClose: () => void;
  onToggleBusFavorite: (stopId: string) => void;
  onToggleTrainFavorite: (stationId: string) => void;
  onSelectService?: (serviceNo: string) => void;
  onSetAlarm: (title: string) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  busStop,
  trainStation,
  onClose,
  onToggleBusFavorite,
  onToggleTrainFavorite,
  onSelectService,
  onSetAlarm,
}) => {
  const [alarmSet, setAlarmSet] = useState<Record<string, boolean>>({});

  if (!busStop && !trainStation) return null;

  const handleToggleAlarm = (serviceId: string, name: string) => {
    const isCurrentlySet = alarmSet[serviceId];
    setAlarmSet((prev) => ({ ...prev, [serviceId]: !isCurrentlySet }));
    if (!isCurrentlySet) {
      onSetAlarm(`Alarm set! We will alert you 2 minutes before ${name} arrives.`);
    }
  };

  return (
    <div
      id="station-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 transition-all"
    >
      <div
        id="station-detail-modal"
        className="w-full max-w-[650px] max-h-[90vh] flex flex-col bg-[#ffffff] rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#f2f3fc] border-b border-[#79747E]/20 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 ${
                busStop ? 'bg-[#003f87]' : 'bg-[#722b00]'
              }`}
            >
              {busStop ? <Bus className="h-6 w-6" /> : <Train className="h-6 w-6" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#424752] uppercase tracking-wider">
                {busStop ? 'Bus Stop Departure Board' : 'MRT Station Live Platforms'}
              </div>
              <h2 className="text-xl font-bold text-[#191c21] mt-0.5">
                {busStop ? busStop.name : trainStation?.name}
              </h2>
              <p className="text-xs text-[#424752] mt-0.5">
                {busStop
                  ? `Stop ID: ${busStop.id} • ${busStop.road}`
                  : `${trainStation?.code} • ${trainStation?.line}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {busStop ? (
              <button
                onClick={() => onToggleBusFavorite(busStop.id)}
                className="p-2 text-[#003f87] hover:bg-[#e1e2ea] rounded-full transition-colors"
                title={busStop.isFavorite ? 'Unpin stop' : 'Pin to favorites'}
              >
                <Star
                  className={`w-6 h-6 ${
                    busStop.isFavorite ? 'fill-[#003f87] text-[#003f87]' : 'text-[#79747E]'
                  }`}
                />
              </button>
            ) : trainStation ? (
              <button
                onClick={() => onToggleTrainFavorite(trainStation.id)}
                className="p-2 text-[#003f87] hover:bg-[#e1e2ea] rounded-full transition-colors"
                title={trainStation.isFavorite ? 'Unpin station' : 'Pin to favorites'}
              >
                <Star
                  className={`w-6 h-6 ${
                    trainStation.isFavorite ? 'fill-[#003f87] text-[#003f87]' : 'text-[#79747E]'
                  }`}
                />
              </button>
            ) : null}

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#424752] hover:bg-[#e1e2ea] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Departure List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#79747E]/10">
          {busStop &&
            busStop.services.map((svc) => {
              const isArriving = svc.nextArrivalSec <= 30;
              const minutes = Math.ceil(svc.nextArrivalSec / 60);
              const subMinutes =
                svc.subsequentArrivalSec !== undefined
                  ? Math.ceil(svc.subsequentArrivalSec / 60)
                  : null;
              const thirdMinutes =
                svc.thirdArrivalSec !== undefined
                  ? Math.ceil(svc.thirdArrivalSec / 60)
                  : null;
              const isAlarmed = alarmSet[svc.serviceNo];

              return (
                <div
                  key={svc.serviceNo}
                  className="p-4 flex items-center justify-between hover:bg-[#f9f9ff] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => onSelectService && onSelectService(svc.serviceNo)}
                      className="w-14 h-14 bg-[#0056b3] text-white rounded-lg flex items-center justify-center font-bold text-2xl tracking-tight cursor-pointer hover:bg-[#003f87] transition-colors shadow-2xs"
                      title="Click to view route map"
                    >
                      {svc.serviceNo}
                    </div>
                    <div>
                      <div
                        onClick={() => onSelectService && onSelectService(svc.serviceNo)}
                        className="text-sm font-bold text-[#191c21] hover:text-[#003f87] cursor-pointer flex items-center gap-1"
                      >
                        To {svc.destination}
                        <ArrowRight className="h-3.5 w-3.5 text-[#79747E]" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#424752]">{svc.operator}</span>
                        <span className="text-xs bg-[#f2f3fc] px-2 py-0.5 rounded text-[#003f87] font-semibold">
                          {svc.busType}
                        </span>
                        {svc.wheelchairAccessible && (
                          <Accessibility className="h-3.5 w-3.5 text-[#0056b3]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Arrival Times & Alarm Action */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {isArriving ? (
                        <div className="inline-block px-2 py-1 bg-[#1B5E20] text-white font-bold text-xs rounded mb-1 animate-pulse">
                          Arriving
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-[#191c21]">
                          {minutes} <span className="text-xs font-normal text-[#424752]">min</span>
                        </div>
                      )}

                      <div className="text-xs text-[#424752] flex items-center justify-end gap-1.5">
                        {subMinutes && <span>Next: {subMinutes}m</span>}
                        {thirdMinutes && <span>• 3rd: {thirdMinutes}m</span>}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAlarm(svc.serviceNo, `Bus ${svc.serviceNo}`)}
                      className={`p-2 rounded-full transition-colors ${
                        isAlarmed
                          ? 'bg-[#003f87] text-white'
                          : 'text-[#79747E] hover:bg-[#f2f3fc] hover:text-[#003f87]'
                      }`}
                      title={isAlarmed ? 'Alarm active' : 'Set arrival alert'}
                    >
                      {isAlarmed ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              );
            })}

          {trainStation &&
            trainStation.arrivals.map((arr, idx) => {
              const isArriving = arr.nextArrivalSec <= 30;
              const minutes = Math.ceil(arr.nextArrivalSec / 60);
              const subMinutes =
                arr.subsequentArrivalSec !== undefined
                  ? Math.ceil(arr.subsequentArrivalSec / 60)
                  : null;
              const isAlarmed = alarmSet[`train-${idx}`];

              return (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between hover:bg-[#f9f9ff] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-14 rounded-full"
                      style={{ backgroundColor: arr.lineColor }}
                    />
                    <div>
                      <div className="text-sm font-bold text-[#191c21]">{arr.direction}</div>
                      <div className="text-xs text-[#424752] mt-0.5">{arr.platform}</div>
                      <div className="text-xs text-[#722b00] font-semibold mt-1">
                        {arr.lineName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {isArriving ? (
                        <div className="inline-block px-2 py-1 bg-[#1B5E20] text-white font-bold text-xs rounded mb-1 animate-pulse">
                          Arriving
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-[#191c21]">
                          {minutes} <span className="text-xs font-normal text-[#424752]">min</span>
                        </div>
                      )}
                      {subMinutes && (
                        <div className="text-xs text-[#424752]">Next: {subMinutes} min</div>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleAlarm(`train-${idx}`, `${arr.direction}`)}
                      className={`p-2 rounded-full transition-colors ${
                        isAlarmed
                          ? 'bg-[#003f87] text-white'
                          : 'text-[#79747E] hover:bg-[#f2f3fc] hover:text-[#003f87]'
                      }`}
                      title={isAlarmed ? 'Alarm active' : 'Set arrival alert'}
                    >
                      {isAlarmed ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f2f3fc] border-t border-[#79747E]/10 flex items-center justify-between text-xs text-[#424752]">
          <span>Arrival frequencies update automatically every 15s</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#003f87] text-white font-semibold hover:bg-[#0056b3] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
