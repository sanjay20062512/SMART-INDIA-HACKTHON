// Registration Screen — new farmer sign-up flow.
// Flow: Registration → OTP → Create Password → Dashboard

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';
import '../models/farmer_profile.dart';
import 'otp_screen.dart';

class RegistrationScreen extends StatefulWidget {
  final FarmerDataService dataService;

  const RegistrationScreen({super.key, required this.dataService});

  @override
  State<RegistrationScreen> createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _mobileCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _farmNameCtrl = TextEditingController();
  final _stateCtrl = TextEditingController();
  final _districtCtrl = TextEditingController();
  final _blockCtrl = TextEditingController();
  final _villageCtrl = TextEditingController();

  String _language = 'English';
  String _livestockType = 'Cattle';

  final List<String> _languages = ['English', 'Tamil', 'Hindi'];
  final List<String> _livestockTypes = [
    'Cattle',
    'Goats',
    'Sheep',
    'Poultry',
    'Mixed',
    'Other',
  ];

  @override
  void dispose() {
    _nameCtrl.dispose();
    _mobileCtrl.dispose();
    _emailCtrl.dispose();
    _farmNameCtrl.dispose();
    _stateCtrl.dispose();
    _districtCtrl.dispose();
    _blockCtrl.dispose();
    _villageCtrl.dispose();
    super.dispose();
  }

  void _next() {
    if (!_formKey.currentState!.validate()) return;

    // Build a partial profile (saved after OTP + password flow)
    final profile = FarmerProfile(
      fullName: _nameCtrl.text.trim(),
      mobileNumber: _mobileCtrl.text.trim(),
      email: _emailCtrl.text.trim().isEmpty ? null : _emailCtrl.text.trim(),
      preferredLanguage: _language,
      state: _stateCtrl.text.trim(),
      district: _districtCtrl.text.trim(),
      block: _blockCtrl.text.trim(),
      village: _villageCtrl.text.trim(),
      farmName: _farmNameCtrl.text.trim().isEmpty
          ? null
          : _farmNameCtrl.text.trim(),
      livestockType: _livestockType,
    );

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => OtpScreen(
          dataService: widget.dataService,
          profile: profile,
          mobileNumber: _mobileCtrl.text.trim(),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Farmer Registration',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Center(
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 36,
                      backgroundColor: colorScheme.primaryContainer,
                      child: Icon(Icons.agriculture,
                          size: 40, color: colorScheme.primary),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Create Your Account',
                      style: TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const Text(
                      'Join Smart Livestock to manage your animals.',
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 28),

              _sectionLabel('Personal Information'),
              const SizedBox(height: 12),
              _field(_nameCtrl, 'Full Name *', Icons.person,
                  validator: _requiredValidator('name')),
              const SizedBox(height: 12),
              _field(
                _mobileCtrl,
                'Mobile Number *',
                Icons.phone,
                type: TextInputType.phone,
                validator: (v) {
                  if (v == null || v.trim().isEmpty) {
                    return 'Please enter your mobile number.';
                  }
                  if (!RegExp(r'^\d{10}$').hasMatch(v.trim())) {
                    return 'Enter a valid 10-digit mobile number.';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              _field(
                _emailCtrl,
                'Email (optional)',
                Icons.email,
                type: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16),

              _sectionLabel('Language Preference'),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                initialValue: _language,
                decoration: _deco('Preferred Language', Icons.language),
                items: _languages
                    .map((l) => DropdownMenuItem(value: l, child: Text(l)))
                    .toList(),
                onChanged: (v) => setState(() => _language = v!),
              ),
              const SizedBox(height: 16),

              _sectionLabel('Location'),
              const SizedBox(height: 12),
              _field(_stateCtrl, 'State *', Icons.map,
                  validator: _requiredValidator('state')),
              const SizedBox(height: 12),
              _field(_districtCtrl, 'District *', Icons.location_city,
                  validator: _requiredValidator('district')),
              const SizedBox(height: 12),
              _field(_blockCtrl, 'Block / Taluk *', Icons.apartment,
                  validator: _requiredValidator('block')),
              const SizedBox(height: 12),
              _field(_villageCtrl, 'Village *', Icons.villa,
                  validator: _requiredValidator('village')),
              const SizedBox(height: 16),

              _sectionLabel('Farm Information'),
              const SizedBox(height: 12),
              _field(_farmNameCtrl, 'Farm Name (optional)', Icons.agriculture),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _livestockType,
                decoration: _deco('Livestock Type', Icons.pets),
                items: _livestockTypes
                    .map((l) => DropdownMenuItem(value: l, child: Text(l)))
                    .toList(),
                onChanged: (v) => setState(() => _livestockType = v!),
              ),
              const SizedBox(height: 32),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: _next,
                  icon: const Icon(Icons.arrow_forward),
                  label: const Text(
                    'Next: Verify Mobile',
                    style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Center(
                child: TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Already have an account? Login'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _field(
    TextEditingController ctrl,
    String label,
    IconData icon, {
    TextInputType type = TextInputType.text,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: ctrl,
      keyboardType: type,
      decoration: _deco(label, icon),
      validator: validator,
    );
  }

  InputDecoration _deco(String label, IconData icon) => InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border:
            OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      );

  Widget _sectionLabel(String text) => Text(
        text,
        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
      );

  String? Function(String?) _requiredValidator(String field) =>
      (v) => v == null || v.trim().isEmpty
          ? 'Please enter your $field.'
          : null;
}
