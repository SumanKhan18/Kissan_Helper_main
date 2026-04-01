export interface AdminRegistration {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  aadhaarNumber: string;
  aadhaarImageUrl: string;
  adminPhotoUrl: string;
  paymentId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  registrationDate: Date;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  adminId?: string;
  adminPassword?: string;
}

export interface AdminLogin {
  adminId: string;
  adminPassword: string;
}