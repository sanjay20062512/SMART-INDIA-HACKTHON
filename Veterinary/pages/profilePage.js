/**
 * Profile Page
 * Veterinarian profile credentials, registration info, license, and assigned district.
 */

export function renderProfilePage() {
  return `
    <div class="page-content">
      <div class="section-card">
        <div class="profile-header-block">
          <div class="profile-avatar-lg">DA</div>
          <div class="profile-meta">
            <h2>Dr. Anita Sharma</h2>
            <p class="role-badge"><i class="fa-solid fa-user-doctor me-1"></i> Senior Veterinary Officer & Epidemiologist</p>
            <p class="text-muted text-sm"><i class="fa-solid fa-building-columns me-1"></i> Department of Animal Husbandry, Gujarat State</p>
          </div>
        </div>

        <div class="grid-2 mt-4">
          <div class="info-card">
            <h4><i class="fa-solid fa-id-card me-2 text-primary"></i> Professional Credentials</h4>
            <ul class="info-list">
              <li><strong>Registration No:</strong> GVC-2018-94812 (Gujarat Veterinary Council)</li>
              <li><strong>Qualifications:</strong> B.V.Sc & A.H., M.V.Sc (Veterinary Epidemiology)</li>
              <li><strong>Assigned District:</strong> Anand & Kheda Districts</li>
              <li><strong>Headquarters:</strong> Regional Veterinary Polyclinic, Anand</li>
              <li><strong>Official Email:</strong> dr.anita.sharma@ahd.gujarat.gov.in</li>
              <li><strong>Emergency Contact:</strong> +91 98790 11223</li>
            </ul>
          </div>

          <div class="info-card">
            <h4><i class="fa-solid fa-award me-2 text-warning"></i> Active Surveillance Badges</h4>
            <div class="badge-gallery">
              <span class="badge badge-success lg"><i class="fa-solid fa-shield-virus me-1"></i> Certified FMD Surveillance Officer</span>
              <span class="badge badge-info lg"><i class="fa-solid fa-syringe me-1"></i> National Brucellosis Eradication Lead</span>
              <span class="badge badge-warning lg"><i class="fa-solid fa-satellite-dish me-1"></i> Rapid Epidemic Response Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
