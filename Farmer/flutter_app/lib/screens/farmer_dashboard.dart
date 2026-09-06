// Farmer Dashboard — dynamic home screen.
// All values come from FarmerDataService. Nothing is hardcoded.

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';
import '../models/dashboard_stats.dart';

class FarmerDashboard extends StatelessWidget {
  final FarmerDataService dataService;
  final void Function(int index) onNavigateToTab;

  const FarmerDashboard({
    super.key,
    required this.dataService,
    required this.onNavigateToTab,
  });

  @override
  Widget build(BuildContext context) {
    final stats = dataService.getDashboardStatistics();
    final profile = dataService.profile;
    final activity = dataService.getRecentActivity();
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: AppBar(
        title: Row(
          children: [
            Icon(Icons.agriculture, color: colorScheme.primary, size: 28),
            const SizedBox(width: 8),
            Text(
              'Smart Livestock',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: colorScheme.primary,
              ),
            ),
          ],
        ),
        actions: [
          // Offline indicator placeholder
          if (dataService.isOfflineMode)
            Chip(
              label: const Text('Offline'),
              backgroundColor: Colors.orange.shade100,
            ),
          IconButton(
            icon: Badge(
              isLabelVisible: dataService.unreadAlertCount > 0,
              label: Text('${dataService.unreadAlertCount}'),
              child: const Icon(Icons.notifications_outlined),
            ),
            tooltip: 'Alerts',
            onPressed: () => onNavigateToTab(3),
          ),
          const SizedBox(width: 8),
        ],
        elevation: 0,
        backgroundColor: colorScheme.surface,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Banner
            _WelcomeBanner(
              name: profile.fullName,
              farmName: profile.farmName,
              colorScheme: colorScheme,
            ),
            const SizedBox(height: 20),

            // Summary Cards
            Text(
              'Farm Overview',
              style: theme.textTheme.titleMedium
                  ?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _SummaryGrid(stats: stats),
            const SizedBox(height: 24),

            // Quick Actions
            Text(
              'Quick Actions',
              style: theme.textTheme.titleMedium
                  ?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _QuickActions(
              onAddAnimal: () => onNavigateToTab(1),
              onReportSymptoms: () => onNavigateToTab(2),
              onReportMortality: () => onNavigateToTab(2),
              onRequestVet: () => onNavigateToTab(2),
            ),
            const SizedBox(height: 24),

            // Recent Activity
            Text(
              'Recent Activity',
              style: theme.textTheme.titleMedium
                  ?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _RecentActivity(activity: activity),
          ],
        ),
      ),
    );
  }
}

// ─── Welcome Banner ──────────────────────────────────────────────────────────

class _WelcomeBanner extends StatelessWidget {
  final String name;
  final String? farmName;
  final ColorScheme colorScheme;

  const _WelcomeBanner({
    required this.name,
    required this.farmName,
    required this.colorScheme,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            colorScheme.primary,
            colorScheme.primary.withValues(alpha: 0.8),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Text('Welcome, ', style: TextStyle(color: Colors.white70, fontSize: 16)),
              const Text('👨‍🌾', style: TextStyle(fontSize: 20)),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),
          if (farmName != null && farmName!.isNotEmpty) ...[
            const SizedBox(height: 2),
            Text(
              farmName!,
              style: const TextStyle(color: Colors.white70, fontSize: 13),
            ),
          ],
          const SizedBox(height: 10),
          const Text(
            'Monitor your animals and report health issues early.',
            style: TextStyle(color: Colors.white, fontSize: 13),
          ),
        ],
      ),
    );
  }
}

// ─── Summary Grid ─────────────────────────────────────────────────────────────

class _SummaryGrid extends StatelessWidget {
  final DashboardStats stats;

