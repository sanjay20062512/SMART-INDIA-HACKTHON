import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  Languages, 
  Smartphone, 
  PhoneCall, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Sparkles
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { alertTemplates } from '../../data/alertTemplates';

export function AlertsView() {
  const [activeLang, setActiveLang] = useState('en'); // 'en', 'ta', 'hi'
  const [selectedTemplate, setSelectedTemplate] = useState(alertTemplates[0]);
  const [alertTitle, setAlertTitle] = useState(alertTemplates[0].title.en);
  const [alertMessage, setAlertMessage] = useState(alertTemplates[0].message.en);
  const [severity, setSeverity] = useState('CRITICAL');
  const [targetArea, setTargetArea] = useState('Perundurai & Bhavani Blocks');
  const [channels, setChannels] = useState({
    sms: true,
    app: true,
    ivr: true,
    portal: true
  });
  const [isDispatched, setIsDispatched] = useState(false);

  // Switch template
  const handleTemplateChange = (templateId) => {
    const tmpl = alertTemplates.find(t => t.id === templateId);
    if (tmpl) {
      setSelectedTemplate(tmpl);
      setSeverity(tmpl.severity);
      setTargetArea(tmpl.targetArea);
      setAlertTitle(tmpl.title[activeLang]);
      setAlertMessage(tmpl.message[activeLang]);
    }
  };

  // Switch language
  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    if (selectedTemplate) {
      setAlertTitle(selectedTemplate.title[lang]);
      setAlertMessage(selectedTemplate.message[lang]);
    }
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    setIsDispatched(true);
    setTimeout(() => {
      setIsDispatched(false);
    }, 4000);
  };

  return (
    <div className="alerts-view">
      {/* Title Header */}
      <div className="alerts-top-bar">
        <div>
          <span className="system-label">MASS COMMUNITY NOTIFICATION & EARLY WARNING</span>
          <h2 className="page-title">Multilingual Livestock Epizootic Advisory Composer</h2>
          <p className="page-subtitle">
            Authoritative broadcast pipeline across SMS Gateway, IVR Audio Calls, Kisan Mobile Apps, and Village Panchayats.
          </p>
        </div>
      </div>

      <div className="alerts-main-grid">
        {/* Left: Composer Form */}
        <div className="panel composer-panel">
          <div className="panel-header">
            <div>
              <span className="system-label">STATUTORY TRANSMISSION CONSOLE</span>
              <h3 className="section-title">COMPOSE OFFICIAL ADVISORY</h3>
            </div>
            
            {/* Multilingual Selector Tabs */}
            <div className="lang-tabs-group">
              <button 
                type="button"
                className={`lang-tab ${activeLang === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button 
                type="button"
                className={`lang-tab ${activeLang === 'ta' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ta')}
              >
                தமிழ் (Tamil)
              </button>
              <button 
                type="button"
                className={`lang-tab ${activeLang === 'hi' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('hi')}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>

          <div className="panel-body">
            {isDispatched && (
              <div className="dispatch-alert-banner">
                <CheckCircle2 size={20} color="var(--govt-forest)" />
                <div>
                  <strong>BROADCAST TRANSMITTED:</strong> Advisory queued to <strong>8,420 registered farmers</strong> across Perundurai & Bhavani. SMS gateway acknowledgments: 98.2%.
                </div>
              </div>
            )}

            <form onSubmit={handleDispatch} className="composer-form">
              {/* Pre-configured Templates */}
              <div className="form-group">
                <label className="form-label">SELECT EPIZOOTIC TEMPLATE</label>
                <div className="template-cards-strip">
                  {alertTemplates.map(tmpl => (
                    <button
                      type="button"
                      key={tmpl.id}
                      className={`template-btn ${selectedTemplate?.id === tmpl.id ? 'active' : ''}`}
                      onClick={() => handleTemplateChange(tmpl.id)}
                    >
                      <span className="tmpl-name">{tmpl.disease}</span>
                      <Badge variant={tmpl.severity} showDot={false}>{tmpl.severity}</Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid 2 Columns: Area & Severity */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">TARGET JURISDICTION AREA</label>
                  <input 
                    type="text" 
                    value={targetArea}
                    onChange={(e) => setTargetArea(e.target.value)}
                    className="form-input w-full"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ADVISORY SEVERITY</label>
                  <select 
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="form-select w-full"
                  >
                    <option value="CRITICAL">CRITICAL (Red Alert - Movement Ban)</option>
                    <option value="WARNING">WARNING (Precautionary / Ring Vaccination)</option>
                    <option value="INFO">INFORMATION (Routine Advisory / Weather)</option>
                  </select>
                </div>
              </div>

              {/* Title Field */}
              <div className="form-group">
                <label className="form-label">
                  <span>ADVISORY TITLE ({activeLang === 'ta' ? 'தமிழ் தலைப்பு' : activeLang === 'hi' ? 'शीर्षक' : 'ENGLISH'})</span>
                </label>
                <input 
                  type="text" 
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="form-input w-full font-bold"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label className="form-label">
                  <span>OFFICIAL BIOSECURITY DIRECTIVE MESSAGE</span>
                </label>
                <textarea 
                  rows={4}
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="form-input w-full alert-textarea"
                  required
                />
              </div>

              {/* Channels Selector */}
              <div className="form-group">
                <label className="form-label">DISTRIBUTION CHANNELS</label>
                <div className="channels-selector-grid">
                  <label className={`channel-pill ${channels.sms ? 'active' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={channels.sms}
                      onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                    />
                    <Smartphone size={14} />
                    <span>Farmer SMS Push</span>
                  </label>

                  <label className={`channel-pill ${channels.app ? 'active' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={channels.app}
                      onChange={(e) => setChannels({ ...channels, app: e.target.checked })}
                    />
                    <Radio size={14} />
                    <span>Kisan Mobile App</span>
                  </label>

                  <label className={`channel-pill ${channels.ivr ? 'active' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={channels.ivr}
                      onChange={(e) => setChannels({ ...channels, ivr: e.target.checked })}
                    />
                    <PhoneCall size={14} />
                    <span>IVR Audio Broadcast</span>
                  </label>

                  <label className={`channel-pill ${channels.portal ? 'active' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={channels.portal}
                      onChange={(e) => setChannels({ ...channels, portal: e.target.checked })}
                    />
                    <Globe size={14} />
                    <span>Panchayat Web Portal</span>
                  </label>
                </div>
              </div>

              <div className="composer-actions">
                <button 
                  type="submit" 
                  className={`btn ${severity === 'CRITICAL' ? 'btn-critical' : 'btn-primary'}`}
                >
                  <Send size={14} />
                  <span>DISPATCH GOVERNMENT ADVISORY</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Live Handset / Recipient Preview */}
        <div className="panel preview-panel">
          <div className="panel-header">
            <div>
              <span className="system-label">OPERATOR EMULATION</span>
              <h3 className="section-title">FARMER RECIPIENT PREVIEW</h3>
            </div>
            <span className="sim-badge font-mono">LIVE RENDERING</span>
          </div>

          <div className="panel-body">
            <div className="handset-preview">
              <div className="handset-notch" />
              <div className="sms-thread">
                <div className="sms-header-mock">
                  <span className="sms-sender font-mono">GOVT-TN-ANIMAL</span>
                  <span className="sms-time font-mono">JUST NOW</span>
                </div>

                <div className={`sms-bubble ${severity.toLowerCase()}`}>
                  <div className="bubble-badge">
                    <Badge variant={severity} showDot={true}>{severity}</Badge>
                  </div>
                  <h5 className="sms-title">{alertTitle}</h5>
                  <p className="sms-body">{alertMessage}</p>
                  <div className="sms-foot font-mono">
                    Official Directorate of Animal Husbandry, Erode Division • Toll-Free: 1962
                  </div>
                </div>
              </div>
            </div>

            <div className="delivery-stats-card">
              <span className="stat-head font-mono">BROADCAST AUDIENCE ESTIMATION</span>
              <div className="stat-row">
                <span>Active Dairy Farmers:</span>
                <strong className="font-mono">8,420 Numbers</strong>
              </div>
              <div className="stat-row">
                <span>Panchayat Display Boards:</span>
                <strong className="font-mono">24 Panchayats</strong>
              </div>
              <div className="stat-row">
                <span>Veterinary Dispensary Alert:</span>
                <strong className="font-mono">18 Centers Synced</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .alerts-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .alerts-top-bar {
          margin-bottom: 4px;
        }

        .alerts-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }

        .lang-tabs-group {
          display: flex;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 2px;
        }

        .lang-tab {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 3px;
          color: var(--text-secondary);
          transition: all 0.12s;
        }
        .lang-tab.active {
          background: var(--govt-forest);
          color: #FFFFFF;
        }

        .dispatch-alert-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--govt-forest-tint);
          border: 1px solid var(--govt-forest-light);
          padding: 12px 14px;
          border-radius: 4px;
          margin-bottom: 16px;
          font-size: 12px;
          color: var(--text-primary);
        }

        .composer-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .template-cards-strip {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .template-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface-elevated);
          border-radius: 4px;
          transition: all 0.15s;
        }
        .template-btn:hover {
          border-color: var(--border-strong);
        }
        .template-btn.active {
          border-color: var(--govt-forest);
          background: #FAF9F5;
        }

        .tmpl-name {
          font-size: 12px;
          font-weight: 600;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .alert-textarea {
          resize: vertical;
          line-height: 1.4;
          font-size: 13px;
        }

        .channels-selector-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .channel-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }
        .channel-pill.active {
          border-color: var(--govt-forest);
          background: #FAF9F5;
        }

        .composer-actions {
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: flex-end;
        }

        /* Handset Mock */
        .handset-preview {
          background: #111827;
          border-radius: 12px;
          padding: 16px 14px;
          color: #F9FAFB;
          box-shadow: var(--shadow-md);
          margin-bottom: 16px;
        }

        .handset-notch {
          width: 50px;
          height: 4px;
          background: #374151;
          border-radius: 2px;
          margin: 0 auto 12px;
        }

        .sms-header-mock {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #9CA3AF;
          margin-bottom: 8px;
        }

        .sms-bubble {
          background: #1F2937;
          border: 1px solid #374151;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sms-bubble.critical {
          border-left: 3px solid var(--status-critical);
        }

        .sms-title {
          font-size: 13px;
          font-weight: 700;
          color: #F9FAFB;
          line-height: 1.3;
        }

        .sms-body {
          font-size: 12px;
          color: #D1D5DB;
          line-height: 1.45;
        }

        .sms-foot {
          font-size: 9.5px;
          color: #9CA3AF;
          border-top: 1px dashed #374151;
          padding-top: 6px;
        }

        .delivery-stats-card {
          background: #FAF9F5;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .stat-head {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          color: var(--text-secondary);
        }

        .sim-badge {
          font-size: 9.5px;
          font-weight: 700;
          background: var(--bg-surface-subtle);
          padding: 2px 6px;
          border-radius: 2px;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .alerts-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
