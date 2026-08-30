import React from 'react';
import { RotateCw, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { LtaTrainAlertResponse } from '../services/ltaService';

interface LiveSimulationBarProps {
  isLtaConfigured: boolean;
  isRefreshing: boolean;
  nextRefreshInSec: number;
  onRefresh: () => void;
  notifications: string[];
  trainAlerts?: LtaTrainAlertResponse | null;
}

export const LiveSimulationBar: React.FC<LiveSimulationBarProps> = ({
  isLtaConfigured,
  isRefreshing,
  nextRefreshInSec,
  onRefresh,
  notifications,
  trainAlerts,
}) => {
  const hasDisruption = trainAlerts && trainAlerts.Status === 2;

  return (
    <div className="space-y-2">
      {/* MRT Train Disruption Alert Banner if active */}
      {hasDisruption && (
        <div className="bg-[#ba1a1a] text-white p-3 rounded-xl shadow-md flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-white shrink-0" />
            <span className="font-semibold">
              Train Service Alert: Disruptions reported on rail network.
            </span>
          </div>
          <span className="text-[10px] text-white bg-white/20 px-2 py-0.5 rounded">LTA Alert</span>
        </div>
      )}

      {/* Toast Alert Banner if an alert fired */}
      {notifications.length > 0 && (
        <div className="bg-[#003f87] text-white p-3 rounded-xl shadow-md flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#a0f399] shrink-0" />
            <span className="font-semibold">{notifications[0]}</span>
          </div>
          <span className="text-[10px] text-[#bbd0ff] bg-white/10 px-2 py-0.5 rounded">Active</span>
        </div>
      )}

      {/* Live Sync Banner */}
      <div className="flex items-center justify-between bg-[#f2f3fc] border border-[#79747E]/10 px-3 py-1.5 rounded-lg text-xs text-[#424752]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B5E20] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1B5E20]"></span>
          </span>
          <span className="font-medium flex items-center gap-1.5">
            {isLtaConfigured ? (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-[#1B5E20]" />
                <span>LTA DataMall Live Feed</span>
              </>
            ) : (
              <span>LTA Real-time Stream</span>
            )}
            <span>•</span>
            <span>
              Next sync in <span className="font-bold text-[#003f87]">{nextRefreshInSec}s</span>
            </span>
          </span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 font-semibold text-[#003f87] hover:underline disabled:opacity-50"
        >
          <RotateCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Updating...' : 'Sync Now'}
        </button>
      </div>
    </div>
  );
};
