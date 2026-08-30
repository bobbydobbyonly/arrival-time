/**
 * Frontend LTA service helper calling backend proxy (/api/lta/*)
 * Note: Never contains API keys or secrets directly.
 */

export interface LtaBusArrivalResponse {
  'odata.metadata': string;
  BusStopCode: string;
  Services: Array<{
    ServiceNo: string;
    Operator: string;
    NextBus?: {
      OriginCode: string;
      DestinationCode: string;
      EstimatedArrival: string;
      Latitude: string;
      Longitude: string;
      VisitNumber: string;
      Load: 'SEA' | 'SDA' | 'LSD' | ''; // Seats Available, Standing Available, Limited Standing
      Feature: 'WAB' | ''; // Wheelchair Accessible Bus
      Type: 'SD' | 'DD' | 'BD'; // Single Deck, Double Deck, Bendy
    };
    NextBus2?: {
      OriginCode: string;
      DestinationCode: string;
      EstimatedArrival: string;
      Latitude: string;
      Longitude: string;
      VisitNumber: string;
      Load: 'SEA' | 'SDA' | 'LSD' | '';
      Feature: 'WAB' | '';
      Type: 'SD' | 'DD' | 'BD';
    };
    NextBus3?: {
      OriginCode: string;
      DestinationCode: string;
      EstimatedArrival: string;
      Latitude: string;
      Longitude: string;
      VisitNumber: string;
      Load: 'SEA' | 'SDA' | 'LSD' | '';
      Feature: 'WAB' | '';
      Type: 'SD' | 'DD' | 'BD';
    };
  }>;
}

export interface LtaCarparkItem {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string;
  AvailableLots: number;
  LotType: 'C' | 'H' | 'Y'; // Cars, Heavy Vehicles, Motorcycles
  Agency: 'HDB' | 'LTA' | 'URA';
}

export interface LtaCarparkResponse {
  'odata.metadata': string;
  value: LtaCarparkItem[];
}

export interface LtaTrafficIncident {
  Type: string;
  Latitude: number;
  Longitude: number;
  Message: string;
}

export interface LtaTrafficIncidentsResponse {
  'odata.metadata': string;
  value: LtaTrafficIncident[];
}

export interface LtaTrainAlertResponse {
  Status: number; // 1 = Normal, 2 = Disruptions
  AffectedSegments?: Array<{
    Line: string;
    Direction: string;
    Stations: string;
    FreePublicBus: string;
    FreeMRTShuttle: string;
    MRTShuttleDirection: string;
  }>;
  Message?: Array<{
    Content: string;
    CreatedDate: string;
  }>;
}

export async function fetchLtaBackendStatus(): Promise<{ ltaDataMallConfigured: boolean }> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) return { ltaDataMallConfigured: false };
    return await res.json();
  } catch {
    return { ltaDataMallConfigured: false };
  }
}

export async function fetchLiveBusArrivals(
  busStopCode: string,
  serviceNo?: string
): Promise<{ data?: LtaBusArrivalResponse; error?: string; isLive: boolean }> {
  try {
    const params = new URLSearchParams({ busStopCode });
    if (serviceNo) params.set('serviceNo', serviceNo);

    const res = await fetch(`/api/lta/bus-arrivals?${params.toString()}`);
    const json = await res.json();

    if (!res.ok) {
      return { error: json.error || 'Failed to fetch bus arrivals', isLive: false };
    }

    return { data: json, isLive: true };
  } catch (err: any) {
    return { error: err?.message || 'Network error', isLive: false };
  }
}

export async function fetchLiveTrainAlerts(): Promise<{
  data?: LtaTrainAlertResponse;
  error?: string;
}> {
  try {
    const res = await fetch('/api/lta/train-alerts');
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Failed to fetch train alerts' };
    return { data: json };
  } catch (err: any) {
    return { error: err?.message || 'Network error' };
  }
}

export async function fetchLiveCarparks(): Promise<{ data?: LtaCarparkResponse; error?: string }> {
  try {
    const res = await fetch('/api/lta/carparks');
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Failed to fetch carparks' };
    return { data: json };
  } catch (err: any) {
    return { error: err?.message || 'Network error' };
  }
}

export async function fetchLiveTrafficIncidents(): Promise<{
  data?: LtaTrafficIncidentsResponse;
  error?: string;
}> {
  try {
    const res = await fetch('/api/lta/traffic-incidents');
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Failed to fetch traffic incidents' };
    return { data: json };
  } catch (err: any) {
    return { error: err?.message || 'Network error' };
  }
}
