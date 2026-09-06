// Mortality Report Screen

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';
import '../models/animal.dart';
import '../models/mortality_report.dart';

class MortalityReportScreen extends StatefulWidget {
  final FarmerDataService dataService;

  const MortalityReportScreen({super.key, required this.dataService});

  @override
  State<MortalityReportScreen> createState() => _MortalityReportScreenState();
}

class _MortalityReportScreenState extends State<MortalityReportScreen> {
  final _formKey = GlobalKey<FormState>();

  Animal? _selectedAnimal;
  DateTime _date = DateTime.now();
  String _time = _formatTime(DateTime.now());
  final TextEditingController _locationCtrl = TextEditingController();
  final Set<String> _symptoms = {};
  final TextEditingController _countCtrl =
      TextEditingController(text: '1');
  final TextEditingController _descCtrl = TextEditingController();

  bool _submitted = false;
  String? _reportId;

  static String _formatTime(DateTime dt) {
    final h = dt.hour.toString().padLeft(2, '0');
    final m = dt.minute.toString().padLeft(2, '0');
    return '$h:$m';
  }

  final List<String> _symptomOptions = [
    'Fever',
    'Loss of appetite',
    'Breathing difficulty',
    'Weakness',
    'Diarrhea',
    'Excessive salivation',
    'Skin lesions',
    'Other',
  ];

  @override
  void dispose() {
    _locationCtrl.dispose();
    _countCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _date,
      firstDate: DateTime.now().subtract(const Duration(days: 30)),
      lastDate: DateTime.now(),
    );
    if (picked != null) setState(() => _date = picked);
  }

  Future<void> _pickTime() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(DateTime.now()),
    );
    if (picked != null) {
      setState(() => _time = '${picked.hour.toString().padLeft(2, '0')}:${picked.minute.toString().padLeft(2, '0')}');
    }
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    if (_selectedAnimal == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please select an animal.'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    final count = int.tryParse(_countCtrl.text.trim());
    if (count == null || count < 1) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter a valid number of affected animals.'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    final id = widget.dataService.generateMortalityId();
    final report = MortalityReport(
      id: id,
      animalId: _selectedAnimal!.id,
      animalTag: _selectedAnimal!.earTag,
      date: _date,
      time: _time,
      location: _locationCtrl.text.trim().isEmpty
          ? null
          : _locationCtrl.text.trim(),
      symptomsBeforeDeath: _symptoms.toList(),
      numberAffected: count,
      description: _descCtrl.text.trim().isEmpty
          ? null
          : _descCtrl.text.trim(),
    );

    widget.dataService.addMortalityReport(report);

    setState(() {
      _submitted = true;
      _reportId = id;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_submitted) return _ConfirmationView(reportId: _reportId!, onDone: () => Navigator.pop(context));

    final animals = widget.dataService.getAnimals();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Report Mortality',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.red.shade50,
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Warning banner
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.red.shade200),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.warning, color: Colors.red, size: 28),
                    SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'This report will create a critical alert and notify '
                        'veterinary authorities. Please fill accurately.',
                        style: TextStyle(color: Colors.red, fontSize: 13),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Animal Selection
              _sectionLabel('Animal *'),
              const SizedBox(height: 8),
              animals.isEmpty
                  ? const Text(
                      'No animals registered. Please add animals first.',
                      style: TextStyle(color: Colors.grey),
                    )
                  : DropdownButtonFormField<Animal>(
                      initialValue: _selectedAnimal,
                      decoration: _inputDeco('Select Animal', Icons.pets),
                      items: animals
                          .map((a) => DropdownMenuItem(
                                value: a,
                                child: Text(
                                    '${a.species.displayName} — ${a.earTag}'),
                              ))
                          .toList(),
                      onChanged: (a) =>
                          setState(() => _selectedAnimal = a),
                    ),
              const SizedBox(height: 16),

              // Date & Time
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: _pickDate,
                      child: InputDecorator(
                        decoration: _inputDeco('Date', Icons.calendar_today),
                        child: Text(
                          '${_date.day}/${_date.month}/${_date.year}',
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: GestureDetector(
                      onTap: _pickTime,
                      child: InputDecorator(
                        decoration: _inputDeco('Time', Icons.access_time),
                        child: Text(_time),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Location
              TextFormField(
                controller: _locationCtrl,
                decoration: _inputDeco('Location (optional)', Icons.location_on),
              ),
              const SizedBox(height: 16),

              // Number affected
              TextFormField(
                controller: _countCtrl,
                keyboardType: TextInputType.number,
                decoration:
                    _inputDeco('Number of Animals Affected *', Icons.numbers),
                validator: (v) {
                  if (v == null || v.trim().isEmpty) {
                    return 'Required';
                  }
                  if (int.tryParse(v.trim()) == null) {
                    return 'Enter a valid number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Symptoms before death
              _sectionLabel('Symptoms before death'),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _symptomOptions.map((s) {
                  final selected = _symptoms.contains(s);
                  return FilterChip(
                    label: Text(s),
                    selected: selected,
                    onSelected: (v) =>
                        setState(() => v ? _symptoms.add(s) : _symptoms.remove(s)),
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),

              // Description
              TextFormField(
                controller: _descCtrl,
                maxLines: 4,
                decoration: InputDecoration(
                  labelText: 'Description (optional)',
                  hintText: 'Describe what happened...',
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12)),
                  alignLabelWithHint: true,
                ),
              ),
              const SizedBox(height: 16),

              // Evidence placeholders
              _evidencePlaceholder(
                context,
                icon: Icons.camera_alt,
                label: 'Upload Photo Evidence',
                color: Colors.blue,
              ),
              const SizedBox(height: 10),
              _evidencePlaceholder(
                context,
                icon: Icons.mic,
                label: 'Record Voice Note',
                color: Colors.orange,
              ),
              const SizedBox(height: 32),

              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: _submit,
                  icon: const Icon(Icons.send),
                  label: const Text(
                    'Submit Mortality Report',
                    style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _evidencePlaceholder(
    BuildContext context, {
    required IconData icon,
    required String label,
    required Color color,
  }) {
    return InkWell(
      onTap: () => ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('This feature is available in the full version.')),
      ),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withValues(alpha: 0.3)),
        ),
        child: Row(
          children: [
            Icon(icon, color: color),
            const SizedBox(width: 12),
            Expanded(
              child: Text(label,
                  style: const TextStyle(fontWeight: FontWeight.w600)),
            ),
            const Icon(Icons.lock_outline, color: Colors.grey, size: 16),
          ],
        ),
      ),
    );
  }

  Widget _sectionLabel(String text) => Text(
        text,
        style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
      );

  InputDecoration _inputDeco(String label, IconData icon) => InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      );
}

// ─── Confirmation ─────────────────────────────────────────────────────────────

class _ConfirmationView extends StatelessWidget {
  final String reportId;
  final VoidCallback onDone;

  const _ConfirmationView({required this.reportId, required this.onDone});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Report Submitted'),
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.red.shade200, width: 2),
                ),
                child: const Icon(Icons.check_circle,
                    size: 64, color: Colors.red),
              ),
              const SizedBox(height: 24),
              const Text(
                'Mortality Report Submitted',
                style: TextStyle(
                    fontSize: 22, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'Report ID: $reportId',
                style: const TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.orange.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.orange.shade200),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Veterinarian notification required.',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Recommended action:\n\n'
                      'Please isolate the affected area and avoid unnecessary '
                      'animal movement until a veterinarian has inspected the site.',
                      style: TextStyle(fontSize: 13),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: onDone,
                  child: const Text(
                    'Done',
                    style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
