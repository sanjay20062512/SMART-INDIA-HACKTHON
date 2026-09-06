// Profile Screen — farmer profile, farm info, settings, and logout.

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';

import 'vaccination_screen.dart';
import 'treatment_screen.dart';
import 'my_reports_screen.dart';

class ProfileScreen extends StatefulWidget {
  final FarmerDataService dataService;

  const ProfileScreen({super.key, required this.dataService});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  void initState() {
    super.initState();
    widget.dataService.addListener(_onDataChanged);
  }

  @override
  void dispose() {
    widget.dataService.removeListener(_onDataChanged);
    super.dispose();
  }

  void _onDataChanged() => setState(() {});

  void _logout() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Logout'),
        content: const Text('Are you sure you want to log out?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              // Navigate back to Login screen.
              // Real auth token clearing goes here.
              Navigator.of(context).pushNamedAndRemoveUntil(
                '/login',
                (route) => false,
              );
            },
            child: const Text('Logout', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _seedDemoData() {
    widget.dataService.seedDemoData();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Demo data loaded. Check Animals and Alerts tabs.'),
        backgroundColor: Colors.green,
      ),
    );
  }

  void _editProfile() {
    final profile = widget.dataService.profile;
    final nameCtrl = TextEditingController(text: profile.fullName);
    final emailCtrl = TextEditingController(text: profile.email ?? '');
    String language = profile.preferredLanguage;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(ctx).viewInsets.bottom + 16,
          left: 20,
          right: 20,
          top: 20,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Edit Profile',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: nameCtrl,
              decoration: InputDecoration(
                labelText: 'Full Name',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: emailCtrl,
              decoration: InputDecoration(
                labelText: 'Email (optional)',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12)),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: language,
              decoration: InputDecoration(
                labelText: 'Preferred Language',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12)),
              ),
              items: ['English', 'Tamil', 'Hindi']
                  .map((l) => DropdownMenuItem(value: l, child: Text(l)))
                  .toList(),
              onChanged: (v) => language = v!,
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  final updated = widget.dataService.profile.copyWith(
                    fullName: nameCtrl.text.trim(),
                    email: emailCtrl.text.trim().isEmpty
                        ? null
                        : emailCtrl.text.trim(),
                    preferredLanguage: language,
                  );
                  widget.dataService.updateProfile(updated);
                  Navigator.pop(ctx);
                },
                child: const Text('Save'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final profile = widget.dataService.profile;
    final stats = widget.dataService.getDashboardStatistics();
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My Profile',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            tooltip: 'Edit Profile',
            onPressed: _editProfile,
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Profile Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    colorScheme.primary,
                    colorScheme.primary.withValues(alpha: 0.8),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: Colors.white,
                    child: Text(
                      profile.fullName.isNotEmpty
                          ? profile.fullName[0].toUpperCase()
                          : 'F',
                      style: TextStyle(
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        color: colorScheme.primary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    profile.fullName,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold),
                  ),
                  Text(
                    profile.mobileNumber,
                    style: const TextStyle(color: Colors.white70, fontSize: 14),
                  ),
                  const SizedBox(height: 16),
                  // Quick stats
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _statChip('Animals', '${stats.totalAnimals}'),
                      _statChip('Reports', '${widget.dataService.getHealthReports().length}'),
                      _statChip('Alerts', '${widget.dataService.unreadAlertCount}'),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Farmer Information
            _sectionCard(
              context: context,
              title: 'Farmer Information',
              icon: Icons.person,
              children: [
                _infoRow('Name', profile.fullName),
                _infoRow('Mobile', profile.mobileNumber),
                _infoRow('Email', profile.email ?? '—'),
                _infoRow('Language', profile.preferredLanguage),
              ],
            ),
            const SizedBox(height: 12),

            // Farm Information
            _sectionCard(
              context: context,
              title: 'Farm Information',
              icon: Icons.agriculture,
              children: [
                _infoRow('Farm Name', profile.farmName ?? '—'),
                _infoRow('State', profile.state),
                _infoRow('District', profile.district),
                _infoRow('Block / Taluk', profile.block),
                _infoRow('Village', profile.village),
                _infoRow('Livestock Type', profile.livestockType),
              ],
            ),
            const SizedBox(height: 12),

            // Menu Items
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Card(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12)),
                child: Column(
                  children: [
                    _menuItem(
                      icon: Icons.vaccines,
                      label: 'Vaccination Records',
                      color: Colors.purple,
                      onTap: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => VaccinationScreen(
                              dataService: widget.dataService),
                        ),
                      ),
                    ),
                    const Divider(height: 1),
                    _menuItem(
                      icon: Icons.medical_services,
                      label: 'Treatment Records',
                      color: Colors.teal,
                      onTap: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => TreatmentScreen(
                              dataService: widget.dataService),
                        ),
                      ),
                    ),
                    const Divider(height: 1),
                    _menuItem(
                      icon: Icons.folder_open,
                      label: 'My Reports',
                      color: Colors.blue,
                      onTap: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) =>
                              MyReportsScreen(dataService: widget.dataService),
                        ),
                      ),
                    ),
                    const Divider(height: 1),
                    _menuItem(
                      icon: Icons.science,
                      label: 'Load Demo Data',
                      color: Colors.green,
                      subtitle: 'Populate app with sample animals and records',
                      onTap: _seedDemoData,
                    ),
                    const Divider(height: 1),
                    _menuItem(
                      icon: Icons.offline_bolt,
                      label: 'Offline Mode',
                      color: Colors.orange,
                      subtitle: 'Pending Sync: ${widget.dataService.pendingSyncCount}',
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text(
                              'Offline sync will be available in the full version.',
                            ),
                          ),
                        );
                      },
                    ),
                    const Divider(height: 1),
                    _menuItem(
                      icon: Icons.help_outline,
                      label: 'Help & Support',
                      color: Colors.grey,
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Help section coming soon.'),
                          ),
                        );
                      },
                    ),
                    const Divider(height: 1),
                    _menuItem(
                      icon: Icons.logout,
                      label: 'Logout',
                      color: Colors.red,
                      onTap: _logout,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Version / Offline note
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'Smart Livestock v1.0.0 — Frontend Prototype\n'
                'Offline Mode: Not yet active | Sync: Not yet implemented',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey, fontSize: 11),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _statChip(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
              color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),
        ),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ],
    );
  }

  Widget _sectionCard({
    required BuildContext context,
    required String title,
    required IconData icon,
    required List<Widget> children,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(icon,
                      color: Theme.of(context).colorScheme.primary, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    title,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                ],
              ),
              const Divider(height: 20),
              ...children,
            ],
          ),
        ),
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          SizedBox(
            width: 120,
            child: Text(label,
                style: const TextStyle(color: Colors.grey, fontSize: 13)),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                  fontWeight: FontWeight.w500, fontSize: 13),
            ),
          ),
        ],
      ),
    );
  }

  Widget _menuItem({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
    String? subtitle,
  }) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: color.withValues(alpha: 0.15),
        radius: 20,
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
      subtitle: subtitle != null
          ? Text(subtitle, style: const TextStyle(fontSize: 12))
          : null,
      trailing: const Icon(Icons.chevron_right, color: Colors.grey),
      onTap: onTap,
    );
  }
}
