// My Reports Screen — all farmer-generated cases.

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';
import '../models/health_report.dart';
import '../models/mortality_report.dart';
import '../models/vet_request.dart';

class MyReportsScreen extends StatefulWidget {
  final FarmerDataService dataService;

  const MyReportsScreen({super.key, required this.dataService});

  @override
  State<MyReportsScreen> createState() => _MyReportsScreenState();
}

class _MyReportsScreenState extends State<MyReportsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    widget.dataService.addListener(_onDataChanged);
  }

  @override
  void dispose() {
    _tabController.dispose();
    widget.dataService.removeListener(_onDataChanged);
    super.dispose();
  }

  void _onDataChanged() => setState(() {});

  @override
  Widget build(BuildContext context) {
    final healthReports = widget.dataService.getHealthReports();
    final mortalityReports = widget.dataService.getMortalityReports();
    final vetRequests = widget.dataService.getVetRequests();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My Reports',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Health (${healthReports.length})'),
            Tab(text: 'Mortality (${mortalityReports.length})'),
            Tab(text: 'Vet (${vetRequests.length})'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Health Reports
          _healthReportsList(healthReports),

          // Mortality Reports
          _mortalityReportsList(mortalityReports),

          // Vet Requests
          _vetRequestsList(vetRequests),
        ],
      ),
    );
  }

  Widget _emptyState(String message) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.folder_open, size: 56, color: Colors.grey),
          const SizedBox(height: 16),
          Text(message, style: const TextStyle(color: Colors.grey)),
        ],
      ),
    );
  }

  Widget _healthReportsList(List<HealthReport> reports) {
    if (reports.isEmpty) return _emptyState('No health reports yet.');
    final sorted = [...reports]
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));

    return ListView.builder(
      padding: const EdgeInsets.all(12),
      itemCount: sorted.length,
      itemBuilder: (ctx, i) {
        final r = sorted[i];
        return _CaseCard(
          caseId: r.id,
          animal: r.animalTag,
          date: r.createdAt,
          type: 'Health Report',
          risk: r.riskLevel.displayName,
          status: r.caseStatus.displayName,
          riskColor: _riskColor(r.riskLevel),
          onTap: () => _openHealthDetails(ctx, r),
        );
      },
    );
  }

  Widget _mortalityReportsList(List<MortalityReport> reports) {
    if (reports.isEmpty) return _emptyState('No mortality reports yet.');
    final sorted = [...reports]
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));

    return ListView.builder(
      padding: const EdgeInsets.all(12),
      itemCount: sorted.length,
      itemBuilder: (ctx, i) {
        final r = sorted[i];
        return _CaseCard(
          caseId: r.id,
          animal: r.animalTag,
          date: r.createdAt,
          type: 'Mortality Report',
          risk: 'CRITICAL',
          status: 'Submitted',
          riskColor: Colors.red.shade900,
          onTap: () => _openMortalityDetails(ctx, r),
        );
      },
    );
  }

  Widget _vetRequestsList(List<VetRequest> requests) {
    if (requests.isEmpty) return _emptyState('No vet requests yet.');
    final sorted = [...requests]
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));

    return ListView.builder(
      padding: const EdgeInsets.all(12),
      itemCount: sorted.length,
      itemBuilder: (ctx, i) {
        final r = sorted[i];
        return _CaseCard(
          caseId: r.id,
          animal: r.animalTag,
          date: r.createdAt,
          type: 'Vet Request',
          risk: '—',
          status: r.caseStatus.displayName,
          riskColor: Colors.grey,
          onTap: () => _openVetDetails(ctx, r),
        );
      },
    );
  }

  Color _riskColor(RiskLevel r) {
    switch (r) {
      case RiskLevel.low:
        return Colors.green;
      case RiskLevel.medium:
        return Colors.orange;
      case RiskLevel.high:
        return Colors.red;
      case RiskLevel.critical:
        return Colors.red.shade900;
    }
  }

  void _openHealthDetails(BuildContext context, HealthReport report) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.85,
        builder: (ctx, controller) => SingleChildScrollView(
          controller: controller,
          padding: const EdgeInsets.all(20),
          child: _HealthReportDetailView(report: report),
        ),
      ),
    );
  }

  void _openMortalityDetails(BuildContext context, MortalityReport report) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.7,
        builder: (ctx, controller) => SingleChildScrollView(
          controller: controller,
          padding: const EdgeInsets.all(20),
          child: _MortalityDetailView(report: report),
        ),
      ),
    );
  }

  void _openVetDetails(BuildContext context, VetRequest request) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.8,
        builder: (ctx, controller) => SingleChildScrollView(
          controller: controller,
          padding: const EdgeInsets.all(20),
          child: _VetDetailView(request: request),
        ),
      ),
    );
  }
}

// ─── Case Card ────────────────────────────────────────────────────────────────

class _CaseCard extends StatelessWidget {
  final String caseId;
  final String animal;
  final DateTime date;
  final String type;
  final String risk;
  final String status;
  final Color riskColor;
  final VoidCallback onTap;

