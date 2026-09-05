import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  Printer, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  ShieldCheck,
  Share2
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export function ReportsView({ reports }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowPreviewModal(true);
  };

  const handleExport = (report, format) => {
    setExportNotice(`Exporting "${report.title}" in ${format} format...`);
    setTimeout(() => {
      setExportNotice('');
    }, 2500);
  };

  return (
    <div className="reports-view">
      {/* Top Header */}
      <div className="reports-top-bar">
        <div>
          <span className="system-label">STATUTORY REGULATORY ARCHIVE</span>
          <h2 className="page-title">Official Epizootic Surveillance Bulletins & Statutory Reports</h2>
          <p className="page-subtitle">
            Automated compilation of Directorate & Ministry dossiers adhering to National Epizootic Guidelines.
          </p>
        </div>

        <div className="reports-actions">
          <button 
            className="btn btn-primary"
            onClick={() => handleViewReport(reports[0])}
          >
            <FileText size={13} />
            <span>GENERATE EPIDEMIOLOGY DOSSIER</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="export-toast-banner">
          <CheckCircle2 size={16} color="var(--govt-forest)" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Reports Directory Panel */}
      <div className="panel reports-panel">
        <div className="panel-header">
          <div>
            <span className="system-label">GAZETTE & MISSION BULLETIN INVENTORY</span>
            <h3 className="section-title">SCHEDULED OFFICIAL SURVEILLANCE REPORTS</h3>
          </div>
          <span className="font-mono text-muted text-xs font-bold">{reports.length} STATUTORY REPORTS</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>REF ID</th>
                <th>REPORT TITLE & PERIOD</th>
                <th>CLASSIFICATION</th>
                <th>SUBMITTED TO</th>
                <th>STATUS</th>
                <th>FILE METRICS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(rep => (
                <tr key={rep.id}>
                  <td className="font-mono font-bold">{rep.id}</td>
                  <td>
                    <div className="rep-title-cell">
                      <span className="rep-title">{rep.title}</span>
                      <span className="rep-period font-mono">{rep.period} • {rep.type}</span>
                    </div>
                  </td>
                  <td>
                    <span className="classification-pill font-mono">{rep.classification}</span>
                  </td>
                  <td>
                    <span className="submitted-cell">{rep.submittedTo}</span>
                  </td>
                  <td>
                    <Badge 
                      variant={rep.status === 'ACTION REQUIRED' ? 'critical' : rep.status === 'READY FOR DISPATCH' ? 'warning' : 'normal'}
                    >
                      {rep.status}
                    </Badge>
                  </td>
                  <td className="font-mono text-muted">
                    {rep.fileSize} ({rep.format})
                  </td>
                  <td>
                    <div className="rep-actions-cell">
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleViewReport(rep)}
                        title="View Official Letterhead"
                      >
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleExport(rep, 'PDF')}
                        title="Export as PDF"
                      >
                        <Download size={12} />
                        <span>PDF</span>
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleExport(rep, 'CSV')}
                        title="Export CSV"
                      >
                        <span>CSV</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Printable Report Preview Modal */}
      {selectedReport && (
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title={selectedReport.title}
          systemTag="OFFICIAL GOVERNMENT OF TAMIL NADU DOCUMENT"
          maxWidth="780px"
        >
          <div className="official-document-sheet">
            {/* Government Official Letterhead */}
            <div className="doc-letterhead">
              <div className="letterhead-top">
                <span className="govt-seal-text">GOVERNMENT OF TAMIL NADU</span>
                <h3 className="dept-name">DEPARTMENT OF ANIMAL HUSBANDRY & VETERINARY SERVICES</h3>
                <span className="office-title font-mono">DISTRICT EPIZOOTIC SURVEILLANCE & RESPONSE COMMAND, ERODE</span>
              </div>
              <div className="doc-meta-strip font-mono">
                <span>REF: {selectedReport.id}</span>
                <span>DATE: 05-SEP-2026</span>
                <span>CLASSIFICATION: {selectedReport.classification}</span>
              </div>
            </div>

            {/* Document Body */}
            <div className="doc-content">
              <h4 className="bulletin-headline">{selectedReport.title.toUpperCase()}</h4>
              <p className="bulletin-sub font-mono">REPORTING INTERVAL: {selectedReport.period}</p>

              <div className="official-summary-box">
                <h5 className="box-title font-mono">1. EXECUTIVE SUMMARY & JURISDICTIONAL SITUATION</h5>
                <p>
                  During the reporting interval, active field syndromic surveillance was maintained across 8,420 livestock holdings in Erode District. 
                  A total of <strong>1,284 active cases</strong> were under veterinary observation, with <strong>5 suspected outbreak foci</strong> identified. 
                  Primary pathogen of biosecurity significance: <em>Foot & Mouth Disease (Aphthovirus Serotype O)</em> clustered in Perundurai Block.
                </p>
              </div>

              <div className="official-summary-box">
                <h5 className="box-title font-mono">2. CONTAINMENT ACTIONS INITIATED</h5>
                <ul className="doc-list">
                  <li><strong>Quarantine:</strong> 5-kilometer containment perimeter gazetted around Perundurai East under Prevention and Control of Infectious Diseases in Animals Act, 2009.</li>
                  <li><strong>Transit Prohibition:</strong> Inter-block cattle transit halted and Perundurai Weekly Cattle Market temporarily suspended.</li>
                  <li><strong>Ring Immunization:</strong> Emergency cold-chain vaccine deployment of 2,500 doses mobilized with 4 Rapid Response Units.</li>
                </ul>
              </div>

              <div className="official-signoff">
                <div className="sign-block">
                  <span className="sign-line font-mono">[DIGITALLY VERIFIED - NIC-CA]</span>
                  <strong className="sign-name">Dr. S. Ramakrishnan, M.V.Sc.</strong>
                  <span className="sign-desig">Joint Director of Animal Husbandry</span>
                  <span className="sign-place">District Command Center, Erode</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="doc-controls">
              <button 
                className="btn btn-secondary"
                onClick={() => window.print()}
              >
                <Printer size={14} />
                <span>Print Official Bulletin</span>
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  handleExport(selectedReport, 'PDF');
                  setShowPreviewModal(false);
                }}
              >
                <Download size={14} />
                <span>Download Signed PDF</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        .reports-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .reports-top-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .export-toast-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--govt-forest-tint);
          border: 1px solid var(--govt-forest-light);
          padding: 10px 14px;
          border-radius: 4px;
          font-size: 12px;
          color: var(--text-primary);
        }

        .rep-title-cell {
          display: flex;
          flex-direction: column;
        }

        .rep-title {
          font-weight: 600;
          color: var(--text-primary);
        }

        .rep-period {
          font-size: 11px;
          color: var(--text-muted);
        }

        .classification-pill {
          font-size: 10px;
          font-weight: 700;
          background: var(--bg-surface-subtle);
          padding: 2px 6px;
          border-radius: 2px;
          color: var(--text-secondary);
        }

        .submitted-cell {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .rep-actions-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Printable Letterhead Document */
        .official-document-sheet {
          background: #FFFFFF;
          border: 1px solid var(--border-strong);
          padding: 24px;
          border-radius: 4px;
        }

        .doc-letterhead {
          text-align: center;
          padding-bottom: 14px;
          border-bottom: 2px solid var(--text-primary);
          margin-bottom: 18px;
        }

        .govt-seal-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .dept-name {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--govt-navy);
          margin: 4px 0;
        }

        .office-title {
          font-size: 10.5px;
          color: var(--text-secondary);
        }

        .doc-meta-strip {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 12px;
          padding-top: 6px;
          border-top: 1px solid var(--border-subtle);
        }

        .bulletin-headline {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
        }

        .bulletin-sub {
          font-size: 10.5px;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 16px;
        }

        .official-summary-box {
          background: #FAF9F5;
          border: 1px solid var(--border-subtle);
          padding: 12px 14px;
          border-radius: 4px;
          margin-bottom: 14px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .box-title {
          font-size: 10px;
          font-weight: 700;
          color: var(--govt-forest);
          margin-bottom: 6px;
        }

        .doc-list {
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .official-signoff {
          margin-top: 24px;
          display: flex;
          justify-content: flex-end;
        }

        .sign-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }

        .sign-line {
          font-size: 9px;
          color: var(--govt-forest);
          font-weight: 700;
        }

        .sign-name {
          font-size: 12.5px;
          color: var(--text-primary);
        }

        .sign-desig, .sign-place {
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .doc-controls {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
}
