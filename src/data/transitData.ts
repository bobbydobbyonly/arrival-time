import { BusStop, TrainStation, ServiceRoute } from '../types';

export const INITIAL_BUS_STOPS: BusStop[] = [
  {
    id: '03223',
    name: 'Opp Tanjong Pagar Stn',
    road: 'Anson Rd',
    type: 'bus',
    isFavorite: true,
    distanceMeters: 85,
    walkTimeMin: 1,
    coordinates: { lat: 1.2758, lng: 103.8456 },
    services: [
      {
        serviceNo: '80',
        operator: 'SBS Transit',
        destination: 'HarbourFront Int',
        nextArrivalSec: 0, // Arriving
        subsequentArrivalSec: 540, // 9 min
        thirdArrivalSec: 1080, // 18 min
        crowd: 'medium',
        subsequentCrowd: 'low',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '145',
        operator: 'SBS Transit',
        destination: 'Buona Vista Ter',
        nextArrivalSec: 240, // 4 min
        subsequentArrivalSec: 720, // 12 min
        thirdArrivalSec: 1200, // 20 min
        crowd: 'low',
        subsequentCrowd: 'medium',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '10',
        operator: 'SBS Transit',
        destination: 'Kent Ridge Ter',
        nextArrivalSec: 420, // 7 min
        subsequentArrivalSec: 900, // 15 min
        thirdArrivalSec: 1380,
        crowd: 'high',
        subsequentCrowd: 'low',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '100',
        operator: 'SBS Transit',
        destination: 'Ghim Moh Ter',
        nextArrivalSec: 660, // 11 min
        subsequentArrivalSec: 1200, // 20 min
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Single Deck',
      },
      {
        serviceNo: '196',
        operator: 'SBS Transit',
        destination: 'Clementi Int',
        nextArrivalSec: 120, // 2 min
        subsequentArrivalSec: 480, // 8 min
        crowd: 'medium',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
    ],
  },
  {
    id: '03111',
    name: 'Aft Capital Tower',
    road: 'Robinson Rd',
    type: 'bus',
    isFavorite: false,
    distanceMeters: 190,
    walkTimeMin: 2,
    coordinates: { lat: 1.2775, lng: 103.8475 },
    services: [
      {
        serviceNo: '10',
        operator: 'SBS Transit',
        destination: 'Tampines Int',
        nextArrivalSec: 180, // 3 min
        subsequentArrivalSec: 600, // 10 min
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '75',
        operator: 'SMRT',
        destination: 'Gali Batu Ter',
        nextArrivalSec: 360, // 6 min
        subsequentArrivalSec: 840, // 14 min
        crowd: 'medium',
        wheelchairAccessible: true,
        busType: 'Single Deck',
      },
      {
        serviceNo: '97',
        operator: 'Tower Transit',
        destination: 'Jurong East Int',
        nextArrivalSec: 0, // Arriving
        subsequentArrivalSec: 480, // 8 min
        crowd: 'high',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '131',
        operator: 'SBS Transit',
        destination: 'St. Michael’s Ter',
        nextArrivalSec: 480, // 8 min
        subsequentArrivalSec: 1020, // 17 min
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Single Deck',
      },
    ],
  },
  {
    id: '03229',
    name: 'Tanjong Pagar Stn Exit C',
    road: 'Anson Rd',
    type: 'bus',
    isFavorite: false,
    distanceMeters: 140,
    walkTimeMin: 2,
    coordinates: { lat: 1.2764, lng: 103.8462 },
    services: [
      {
        serviceNo: '57',
        operator: 'SBS Transit',
        destination: 'Bishan Int',
        nextArrivalSec: 300, // 5 min
        subsequentArrivalSec: 780, // 13 min
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Single Deck',
      },
      {
        serviceNo: '167',
        operator: 'Tower Transit',
        destination: 'Sembawang Int',
        nextArrivalSec: 540, // 9 min
        subsequentArrivalSec: 1140, // 19 min
        crowd: 'medium',
        wheelchairAccessible: true,
        busType: 'Single Deck',
      },
      {
        serviceNo: '186',
        operator: 'SBS Transit',
        destination: 'Shenton Way Ter',
        nextArrivalSec: 60, // 1 min
        subsequentArrivalSec: 420, // 7 min
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
    ],
  },
  {
    id: '03218',
    name: 'Hub Synergy Pt',
    road: 'Anson Rd',
    type: 'bus',
    isFavorite: false,
    distanceMeters: 260,
    walkTimeMin: 3,
    coordinates: { lat: 1.2742, lng: 103.8447 },
    services: [
      {
        serviceNo: '70',
        operator: 'SBS Transit',
        destination: 'Yio Chu Kang Int',
        nextArrivalSec: 240, // 4 min
        subsequentArrivalSec: 660,
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '107',
        operator: 'SBS Transit',
        destination: 'Hougang Central Int',
        nextArrivalSec: 480, // 8 min
        subsequentArrivalSec: 960,
        crowd: 'medium',
        wheelchairAccessible: true,
        busType: 'Single Deck',
      },
    ],
  },
  {
    id: '05649',
    name: 'Chinatown Stn Exit E',
    road: 'Eu Tong Sen St',
    type: 'bus',
    isFavorite: false,
    distanceMeters: 650,
    walkTimeMin: 8,
    coordinates: { lat: 1.2845, lng: 103.8441 },
    services: [
      {
        serviceNo: '2',
        operator: 'Go-Ahead',
        destination: 'Changi Village Ter',
        nextArrivalSec: 180,
        subsequentArrivalSec: 600,
        crowd: 'medium',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '12',
        operator: 'Go-Ahead',
        destination: 'Pasir Ris Int',
        nextArrivalSec: 0,
        subsequentArrivalSec: 420,
        crowd: 'high',
        wheelchairAccessible: true,
        busType: 'Double Deck',
      },
      {
        serviceNo: '190',
        operator: 'SMRT',
        destination: 'Choa Chu Kang Int',
        nextArrivalSec: 360,
        subsequentArrivalSec: 720,
        crowd: 'low',
        wheelchairAccessible: true,
        busType: 'Bendy',
      },
    ],
  },
];

export const INITIAL_TRAIN_STATIONS: TrainStation[] = [
  {
    id: 'EW15',
    code: 'EW15',
    name: 'Tanjong Pagar',
    line: 'East West Line',
    lineCode: 'EW',
    lineColor: '#722b00', // matches screenshot theme
    type: 'mrt',
    isFavorite: true,
    distanceMeters: 110,
    walkTimeMin: 1,
    coordinates: { lat: 1.2765, lng: 103.8458 },
    arrivals: [
      {
        lineCode: 'EW',
        lineName: 'East West Line',
        lineColor: '#722b00',
        direction: 'Towards Pasir Ris',
        platform: 'Platform A',
        nextArrivalSec: 120, // 2 min
        subsequentArrivalSec: 360, // 6 min
        crowd: 'medium',
      },
      {
        lineCode: 'EW',
        lineName: 'East West Line',
        lineColor: '#722b00',
        direction: 'Towards Tuas Link',
        platform: 'Platform B',
        nextArrivalSec: 300, // 5 min
        subsequentArrivalSec: 540, // 9 min
        crowd: 'low',
      },
    ],
  },
  {
    id: 'EW14_NS26',
    code: 'EW14 • NS26',
    name: 'Raffles Place',
    line: 'East West & North South Lines',
    lineCode: 'EW • NS',
    lineColor: '#009645',
    type: 'mrt',
    isFavorite: false,
    distanceMeters: 450,
    walkTimeMin: 6,
    coordinates: { lat: 1.2831, lng: 103.8513 },
    arrivals: [
      {
        lineCode: 'EW',
        lineName: 'East West Line',
        lineColor: '#009645',
        direction: 'Towards Pasir Ris / Changi Airport',
        platform: 'Platform A',
        nextArrivalSec: 60, // 1 min
        subsequentArrivalSec: 240, // 4 min
        crowd: 'high',
      },
      {
        lineCode: 'NS',
        lineName: 'North South Line',
        lineColor: '#D42E12',
        direction: 'Towards Jurong East via Woodlands',
        platform: 'Platform B',
        nextArrivalSec: 180, // 3 min
        subsequentArrivalSec: 420, // 7 min
        crowd: 'medium',
      },
      {
        lineCode: 'NS',
        lineName: 'North South Line',
        lineColor: '#D42E12',
        direction: 'Towards Marina South Pier',
        platform: 'Platform D',
        nextArrivalSec: 300, // 5 min
        subsequentArrivalSec: 600, // 10 min
        crowd: 'low',
      },
    ],
  },
  {
    id: 'DT18',
    code: 'DT18',
    name: 'Telok Ayer',
    line: 'Downtown Line',
    lineCode: 'DT',
    lineColor: '#005EC4',
    type: 'mrt',
    isFavorite: false,
    distanceMeters: 380,
    walkTimeMin: 5,
    coordinates: { lat: 1.2822, lng: 103.8485 },
    arrivals: [
      {
        lineCode: 'DT',
        lineName: 'Downtown Line',
        lineColor: '#005EC4',
        direction: 'Towards Expo',
        platform: 'Platform A',
        nextArrivalSec: 120, // 2 min
        subsequentArrivalSec: 360, // 6 min
        crowd: 'low',
      },
      {
        lineCode: 'DT',
        lineName: 'Downtown Line',
        lineColor: '#005EC4',
        direction: 'Towards Bukit Panjang',
        platform: 'Platform B',
        nextArrivalSec: 240, // 4 min
        subsequentArrivalSec: 480, // 8 min
        crowd: 'low',
      },
    ],
  },
  {
    id: 'TE18',
    code: 'TE18',
    name: 'Maxwell',
    line: 'Thomson-East Coast Line',
    lineCode: 'TE',
    lineColor: '#9D5B25',
    type: 'mrt',
    isFavorite: false,
    distanceMeters: 420,
    walkTimeMin: 5,
    coordinates: { lat: 1.2804, lng: 103.8436 },
    arrivals: [
      {
        lineCode: 'TE',
        lineName: 'Thomson-East Coast Line',
        lineColor: '#9D5B25',
        direction: 'Towards Bayshore',
        platform: 'Platform A',
        nextArrivalSec: 0, // Arriving
        subsequentArrivalSec: 300, // 5 min
        crowd: 'low',
      },
      {
        lineCode: 'TE',
        lineName: 'Thomson-East Coast Line',
        lineColor: '#9D5B25',
        direction: 'Towards Woodlands North',
        platform: 'Platform B',
        nextArrivalSec: 180, // 3 min
        subsequentArrivalSec: 480, // 8 min
        crowd: 'low',
      },
    ],
  },
  {
    id: 'NE4_DT19',
    code: 'NE4 • DT19',
    name: 'Chinatown',
    line: 'North East & Downtown Lines',
    lineCode: 'NE • DT',
    lineColor: '#8F1489',
    type: 'mrt',
    isFavorite: false,
    distanceMeters: 720,
    walkTimeMin: 9,
    coordinates: { lat: 1.2848, lng: 103.8438 },
    arrivals: [
      {
        lineCode: 'NE',
        lineName: 'North East Line',
        lineColor: '#8F1489',
        direction: 'Towards Punggol',
        platform: 'Platform A',
        nextArrivalSec: 120, // 2 min
        subsequentArrivalSec: 360,
        crowd: 'medium',
      },
      {
        lineCode: 'NE',
        lineName: 'North East Line',
        lineColor: '#8F1489',
        direction: 'Towards HarbourFront',
        platform: 'Platform B',
        nextArrivalSec: 240, // 4 min
        subsequentArrivalSec: 480,
        crowd: 'low',
      },
    ],
  },
];

export const SERVICE_ROUTES: Record<string, ServiceRoute> = {
  '80': {
    serviceNo: '80',
    operator: 'SBS Transit',
    origin: 'Sengkang Int',
    destination: 'HarbourFront Int',
    operatingHours: '05:30 - 23:45 daily',
    frequencyPeak: '6 - 9 min',
    frequencyOffPeak: '10 - 13 min',
    stops: [
      { stopId: '67009', stopName: 'Sengkang Int', road: 'Compassvale Rd', seq: 1, etaMin: -35 },
      { stopId: '64009', stopName: 'Hougang Central Int', road: 'Hougang Ctrl', seq: 8, etaMin: -24 },
      { stopId: '63039', stopName: 'Kovan Stn Exit C', road: 'Upp Serangoon Rd', seq: 14, etaMin: -16 },
      { stopId: '61079', stopName: 'Opp Serangoon Stn', road: 'Upp Serangoon Rd', seq: 21, etaMin: -9 },
      { stopId: '01112', stopName: 'Bugis Stn Exit D', road: 'Victoria St', seq: 32, etaMin: -4 },
      { stopId: '04179', stopName: 'Opp The Treasury', road: 'Hill St', seq: 35, etaMin: -2 },
      { stopId: '03223', stopName: 'Opp Tanjong Pagar Stn', road: 'Anson Rd', seq: 41, etaMin: 0, hasBusNow: true, busCrowd: 'medium', busType: 'Double Deck' },
      { stopId: '03218', stopName: 'Hub Synergy Pt', road: 'Anson Rd', seq: 42, etaMin: 2 },
      { stopId: '14019', stopName: 'Keppel Workshop', road: 'Keppel Rd', seq: 45, etaMin: 5 },
      { stopId: '14141', stopName: 'HarbourFront Stn Exit B', road: 'Telok Blangah Rd', seq: 49, etaMin: 9, hasBusNow: true, busCrowd: 'low', busType: 'Double Deck' },
      { stopId: '14009', stopName: 'HarbourFront Int', road: 'Seah Im Rd', seq: 50, etaMin: 12 },
    ],
  },
  '145': {
    serviceNo: '145',
    operator: 'SBS Transit',
    origin: 'Toa Payoh Int',
    destination: 'Buona Vista Ter',
    operatingHours: '05:45 - 23:50 daily',
    frequencyPeak: '7 - 10 min',
    frequencyOffPeak: '11 - 14 min',
    stops: [
      { stopId: '52009', stopName: 'Toa Payoh Int', road: 'Lor 6 Toa Payoh', seq: 1, etaMin: -28 },
      { stopId: '50029', stopName: 'Balestier Twrs', road: 'Balestier Rd', seq: 7, etaMin: -19 },
      { stopId: '07531', stopName: 'Farrer Pk Stn Exit C', road: 'Serangoon Rd', seq: 15, etaMin: -12 },
      { stopId: '04121', stopName: 'Clark Quay Stn Exit E', road: 'Eu Tong Sen St', seq: 24, etaMin: -5 },
      { stopId: '03223', stopName: 'Opp Tanjong Pagar Stn', road: 'Anson Rd', seq: 30, etaMin: 4, hasBusNow: true, busCrowd: 'low', busType: 'Double Deck' },
      { stopId: '14119', stopName: 'Opp Vivocity', road: 'Telok Blangah Rd', seq: 36, etaMin: 11 },
      { stopId: '14241', stopName: 'Alexandra Hospital', road: 'Alexandra Rd', seq: 42, etaMin: 17 },
      { stopId: '11361', stopName: 'Buona Vista Ter', road: 'Holland Dr', seq: 48, etaMin: 24 },
    ],
  },
  '10': {
    serviceNo: '10',
    operator: 'SBS Transit',
    origin: 'Tampines Int',
    destination: 'Kent Ridge Ter',
    operatingHours: '05:30 - 23:30 daily',
    frequencyPeak: '5 - 8 min',
    frequencyOffPeak: '8 - 12 min',
    stops: [
      { stopId: '76009', stopName: 'Tampines Int', road: 'Tampines Ave 4', seq: 1, etaMin: -40 },
      { stopId: '84019', stopName: 'Bedok Stn Exit B', road: 'New Upp Changi Rd', seq: 12, etaMin: -26 },
      { stopId: '92019', stopName: 'Marine Parade Stn', road: 'Marine Parade Rd', seq: 25, etaMin: -14 },
      { stopId: '03111', stopName: 'Aft Capital Tower', road: 'Robinson Rd', seq: 38, etaMin: -2 },
      { stopId: '03223', stopName: 'Opp Tanjong Pagar Stn', road: 'Anson Rd', seq: 40, etaMin: 7, hasBusNow: true, busCrowd: 'high', busType: 'Double Deck' },
      { stopId: '14011', stopName: 'VivoCity', road: 'Telok Blangah Rd', seq: 46, etaMin: 14 },
      { stopId: '16009', stopName: 'Kent Ridge Ter', road: 'Clementi Rd', seq: 55, etaMin: 28 },
    ],
  },
  '196': {
    serviceNo: '196',
    operator: 'SBS Transit',
    origin: 'Bedok Int',
    destination: 'Clementi Int',
    operatingHours: '05:30 - 23:45 daily',
    frequencyPeak: '6 - 9 min',
    frequencyOffPeak: '9 - 13 min',
    stops: [
      { stopId: '84009', stopName: 'Bedok Int', road: 'Bedok North Ave 1', seq: 1, etaMin: -32 },
      { stopId: '92049', stopName: 'Parkway Parade', road: 'Marine Parade Rd', seq: 15, etaMin: -16 },
      { stopId: '03223', stopName: 'Opp Tanjong Pagar Stn', road: 'Anson Rd', seq: 31, etaMin: 2, hasBusNow: true, busCrowd: 'medium', busType: 'Double Deck' },
      { stopId: '11009', stopName: 'Queensway Shop Ctr', road: 'Jln Bukit Merah', seq: 39, etaMin: 12 },
      { stopId: '17009', stopName: 'Clementi Int', road: 'Clementi Ave 3', seq: 50, etaMin: 26 },
    ],
  },
};
