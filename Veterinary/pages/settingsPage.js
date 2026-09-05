/**
 * Settings Page
 * System configuration, REST API URL endpoint bindings (FastAPI + PostgreSQL readiness), and sync preferences.
 */
import { apiService } from '../services/apiService.js';
import { showToast } from '../components/toast.js';

export function renderSettingsPage() {
  const currentUrl = apiService.baseUrl;
  const useMock = apiService.useMock;

  return `
    <div class="page-content">
      <div class="section-card">
        <div class="section-header">
          <h3><i class="fa-solid fa-sliders me-2 text-primary"></i> System Settings & Architecture Configuration</h3>
        </div>

        <form id="formSystemSettings" class="mt-3">
          <div class="settings-box">
            <h4 class="settings-title"><i class="fa-solid fa-server me-2 text-indigo"></i> Backend API Connection Layer (FastAPI / PostgreSQL)</h4>
            <p class="text-sm text-muted">Configure connection parameters to seamlessly connect this UI to the backend service.</p>

            <div class="form-group mb-3">
              <label class="form-label">Data Mode Source</label>
              <div class="form-check-group">
                <label class="radio-label">
                  <input type="radio" name="useMock" value="true" ${useMock ? 'checked' : ''} />
                  <span><strong>Mock Data Mode</strong> (Default for offline prototype testing)</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="useMock" value="false" ${!useMock ? 'checked' : ''} />
                  <span><strong>Live FastAPI REST Service</strong> (Connects to PostgreSQL database backend)</span>
                </label>
              </div>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">FastAPI Backend Base URL</label>
              <input type="url" name="apiUrl" class="form-control" value="${currentUrl}" placeholder="http://localhost:8000/api/v1/vet" />
              <span class="form-help">Expected Endpoint Contract: <code>Flutter/UI &rarr; FastAPI &rarr; PostgreSQL</code></span>
            </div>
          </div>

          <div class="settings-box mt-4">
            <h4 class="settings-title"><i class="fa-solid fa-satellite-dish me-2 text-success"></i> Cross-Portal Government Escalation Integration</h4>
            <p class="text-sm text-muted">Configured integration with <code>/Government</code> portal event listener broadcast.</p>
            <div class="alert alert-info text-xs">
              <i class="fa-solid fa-circle-check me-1"></i> Active cross-tab communication bus initialized. Government escalation events are published to local storage pub/sub event channel.
            </div>
          </div>

          <div class="form-actions mt-4 text-end">
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Save Configuration</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
