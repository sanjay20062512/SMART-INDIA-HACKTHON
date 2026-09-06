// Veterinarian Request Screen

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';
import '../models/animal.dart';
import '../models/vet_request.dart';
import '../models/health_report.dart';

class VetRequestScreen extends StatefulWidget {
  final FarmerDataService dataService;
  final String? preselectedAnimalId;

  const VetRequestScreen({
    super.key,
    required this.dataService,
    this.preselectedAnimalId,
  });

  @override
  State<VetRequestScreen> createState() => _VetRequestScreenState();
}

class _VetRequestScreenState extends State<VetRequestScreen> {
  final _formKey = GlobalKey<FormState>();

  Animal? _selectedAnimal;
  final _reasonCtrl = TextEditingController();
  final _descCtrl = TextEditingController();
  DateTime? _preferredDate;
  String? _preferredTime;
  String _healthStatus = 'Under Monitoring';

  bool _submitted = false;
  String? _requestId;

  final List<String> _healthStatusOptions = [
    'Healthy',
    'Under Monitoring',
    'Active Case',
    'Critical',
  ];

  @override
  void initState() {
    super.initState();
    if (widget.preselectedAnimalId != null) {
      _selectedAnimal =
          widget.dataService.getAnimalById(widget.preselectedAnimalId!);
      if (_selectedAnimal != null) {
        _healthStatus = _selectedAnimal!.healthStatus.displayName;
      }
    }
  }

  @override
  void dispose() {
    _reasonCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now().add(const Duration(days: 1)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 30)),
    );
    if (picked != null) setState(() => _preferredDate = picked);
  }

  Future<void> _pickTime() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    if (picked != null) {
      setState(() => _preferredTime =
          '${picked.hour.toString().padLeft(2, '0')}:${picked.minute.toString().padLeft(2, '0')}');
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

    final id = widget.dataService.generateVetRequestId();
    final request = VetRequest(
      id: id,
      animalId: _selectedAnimal!.id,
      animalTag: _selectedAnimal!.earTag,
      reason: _reasonCtrl.text.trim(),
      currentHealthStatus: _healthStatus,
      description: _descCtrl.text.trim().isEmpty
          ? null
          : _descCtrl.text.trim(),
      preferredDate: _preferredDate,
      preferredTime: _preferredTime,
      caseStatus: CaseStatus.open,
    );
    request.addTimelineEvent(
      'Submitted',
      'Veterinarian request submitted by farmer.',
    );

    widget.dataService.addVetRequest(request);

    setState(() {
      _submitted = true;
      _requestId = id;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_submitted) {
      return _RequestConfirmation(
        requestId: _requestId!,
        onDone: () => Navigator.pop(context),
      );
    }

    final animals = widget.dataService.getAnimals();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Request Veterinarian',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Animal selection
              _label('Animal *'),
              const SizedBox(height: 8),
              animals.isEmpty
                  ? const Text(
                      'No animals registered.',
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
                      onChanged: (a) => setState(() {
                        _selectedAnimal = a;
                        if (a != null) {
                          _healthStatus = a.healthStatus.displayName;
                        }
                      }),
                    ),
              const SizedBox(height: 16),

              // Reason
              TextFormField(
                controller: _reasonCtrl,
                decoration: _inputDeco('Reason for Request *', Icons.description),
                validator: (v) => v == null || v.trim().isEmpty
                    ? 'Please enter a reason.'
                    : null,
              ),
              const SizedBox(height: 16),

              // Health status
              _label('Current Health Status'),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                initialValue: _healthStatus,
                decoration: _inputDeco('Health Status', Icons.monitor_heart),
                items: _healthStatusOptions
                    .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                    .toList(),
                onChanged: (v) => setState(() => _healthStatus = v!),
              ),
              const SizedBox(height: 16),

              // Description
              TextFormField(
                controller: _descCtrl,
                maxLines: 4,
                decoration: InputDecoration(
                  labelText: 'Description (optional)',
                  hintText: 'Describe the animal\'s condition...',
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12)),
                  alignLabelWithHint: true,
                ),
              ),
              const SizedBox(height: 16),

              // Preferred date
              _label('Preferred Visit Date (optional)'),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: _pickDate,
                child: InputDecorator(
                  decoration: _inputDeco(
                      _preferredDate == null
                          ? 'Select Date'
                          : '${_preferredDate!.day}/${_preferredDate!.month}/${_preferredDate!.year}',
                      Icons.calendar_today),
                  child: Text(
                    _preferredDate == null
                        ? 'Tap to select date'
                        : '${_preferredDate!.day}/${_preferredDate!.month}/${_preferredDate!.year}',
                    style: TextStyle(
                        color: _preferredDate == null ? Colors.grey : null),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Preferred time
              _label('Preferred Time (optional)'),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: _pickTime,
                child: InputDecorator(
                  decoration: _inputDeco(
                      _preferredTime ?? 'Select Time', Icons.access_time),
                  child: Text(
                    _preferredTime ?? 'Tap to select time',
                    style: TextStyle(
                        color: _preferredTime == null ? Colors.grey : null),
                  ),
                ),
              ),
              const SizedBox(height: 32),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: _submit,
                  icon: const Icon(Icons.send),
                  label: const Text(
                    'Submit Request',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _label(String text) => Text(
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

class _RequestConfirmation extends StatelessWidget {
  final String requestId;
  final VoidCallback onDone;

  const _RequestConfirmation(
      {required this.requestId, required this.onDone});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Request Submitted'),
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.check_circle, size: 72, color: Colors.blue),
              const SizedBox(height: 20),
              const Text(
                'Veterinarian Request Submitted',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text('Request ID: $requestId',
                  style: const TextStyle(color: Colors.grey)),
              const SizedBox(height: 24),

              // Status timeline
              _TimelineTile(
                status: 'Submitted',
                description: 'Your request has been received.',
                isActive: true,
                isLast: false,
              ),
              _TimelineTile(
                status: 'Under Review',
                description: 'A coordinator will review your request.',
                isActive: false,
                isLast: false,
              ),
              _TimelineTile(
                status: 'Vet Assigned',
                description: 'A veterinarian will be assigned.',
                isActive: false,
                isLast: false,
              ),
              _TimelineTile(
                status: 'Visit Scheduled',
                description: 'Visit date and time will be confirmed.',
                isActive: false,
                isLast: false,
              ),
              _TimelineTile(
                status: 'Treatment Started',
                description: 'Veterinarian visit and treatment.',
                isActive: false,
                isLast: false,
              ),
              _TimelineTile(
                status: 'Case Closed',
                description: 'Case resolved.',
                isActive: false,
                isLast: true,
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

class _TimelineTile extends StatelessWidget {
  final String status;
  final String description;
  final bool isActive;
  final bool isLast;

  const _TimelineTile({
    required this.status,
    required this.description,
    required this.isActive,
    required this.isLast,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            CircleAvatar(
              radius: 10,
              backgroundColor: isActive
                  ? Theme.of(context).colorScheme.primary
                  : Colors.grey.shade300,
              child: isActive
                  ? const Icon(Icons.check, size: 12, color: Colors.white)
                  : null,
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 40,
                color: Colors.grey.shade300,
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  status,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: isActive
                        ? Theme.of(context).colorScheme.primary
                        : Colors.grey,
                  ),
                ),
                Text(
                  description,
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
