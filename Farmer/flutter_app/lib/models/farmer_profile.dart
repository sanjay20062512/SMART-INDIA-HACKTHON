// Farmer Profile data model

class FarmerProfile {
  final String fullName;
  final String mobileNumber;
  final String? email;
  final String preferredLanguage;
  final String state;
  final String district;
  final String block;
  final String village;
  final String? farmName;
  final String livestockType;

  const FarmerProfile({
    required this.fullName,
    required this.mobileNumber,
    this.email,
    this.preferredLanguage = 'English',
    required this.state,
    required this.district,
    required this.block,
    required this.village,
    this.farmName,
    required this.livestockType,
  });

  FarmerProfile copyWith({
    String? fullName,
    String? mobileNumber,
    String? email,
    String? preferredLanguage,
    String? state,
    String? district,
    String? block,
    String? village,
    String? farmName,
    String? livestockType,
  }) {
    return FarmerProfile(
      fullName: fullName ?? this.fullName,
      mobileNumber: mobileNumber ?? this.mobileNumber,
      email: email ?? this.email,
      preferredLanguage: preferredLanguage ?? this.preferredLanguage,
      state: state ?? this.state,
      district: district ?? this.district,
      block: block ?? this.block,
      village: village ?? this.village,
      farmName: farmName ?? this.farmName,
      livestockType: livestockType ?? this.livestockType,
    );
  }

  Map<String, dynamic> toJson() => {
        'fullName': fullName,
        'mobileNumber': mobileNumber,
        'email': email,
        'preferredLanguage': preferredLanguage,
        'state': state,
        'district': district,
        'block': block,
        'village': village,
        'farmName': farmName,
        'livestockType': livestockType,
      };
}