  const _SummaryGrid({required this.stats});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      childAspectRatio: 0.8,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: [
        _SummaryCard(
          icon: Icons.pets,
          label: 'Total\nAnimals',
          value: '${stats.totalAnimals}',
          color: Colors.blue,
        ),
        _SummaryCard(
          icon: Icons.check_circle,
          label: 'Healthy',
          value: '${stats.healthyAnimals}',
          color: Colors.green,
        ),
        _SummaryCard(
          icon: Icons.visibility,
          label: 'Monitoring',
          value: '${stats.monitoringAnimals}',
          color: Colors.orange,
        ),
        _SummaryCard(
          icon: Icons.error,
          label: 'Active\nCases',
          value: '${stats.activeCases}',
          color: Colors.red,
        ),
        _SummaryCard(
          icon: Icons.vaccines,
          label: 'Vac. Due',
          value: '${stats.vaccinationsDue}',
          color: Colors.purple,
        ),
        _SummaryCard(
          icon: Icons.notifications_active,
          label: 'Alerts',
          value: '${stats.importantAlerts}',
          color: Colors.deepOrange,
        ),
      ],
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _SummaryCard({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 8),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            CircleAvatar(
              backgroundColor: color.withValues(alpha: 0.15),
              radius: 17,
              child: Icon(icon, color: color, size: 18),
            ),
            const SizedBox(height: 4),
            FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(
                value,
                style: TextStyle(
                  fontSize: 19,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ),
            const SizedBox(height: 2),
            Flexible(
              child: Text(
                label,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 10.5,
                  color: Colors.grey,
                  height: 1.1,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

class _QuickActions extends StatelessWidget {
  final VoidCallback onAddAnimal;
  final VoidCallback onReportSymptoms;
  final VoidCallback onReportMortality;
  final VoidCallback onRequestVet;

  const _QuickActions({
    required this.onAddAnimal,
    required this.onReportSymptoms,
    required this.onReportMortality,
    required this.onRequestVet,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: _ActionTile(
                icon: Icons.add_circle,
                label: 'Add Animal',
                color: Colors.green,
                onTap: onAddAnimal,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _ActionTile(
                icon: Icons.health_and_safety,
                label: 'Report Symptoms',
                color: Colors.orange,
                onTap: onReportSymptoms,
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: _ActionTile(
                icon: Icons.warning_amber_rounded,
                label: 'Report Mortality',
                color: Colors.red,
                onTap: onReportMortality,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _ActionTile(
                icon: Icons.local_hospital,
                label: 'Request Vet',
                color: Colors.blue,
                onTap: onRequestVet,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _ActionTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _ActionTile({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
          child: Column(
            children: [
              Icon(icon, size: 32, color: color),
              const SizedBox(height: 8),
              Text(
                label,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─── Recent Activity ──────────────────────────────────────────────────────────

class _RecentActivity extends StatelessWidget {
  final List<Map<String, dynamic>> activity;

  const _RecentActivity({required this.activity});

  IconData _iconForType(String type) {
    switch (type) {
      case 'animal_added':
        return Icons.pets;
      case 'health_report':
        return Icons.medical_services;
      case 'mortality_report':
        return Icons.warning;
      case 'vet_request':
        return Icons.local_hospital;
      default:
        return Icons.info;
    }
  }

  Color _colorForType(String type) {
    switch (type) {
      case 'animal_added':
        return Colors.green;
      case 'health_report':
        return Colors.orange;
      case 'mortality_report':
        return Colors.red;
      case 'vet_request':
        return Colors.blue;
      default:
        return Colors.grey;
    }
  }

  String _timeAgo(DateTime dt) {
    final diff = DateTime.now().difference(dt);
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inHours < 1) return '${diff.inMinutes}m ago';
    if (diff.inDays < 1) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }

  @override
  Widget build(BuildContext context) {
    if (activity.isEmpty) {
      return Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: const Padding(
          padding: EdgeInsets.all(24),
          child: Center(
            child: Column(
              children: [
                Icon(Icons.history, size: 40, color: Colors.grey),
                SizedBox(height: 12),
                Text(
                  'Your recent activities will appear here.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        children: activity.asMap().entries.map((entry) {
          final item = entry.value;
          final isLast = entry.key == activity.length - 1;
          final type = item['type'] as String;
          return Column(
            children: [
              ListTile(
                leading: CircleAvatar(
                  backgroundColor: _colorForType(type).withValues(alpha: 0.15),
                  child: Icon(
                    _iconForType(type),
                    color: _colorForType(type),
                    size: 20,
                  ),
                ),
                title: Text(
                  item['title'] as String,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
                subtitle: Text(item['subtitle'] as String),
                trailing: Text(
                  _timeAgo(item['date'] as DateTime),
                  style: const TextStyle(color: Colors.grey, fontSize: 12),
                ),
              ),
              if (!isLast)
                const Divider(height: 1, indent: 16, endIndent: 16),
            ],
          );
        }).toList(),
      ),
    );
  }
}