import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { SituationOverview } from './components/dashboard/SituationOverview';
import { OutbreakEarlyWarning } from './components/dashboard/OutbreakEarlyWarning';
import { CasePipeline } from './components/dashboard/CasePipeline';
import { RiskMap } from './components/gis/RiskMap';
import { OutbreakTable } from './components/outbreaks/OutbreakTable';
import { ContainmentModal } from './components/outbreaks/ContainmentModal';
import { RiskIntelligenceView } from './components/risk/RiskIntelligenceView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { CampaignsView } from './components/campaigns/CampaignsView';
import { ResourcesView } from './components/resources/ResourcesView';
import { AlertsView } from './components/alerts/AlertsView';
import { ReportsView } from './components/reports/ReportsView';
import { LabMonitoringView } from './components/surveillance/LabMonitoringView';
import { SurveillanceView } from './components/surveillance/SurveillanceView';
import { SettingsView } from './components/settings/SettingsView';

import { 
  situationOverview, 
  outbreaksData, 
  gisMapPoints, 
  caseEscalationPipeline, 
  riskIntelligenceData, 
  diseaseTrendsData, 
  speciesDistribution, 
  multiYearComparison, 
  laboratoryData, 
  vaccinationData, 
  responseResources, 
  veterinaryTeams, 
  surveillanceFeed, 
  governmentReports 
} from './data/mockData';

