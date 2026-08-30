export type TransitType = 'bus' | 'mrt';

export type CrowdLevel = 'low' | 'medium' | 'high'; // 'low' = Seats Available, 'medium' = Standing Available, 'high' = Limited Standing

export interface BusArrival {
  serviceNo: string;
  operator: 'SBS Transit' | 'SMRT' | 'Tower Transit' | 'Go-Ahead';
  destination: string;
  nextArrivalSec: number; // in seconds for live countdown
  subsequentArrivalSec?: number;
  thirdArrivalSec?: number;
  crowd: CrowdLevel;
  subsequentCrowd?: CrowdLevel;
  wheelchairAccessible: boolean;
  busType: 'Single Deck' | 'Double Deck' | 'Bendy';
}

export interface TrainArrival {
  lineCode: string; // 'EW', 'NS', 'DT', 'CC', 'TE', 'NE'
  lineName: string; // 'East West Line', 'North South Line', etc.
  lineColor: string; // '#009645', '#D42E12', '#005EC4', etc.
  direction: string; // 'Towards Pasir Ris'
  platform: string; // 'Platform A'
  nextArrivalSec: number;
  subsequentArrivalSec?: number;
  crowd?: CrowdLevel;
}

export interface BusStop {
  id: string; // e.g. "03223"
  name: string; // e.g. "Opp Tanjong Pagar Stn"
  road: string; // e.g. "Anson Rd"
  type: 'bus';
  services: BusArrival[];
  isFavorite: boolean;
  distanceMeters?: number;
  walkTimeMin?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TrainStation {
  id: string; // e.g. "EW15"
  code: string; // e.g. "EW15"
  name: string; // e.g. "Tanjong Pagar"
  line: string; // e.g. "East West Line"
  lineCode: string;
  lineColor: string;
  type: 'mrt';
  arrivals: TrainArrival[];
  isFavorite: boolean;
  distanceMeters?: number;
  walkTimeMin?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RouteStop {
  stopId: string;
  stopName: string;
  road: string;
  seq: number;
  etaMin: number;
  hasBusNow?: boolean;
  busCrowd?: CrowdLevel;
  busType?: 'Single Deck' | 'Double Deck' | 'Bendy';
}

export interface ServiceRoute {
  serviceNo: string;
  operator: string;
  origin: string;
  destination: string;
  operatingHours: string;
  frequencyPeak: string;
  frequencyOffPeak: string;
  stops: RouteStop[];
}

export type ActiveTab = 'home' | 'search' | 'nearby';
