import { Router, Request, Response } from 'express';
import { fetchLtaData, getLtaAccountKey } from './ltaClient';

export const apiRouter = Router();

/**
 * Health & Configuration check
 */
apiRouter.get('/status', (req: Request, res: Response) => {
  const hasKey = Boolean(getLtaAccountKey());
  res.json({
    status: 'ok',
    ltaDataMallConfigured: hasKey,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Next buses at a stop (LTA v3: 20-second refresh)
 * Endpoint: /ltaodataservice/v3/BusArrival?BusStopCode=83139[&ServiceNo=15]
 */
apiRouter.get('/lta/bus-arrivals', async (req: Request, res: Response) => {
  const busStopCode = req.query.busStopCode as string;
  const serviceNo = req.query.serviceNo as string | undefined;

  if (!busStopCode) {
    res.status(400).json({ error: 'busStopCode query parameter is required' });
    return;
  }

  const params: Record<string, string> = {
    BusStopCode: busStopCode,
  };

  if (serviceNo) {
    params.ServiceNo = serviceNo;
  }

  const result = await fetchLtaData<any>('v3/BusArrival', params);

  if (result.error) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
});

/**
 * MRT/LRT status & train service alerts
 * Endpoint: /ltaodataservice/TrainServiceAlerts
 */
apiRouter.get('/lta/train-alerts', async (req: Request, res: Response) => {
  const result = await fetchLtaData<any>('TrainServiceAlerts');

  if (result.error) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
});

/**
 * Live carpark lots (HDB + LTA + URA)
 * Endpoint: /ltaodataservice/CarParkAvailabilityv2
 */
apiRouter.get('/lta/carparks', async (req: Request, res: Response) => {
  const result = await fetchLtaData<any>('CarParkAvailabilityv2');

  if (result.error) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
});

/**
 * Traffic incidents
 * Endpoint: /ltaodataservice/TrafficIncidents
 */
apiRouter.get('/lta/traffic-incidents', async (req: Request, res: Response) => {
  const result = await fetchLtaData<any>('TrafficIncidents');

  if (result.error) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
});