import { jurisdictionHierarchy } from './data/jurisdictionData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jurisdiction, setJurisdiction] = useState({
    districtId: 'erode',
    blockId: 'all',
    villageId: 'all'
  });

  const [mapFilters, setMapFilters] = useState({
    animal: 'all',
    disease: 'all',
    timeRange: 'today'
  });

  const [selectedCluster, setSelectedCluster] = useState(null);
  const [containmentOutbreak, setContainmentOutbreak] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just Now');

  // Handle Jurisdiction changes
  const handleJurisdictionChange = (key, value) => {
    setJurisdiction(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'districtId') {
        next.blockId = 'all';
        next.villageId = 'all';
      } else if (key === 'blockId') {
        next.villageId = 'all';
      }
      return next;
    });
  };

  const handleMapFilterChange = (key, value) => {
    setMapFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Cross-component operational actions
  const handleClusterAction = (action, point) => {
    if (action === 'containment') {
      setContainmentOutbreak(point);
    } else if (action === 'send_alert') {
      setActiveTab('alerts');
    } else if (action === 'assign_team') {
      setActiveTab('resources');
    } else if (action === 'view_case') {
      setActiveTab('outbreaks');
    } else if (action === 'view_lab') {
      setActiveTab('laboratory');
    } else if (action === 'deploy_resources') {
      setActiveTab('resources');
    }
  };

  const handleOutbreakAction = (action, outbreak) => {
    if (action === 'containment') {
      setContainmentOutbreak(outbreak);
    } else if (action === 'send_alert') {
      setActiveTab('alerts');
    } else if (action === 'assign_team') {
      setActiveTab('resources');
    } else if (action === 'view_case') {
      setSelectedCluster(outbreak);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleSyncData = () => {
    setLastSyncTime('Just Now (Synced)');
  };

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header 
        jurisdiction={jurisdiction}
        onJurisdictionChange={handleJurisdictionChange}
        jurisdictionData={jurisdictionHierarchy}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Main Layout (Sidebar + Command Center Content) */}
      <div className="main-layout">
        <Sidebar 
          activeTab={activeTab}
          onNavigate={(tab) => setActiveTab(tab)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="main-content">
          {/* Active Module Header */}
          <div className="module-title-strip">
            <div className="title-left">
              <span className="system-label font-mono">
                NATIONAL ANIMAL DISEASE SURVEILLANCE SYSTEM (NADSS) • COMMAND CENTER
              </span>
              <h2 className="page-title">
                {activeTab === 'dashboard' && 'Animal Health Command Center'}
                {activeTab === 'risk' && 'Epizootic Risk Intelligence & Decision Support'}
                {activeTab === 'outbreaks' && 'Live Outbreak Management & Rapid Containment'}
                {activeTab === 'surveillance' && 'Syndromic Field Telemetry & Early Detection'}
                {activeTab === 'campaigns' && 'Vaccination Coverage & Prophylactic Campaigns'}
                {activeTab === 'resources' && 'Emergency Response Resources & Fleet Logistics'}
                {activeTab === 'analytics' && 'Longitudinal Disease Analytics & Epidemiological Trends'}
                {activeTab === 'reports' && 'Official Statutory Epizootic Surveillance Bulletins'}
                {activeTab === 'alerts' && 'Multilingual Public Epizootic Advisory Composer'}
                {activeTab === 'laboratory' && 'Diagnostic Laboratory Accession & Testing Workload'}
                {activeTab === 'teams' && 'Veterinary Field Teams Live Monitoring'}
                {activeTab === 'settings' && 'Operational Biosecurity Rules & Thresholds'}
              </h2>
              <p className="page-subtitle">
                {activeTab === 'dashboard' && 'Real-time livestock disease surveillance, GIS risk intelligence, and coordinated field response.'}
                {activeTab === 'risk' && 'Composite threat scoring decomposed across weather, seasonality, case velocity, and vector proximity.'}
                {activeTab === 'outbreaks' && 'Immediate incident triage, ring vaccination decrees, and multi-agency quarantine enforcement.'}
                {activeTab === 'surveillance' && 'Real-time telemetry stream from livestock farmers, clinical dispensaries, and transit checkpoints.'}
                {activeTab === 'campaigns' && 'District-wide prophylactic immunization tracking under National Animal Disease Control Programme.'}
                {activeTab === 'resources' && 'Veterinary surgeon deployment, cold-chain vaccine reserve tracking, and mobile ambulance units.'}
                {activeTab === 'analytics' && 'Multi-week pathogen trajectories, species host vulnerability curves, and 3-year comparative audits.'}
                {activeTab === 'reports' && 'Statutory gazette bulletins for State Directorates, District Magistrates, and Union Ministry.'}
                {activeTab === 'alerts' && 'Multi-channel broadcast pipeline transmitting localized guidance in English, Tamil, and Hindi.'}
                {activeTab === 'laboratory' && 'ELISA & RT-PCR diagnostic sample lifecycle from field accession to confirmation.'}
                {activeTab === 'teams' && 'Live geographic deployment and mission dispatch for rapid response veterinary corps.'}
                {activeTab === 'settings' && 'System heuristics, cluster sensitivity thresholds, and automated escalation parameters.'}
              </p>
            </div>

            {/* Jurisdiction Status Pill */}
            <div className="active-jurisdiction-pill">
              <span className="aj-label font-mono">ACTIVE JURISDICTION:</span>
              <span className="aj-val">
                Tamil Nadu / {jurisdictionHierarchy.districts.find(d => d.id === jurisdiction.districtId)?.name || 'Erode'}
                {jurisdiction.blockId !== 'all' ? ` / ${jurisdiction.blockId.toUpperCase()}` : ' / All Blocks'}
              </span>
            </div>
          </div>

          {/* Tab Content Rendering */}
          {activeTab === 'dashboard' && (
            <>
              {/* Top Situation Overview Section (Section 9) */}
              <SituationOverview 
                data={situationOverview} 
                onRefresh={handleSyncData}
                lastUpdated={lastSyncTime}
              />

              {/* Primary Hero GIS Risk Intelligence Map (Section 10 & 11) */}
              <RiskMap 
                points={gisMapPoints}
                filters={mapFilters}
                onFilterChange={handleMapFilterChange}
                onClusterAction={handleClusterAction}
                selectedCluster={selectedCluster}
                onSelectCluster={(pt) => setSelectedCluster(pt)}
              />

              {/* Early Warning & Outbreak Intelligence Panel (Section 12) */}
              <OutbreakEarlyWarning 
                outbreak={outbreaksData[0]}
                onAction={handleOutbreakAction}
              />

              {/* Case Escalation Pipeline (Section 16) */}
              <CasePipeline 
                stages={caseEscalationPipeline}
              />

              {/* Live Outbreak Registry Table (Section 15) */}
              <OutbreakTable 
                outbreaks={outbreaksData}
                onAction={handleOutbreakAction}
              />
            </>
          )}

          {activeTab === 'risk' && (
            <RiskIntelligenceView 
              riskData={riskIntelligenceData}
              onAction={handleClusterAction}
            />
          )}

          {activeTab === 'outbreaks' && (
            <>
              <OutbreakEarlyWarning 
                outbreak={outbreaksData[0]}
                onAction={handleOutbreakAction}
              />
              <OutbreakTable 
                outbreaks={outbreaksData}
                onAction={handleOutbreakAction}
              />
            </>
          )}

          {activeTab === 'surveillance' && (
            <SurveillanceView 
              feed={surveillanceFeed}
              onAction={handleClusterAction}
            />
          )}

          {activeTab === 'campaigns' && (
            <CampaignsView 
              vaccinationData={vaccinationData}
            />
          )}

          {activeTab === 'resources' && (
            <ResourcesView 
              resources={responseResources}
              teams={veterinaryTeams}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView 
              trends={diseaseTrendsData}
              species={speciesDistribution}
              multiYear={multiYearComparison}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView 
              reports={governmentReports}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsView />
          )}

          {activeTab === 'laboratory' && (
            <LabMonitoringView 
              labData={laboratoryData}
            />
          )}

          {activeTab === 'teams' && (
            <ResourcesView 
              resources={responseResources}
              teams={veterinaryTeams}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Containment Action Modal (Statutory Quarantine Enforcement) */}
      <ContainmentModal 
        isOpen={Boolean(containmentOutbreak)}
        onClose={() => setContainmentOutbreak(null)}
        outbreak={containmentOutbreak}
        onConfirm={(details) => {
          console.log('Containment order confirmed:', details);
        }}
      />

      <style>{`
        .module-title-strip {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
          gap: 16px;
          flex-wrap: wrap;
        }

        .title-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .active-jurisdiction-pill {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
        }

        .aj-label {
          color: var(--text-muted);
          font-weight: 700;
        }

        .aj-val {
          font-weight: 700;
          color: var(--govt-forest);
        }

        @media (max-width: 860px) {
          .module-title-strip {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
