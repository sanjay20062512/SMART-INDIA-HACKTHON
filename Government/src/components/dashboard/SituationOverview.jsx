import React from 'react';
import { MetricCard } from '../common/MetricCard';
import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export function SituationOverview({ data, onRefresh, lastUpdated }) {
  return (
    <section className="situation-overview-section">
      <div className="overview-header">
        <div className="overview-titles">
          <span className="system-label">REAL-TIME TELEMETRY</span>
          <h2 className="section-title">
            <span>SITUATION OVERVIEW — ERODE SURVEILLANCE SECTOR</span>
          </h2>
        </div>

        <div className="overview-meta">
          <span className="sync-note">
            <ShieldCheck size={14} color="var(--govt-forest)" />
            <span>Biosecurity Protocol: Level 3 Active</span>
          </span>
          <button 
            className="btn btn-secondary btn-sm refresh-btn"
            onClick={onRefresh}
            title="Refresh Epizootic Telemetry"
          >
            <RefreshCw size={13} />
            <span>SYNC DATA</span>
          </button>
        </div>
      </div>

      <div className="situation-grid">
        {/* Metric 1: Total Animals Monitored */}
        <MetricCard 
          label={data.totalMonitored.label}
          value={data.totalMonitored.value.toLocaleString('en-IN')}
          trend={data.totalMonitored.trend}
          trendPositive={data.totalMonitored.trendPositive}
          comparison={data.totalMonitored.comparison}
          status={data.totalMonitored.status}
        />

        {/* Metric 2: Active Cases */}
        <MetricCard 
          label={data.activeCases.label}
          value={data.activeCases.value.toLocaleString('en-IN')}
          trend={data.activeCases.trend}
          trendPositive={data.activeCases.trendPositive}
          comparison={data.activeCases.comparison}
          status={data.activeCases.status}
        />

        {/* Metric 3: Suspected Outbreaks (Prominent) */}
        <MetricCard 
          label={data.suspectedOutbreaks.label}
          value={data.suspectedOutbreaks.value < 10 ? `0${data.suspectedOutbreaks.value}` : data.suspectedOutbreaks.value}
          trend={data.suspectedOutbreaks.trend}
          trendPositive={data.suspectedOutbreaks.trendPositive}
          comparison={data.suspectedOutbreaks.comparison}
          status={data.suspectedOutbreaks.status}
          isProminent={true}
        />

        {/* Metric 4: High-Risk Zones */}
        <MetricCard 
          label={data.highRiskZones.label}
          value={data.highRiskZones.value < 10 ? `0${data.highRiskZones.value}` : data.highRiskZones.value}
          trend={data.highRiskZones.trend}
          trendPositive={data.highRiskZones.trendPositive}
          comparison={data.highRiskZones.comparison}
          status={data.highRiskZones.status}
          isProminent={true}
        />

        {/* Metric 5: Mortality */}
        <MetricCard 
          label={data.mortality.label}
          value={data.mortality.value.toLocaleString('en-IN')}
          trend={data.mortality.trend}
          trendPositive={data.mortality.trendPositive}
          comparison={data.mortality.comparison}
          status={data.mortality.status}
        />

        {/* Metric 6: Vaccination Coverage */}
        <MetricCard 
          label={data.vaccinationCoverage.label}
          value={data.vaccinationCoverage.value}
          trend={data.vaccinationCoverage.trend}
          trendPositive={data.vaccinationCoverage.trendPositive}
          comparison={data.vaccinationCoverage.comparison}
          status={data.vaccinationCoverage.status}
        />
      </div>

      <style>{`
        .situation-overview-section {
          margin-bottom: 24px;
        }

        .overview-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .overview-titles {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .overview-meta {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .sync-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .refresh-btn {
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }

        .situation-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }

        @media (max-width: 1400px) {
          .situation-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .situation-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .situation-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
