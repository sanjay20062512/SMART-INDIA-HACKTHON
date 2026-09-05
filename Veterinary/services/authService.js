/**
 * Authentication Service
 * Mock auth provider ready to swap into FastAPI JWT backend.
 */

const MOCK_CREDENTIALS = [
  { email: 'dr.anita@vetportal.in', mobile: '9879011223', password: 'Vet@2026', name: 'Dr. Anita Sharma', role: 'veterinarian', title: 'Senior Vet Officer', regNo: 'GVC-2018-94812', district: 'Anand & Kheda, Gujarat' },
  { email: 'dr.mehta@vetportal.in', mobile: '9825041234', password: 'Vet@1234', name: 'Dr. Rakesh Mehta', role: 'veterinarian', title: 'District Vet Officer', regNo: 'GVC-2021-10234', district: 'Vadodara, Gujarat' }
];

const SESSION_KEY = 'VET_AUTH_SESSION';

class AuthService {
  /**
   * Authenticate with email/mobile + password.
   * Returns { success, user, error }
   * Plug in FastAPI: POST /api/v1/vet/auth/login  → { access_token, user }
   */
  async login(identifier, password) {
    // Simulate network latency (replace with fetch() call for FastAPI)
    await new Promise(r => setTimeout(r, 900));

    const id = identifier.trim().toLowerCase();
    const user = MOCK_CREDENTIALS.find(u =>
      u.email.toLowerCase() === id ||
      u.mobile === id.replace(/\s/g, '')
    );

    if (!user || user.password !== password) {
      return { success: false, error: 'Invalid credentials. Please check your email/mobile and password.' };
    }

    if (user.role !== 'veterinarian') {
      return { success: false, error: 'Access restricted. This portal is for authorised veterinarians only.' };
    }

    const session = {
      name: user.name,
      role: user.role,
      title: user.title,
      regNo: user.regNo,
      district: user.district,
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  isAuthenticated() {
    return !!this.getSession();
  }
}

export const authService = new AuthService();