  const _CaseCard({
    required this.caseId,
    required this.animal,
    required this.date,
    required this.type,
    required this.risk,
    required this.status,
    required this.riskColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    caseId,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  const Spacer(),
                  Text(
                    '${date.day}/${date.month}/${date.year}',
                    style:
                        const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text('Animal: $animal'),
              Text('Type: $type'),
              const SizedBox(height: 8),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: riskColor.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      'Risk: $risk',
                      style: TextStyle(
                          color: riskColor,
                          fontWeight: FontWeight.bold,
                          fontSize: 12),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.blue.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      status,
                      style: const TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                          fontSize: 12),
                    ),
                  ),
                  const Spacer(),
                  const Icon(Icons.chevron_right, color: Colors.grey),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─── Detail views ─────────────────────────────────────────────────────────────

class _HealthReportDetailView extends StatelessWidget {
  final HealthReport report;

  const _HealthReportDetailView({required this.report});

  @override
  Widget build(BuildContext context) {
    final color = _riskColor(report.riskLevel);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Health Report — ${report.id}',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text('Animal: ${report.animalTag}',
            style: const TextStyle(color: Colors.grey)),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              Icon(Icons.warning, color: color),
              const SizedBox(width: 12),
              Text(
                '${report.riskLevel.displayName} RISK',
                style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        const Text('Symptoms:',
            style: TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 6),
        Wrap(
          spacing: 6,
          children: report.symptoms
              .map((s) => Chip(
                    label: Text(s, style: const TextStyle(fontSize: 12)),
                    padding: EdgeInsets.zero,
                    materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ))
              .toList(),
        ),
        const SizedBox(height: 16),
        const Text('Advice:',
            style: TextStyle(fontWeight: FontWeight.bold)),
        Text(report.advice),
        const SizedBox(height: 12),
        const Text('Recommended Action:',
            style: TextStyle(fontWeight: FontWeight.bold)),
        Text(report.recommendedAction),
        const SizedBox(height: 12),
        if (report.description != null) ...[
          const Text('Description:',
              style: TextStyle(fontWeight: FontWeight.bold)),
          Text(report.description!),
        ],
        const SizedBox(height: 16),
        Text('Status: ${report.caseStatus.displayName}',
            style: const TextStyle(color: Colors.blue, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        Text(
          '⚠️ This is a prototype rule-based assessment. Not medically validated.',
          style: const TextStyle(color: Colors.grey, fontSize: 11),
        ),
      ],
    );
  }

  Color _riskColor(RiskLevel r) {
    switch (r) {
      case RiskLevel.low:
        return Colors.green;
      case RiskLevel.medium:
        return Colors.orange;
      case RiskLevel.high:
        return Colors.red;
      case RiskLevel.critical:
        return Colors.red.shade900;
    }
  }
}

class _MortalityDetailView extends StatelessWidget {
  final MortalityReport report;

  const _MortalityDetailView({required this.report});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Mortality Report — ${report.id}',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text('Animal: ${report.animalTag}',
            style: const TextStyle(color: Colors.grey)),
        const SizedBox(height: 16),
        _row('Date', '${report.date.day}/${report.date.month}/${report.date.year}'),
        _row('Time', report.time),
        _row('Location', report.location ?? '—'),
        _row('Animals Affected', '${report.numberAffected}'),
        if (report.symptomsBeforeDeath.isNotEmpty) ...[
          const SizedBox(height: 12),
          const Text('Symptoms before death:',
              style: TextStyle(fontWeight: FontWeight.bold)),
          Wrap(
            spacing: 6,
            children: report.symptomsBeforeDeath
                .map((s) => Chip(label: Text(s, style: const TextStyle(fontSize: 12))))
                .toList(),
          ),
        ],
        if (report.description != null) ...[
          const SizedBox(height: 12),
          const Text('Description:',
              style: TextStyle(fontWeight: FontWeight.bold)),
          Text(report.description!),
        ],
      ],
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        children: [
          SizedBox(
            width: 140,
            child: Text(label, style: const TextStyle(color: Colors.grey)),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontWeight: FontWeight.w500))),
        ],
      ),
    );
  }
}

class _VetDetailView extends StatelessWidget {
  final VetRequest request;

  const _VetDetailView({required this.request});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Vet Request — ${request.id}',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text('Animal: ${request.animalTag}',
            style: const TextStyle(color: Colors.grey)),
        const SizedBox(height: 16),
        _row('Reason', request.reason),
        _row('Health Status', request.currentHealthStatus),
        _row('Status', request.caseStatus.displayName),
        if (request.preferredDate != null)
          _row('Preferred Date',
              '${request.preferredDate!.day}/${request.preferredDate!.month}/${request.preferredDate!.year}'),
        if (request.preferredTime != null)
          _row('Preferred Time', request.preferredTime!),
        if (request.description != null) ...[
          const SizedBox(height: 12),
          const Text('Description:',
              style: TextStyle(fontWeight: FontWeight.bold)),
          Text(request.description!),
        ],
        const SizedBox(height: 20),
        const Text('Timeline:',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        const SizedBox(height: 12),
        ...request.timeline.map((e) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const CircleAvatar(
                    radius: 8,
                    backgroundColor: Colors.blue,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(e.status,
                            style: const TextStyle(
                                fontWeight: FontWeight.bold)),
                        Text(e.description,
                            style: const TextStyle(
                                color: Colors.grey, fontSize: 13)),
                      ],
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        children: [
          SizedBox(
            width: 140,
            child: Text(label, style: const TextStyle(color: Colors.grey)),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontWeight: FontWeight.w500))),
        ],
      ),
    );
  }
}
