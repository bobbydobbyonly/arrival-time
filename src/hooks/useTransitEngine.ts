import { useState, useEffect, useCallback, useRef } from 'react';
import { BusStop, TrainStation, BusArrival, CrowdLevel } from '../types';
import { INITIAL_BUS_STOPS, INITIAL_TRAIN_STATIONS } from '../data/transitData';
import {
  fetchLtaBackendStatus,
  fetchLiveBusArrivals,
  fetchLiveTrainAlerts,
  fetchLiveTrafficIncidents,
  fetchLiveCarparks,
  LtaCarparkItem,
  LtaTrafficIncident,
  LtaTrainAlertResponse,
} from '../services/ltaService';

const FAVORITES_STORAGE_KEY = 'nextride_favorites_v1';

// Helper to convert LTA load code to app crowd level
function parseLtaLoad(load?: string): CrowdLevel {
  if (load === 'LSD') return 'high';
  if (load === 'SDA') return 'medium';
  return 'low';
}

// Helper to calculate seconds from current time to LTA ISO timestamp
function parseArrivalSec(isoString?: string): number {
  if (!isoString) return 600;
  const target = new Date(isoString).getTime();
  const diffSec = Math.floor((target - Date.now()) / 1000);
  return Math.max(0, diffSec);
}

export function useTransitEngine() {
  const [busStops, setBusStops] = useState<BusStop[]>(() => {
    try {
      const saved = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_buses`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return INITIAL_BUS_STOPS.map((stop) => ({
          ...stop,
          isFavorite: parsed[stop.id] ?? stop.isFavorite,
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_BUS_STOPS;
  });

  const [trainStations, setTrainStations] = useState<TrainStation[]>(() => {
    try {
      const saved = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_trains`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return INITIAL_TRAIN_STATIONS.map((station) => ({
          ...station,
          isFavorite: parsed[station.id] ?? station.isFavorite,
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_TRAIN_STATIONS;
  });

  const [isLtaConfigured, setIsLtaConfigured] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [nextRefreshInSec, setNextRefreshInSec] = useState<number>(20); // 20-second LTA refresh cycle
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1 = 1x real time, 5 = 5x fast forward, 0 = paused
  const [notifications, setNotifications] = useState<string[]>([]);
  const [trainAlerts, setTrainAlerts] = useState<LtaTrainAlertResponse | null>(null);
  const [trafficIncidents, setTrafficIncidents] = useState<LtaTrafficIncident[]>([]);
  const [carparks, setCarparks] = useState<LtaCarparkItem[]>([]);
  const notifiedServices = useRef<Set<string>>(new Set());

  // Check backend configuration on mount
  useEffect(() => {
    fetchLtaBackendStatus().then((status) => {
      setIsLtaConfigured(status.ltaDataMallConfigured);
    });
  }, []);

  // Save favorites changes to localStorage
  const saveFavorites = useCallback((bStops: BusStop[], tStations: TrainStation[]) => {
    try {
      const busFavs: Record<string, boolean> = {};
      bStops.forEach((b) => {
        busFavs[b.id] = b.isFavorite;
      });
      const trainFavs: Record<string, boolean> = {};
      tStations.forEach((t) => {
        trainFavs[t.id] = t.isFavorite;
      });
      localStorage.setItem(`${FAVORITES_STORAGE_KEY}_buses`, JSON.stringify(busFavs));
      localStorage.setItem(`${FAVORITES_STORAGE_KEY}_trains`, JSON.stringify(trainFavs));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, []);

  // Toggle favorite for bus stop
  const toggleBusFavorite = useCallback(
    (stopId: string) => {
      setBusStops((prev) => {
        const updated = prev.map((s) =>
          s.id === stopId ? { ...s, isFavorite: !s.isFavorite } : s
        );
        saveFavorites(updated, trainStations);
        return updated;
      });
    },
    [trainStations, saveFavorites]
  );

  // Toggle favorite for train station
  const toggleTrainFavorite = useCallback(
    (stationId: string) => {
      setTrainStations((prev) => {
        const updated = prev.map((s) =>
          s.id === stationId ? { ...s, isFavorite: !s.isFavorite } : s
        );
        saveFavorites(busStops, updated);
        return updated;
      });
    },
    [busStops, saveFavorites]
  );

  // Add custom alert reminder
  const addAlertReminder = useCallback((title: string) => {
    setNotifications((prev) => [title, ...prev].slice(0, 5));
  }, []);

  // Refresh data from LTA backend API if key configured, or trigger realistic countdown updates
  const refreshArrivals = useCallback(async () => {
    setIsRefreshing(true);

    try {
      // 1. Fetch live train service alerts (MRT/LRT disruptions & status)
      const trainAlertRes = await fetchLiveTrainAlerts();
      if (trainAlertRes.data) {
        setTrainAlerts(trainAlertRes.data);
      }

      // 2. Fetch live traffic incidents
      const trafficRes = await fetchLiveTrafficIncidents();
      if (trafficRes.data?.value) {
        setTrafficIncidents(trafficRes.data.value.slice(0, 10));
      }

      // 3. Fetch live carpark lots
      const carparkRes = await fetchLiveCarparks();
      if (carparkRes.data?.value) {
        setCarparks(carparkRes.data.value.slice(0, 20));
      }

      // 4. Fetch live bus arrivals from backend proxy for active bus stops
      const updatedBusStops = await Promise.all(
        busStops.map(async (stop) => {
          const ltaRes = await fetchLiveBusArrivals(stop.id);
          if (ltaRes.isLive && ltaRes.data?.Services?.length) {
            const apiServices = ltaRes.data.Services;
            const updatedServices: BusArrival[] = apiServices.map((svc) => {
              const nextSec = parseArrivalSec(svc.NextBus?.EstimatedArrival);
              const subSec = svc.NextBus2?.EstimatedArrival
                ? parseArrivalSec(svc.NextBus2.EstimatedArrival)
                : undefined;
              const thirdSec = svc.NextBus3?.EstimatedArrival
                ? parseArrivalSec(svc.NextBus3.EstimatedArrival)
                : undefined;

              return {
                serviceNo: svc.ServiceNo,
                operator: (svc.Operator as any) || 'SBS Transit',
                destination: svc.NextBus?.DestinationCode || 'Interchange',
                nextArrivalSec: nextSec,
                subsequentArrivalSec: subSec,
                thirdArrivalSec: thirdSec,
                crowd: parseLtaLoad(svc.NextBus?.Load),
                subsequentCrowd: parseLtaLoad(svc.NextBus2?.Load),
                wheelchairAccessible: svc.NextBus?.Feature === 'WAB',
                busType:
                  svc.NextBus?.Type === 'DD'
                    ? 'Double Deck'
                    : svc.NextBus?.Type === 'BD'
                    ? 'Bendy'
                    : 'Single Deck',
              };
            });

            return {
              ...stop,
              services: updatedServices.length > 0 ? updatedServices : stop.services,
            };
          }

          // Fallback simulation refresh
          return {
            ...stop,
            services: stop.services.map((s) => ({
              ...s,
              nextArrivalSec: s.nextArrivalSec <= 0 ? 0 : Math.max(0, s.nextArrivalSec),
            })),
          };
        })
      );

      setBusStops(updatedBusStops);
      setLastRefreshed(new Date());
      setNextRefreshInSec(20);
    } catch (err) {
      console.warn('Refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [busStops]);

  // Live countdown timer loop
  useEffect(() => {
    if (simSpeed === 0) return;

    const interval = setInterval(() => {
      setNextRefreshInSec((prev) => {
        if (prev <= 1) {
          refreshArrivals();
          return 20;
        }
        return prev - 1;
      });

      // Update bus arrivals countdown
      setBusStops((prevStops) =>
        prevStops.map((stop) => ({
          ...stop,
          services: stop.services.map((svc) => {
            let nextSec = svc.nextArrivalSec - simSpeed;
            let subSec =
              svc.subsequentArrivalSec !== undefined
                ? svc.subsequentArrivalSec - simSpeed
                : undefined;
            let thirdSec =
              svc.thirdArrivalSec !== undefined ? svc.thirdArrivalSec - simSpeed : undefined;

            // When a bus arrives (reaches -30s), roll over to subsequent
            if (nextSec < -30) {
              nextSec = subSec !== undefined ? Math.max(0, subSec) : 600;
              subSec = thirdSec !== undefined ? thirdSec : nextSec + 540;
              thirdSec = subSec + 600;
            }

            // Check if arriving soon for toast alerts
            if (nextSec === 0 && !notifiedServices.current.has(`${stop.id}-${svc.serviceNo}`)) {
              notifiedServices.current.add(`${stop.id}-${svc.serviceNo}`);
            }

            return {
              ...svc,
              nextArrivalSec: nextSec,
              subsequentArrivalSec: subSec,
              thirdArrivalSec: thirdSec,
            };
          }),
        }))
      );

      // Update train arrivals countdown
      setTrainStations((prevStations) =>
        prevStations.map((stn) => ({
          ...stn,
          arrivals: stn.arrivals.map((arr) => {
            let nextSec = arr.nextArrivalSec - simSpeed;
            let subSec =
              arr.subsequentArrivalSec !== undefined
                ? arr.subsequentArrivalSec - simSpeed
                : undefined;

            if (nextSec < -20) {
              nextSec = subSec !== undefined ? Math.max(0, subSec) : 300;
              subSec = nextSec + 240;
            }

            return {
              ...arr,
              nextArrivalSec: nextSec,
              subsequentArrivalSec: subSec,
            };
          }),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [simSpeed, refreshArrivals]);

  return {
    busStops,
    trainStations,
    isLtaConfigured,
    isRefreshing,
    lastRefreshed,
    nextRefreshInSec,
    simSpeed,
    setSimSpeed,
    notifications,
    trainAlerts,
    trafficIncidents,
    carparks,
    addAlertReminder,
    refreshArrivals,
    toggleBusFavorite,
    toggleTrainFavorite,
  };
}
