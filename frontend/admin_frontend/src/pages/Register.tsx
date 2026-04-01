//new code 
// import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Phone, MapPin, CreditCard, Upload, CheckCircle, Clock, Check } from 'lucide-react';
// import { uploadFile } from '../services/storage';
// import { uploadFile, saveAdminRegistration } from '../firebase';
import { initializeRazorpay, processPayment } from '../services/razorpay';
import { sendOTPEmail } from '../services/emailjs';
import { sendSMSOTP, verifySMSOTP } from '../services/twilio';
import { useAuth } from '../context/AuthContext.jsx';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    aadhaarNumber: '',
    password: '',
    confirmPassword: '',
    otp: '',
    mobileOtp: '',
    aadhaarImage: null as any,
    applicantImage: null as any
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpState.isOtpVerified || !mobileOtpState.isOtpVerified) {
      alert('Please verify both email and mobile OTPs');
      return;
    }

    if (!validateAadhaar(formData.aadhaarNumber)) {
      alert('Enter valid Aadhaar number');
      return;
    }

    if (!formData.aadhaarImage?.file || !formData.applicantImage?.file) {
      alert('Please upload Aadhaar and photo');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password must match');
      return;
    }

    setLoading(true);
    try {
      // Optional client-side payment (can be skipped since backend marks as paid in test mode)
      try {
        const loaded = await initializeRazorpay();
        if (loaded) {
          await processPayment(formData.email, formData.phoneNumber, formData.fullName);
        }
      } catch {}

      // Clean phone number - remove all non-digits and ensure it's 10 digits
      const cleanPhone = formData.phoneNumber.replace(/\D/g, '').slice(-10);
      if (cleanPhone.length !== 10) {
        alert('Phone number must be exactly 10 digits');
        setLoading(false);
        return;
      }

      const payload: Record<string, any> = {
        name: formData.fullName,
        email: formData.email,
        phone: cleanPhone,
        address: formData.address,
        aadhaarNumber: formData.aadhaarNumber.replace(/\s/g, ''),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        amount: '499',
        aadhaarImage: formData.aadhaarImage.file,
        personalImage: formData.applicantImage.file,
      };

      const res = await register(payload);

      if (res?.success) {
        if (res.admin?.status === 'success') {
          navigate('/layout');
        } else {
          alert('Registration submitted. You will be able to login after approval.');
          navigate('/Login');
        }
      } else {
        alert(res?.message || 'Registration failed');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err?.response?.data?.errors) {
        // Show validation errors
        const errorMessages = err.response.data.errors.map((e: any) => `${e.field}: ${e.msg}`).join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert(err?.response?.data?.message || err?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState({ aadhaar: false, applicant: false });

  const [otpState, setOtpState] = useState({
    isOtpSent: false,
    isOtpVerified: false,
    otpLoading: false,
    generatedOtp: '',
    otpTimer: 0,
    canResend: true
  });

  const [mobileOtpState, setMobileOtpState] = useState({
    isOtpSent: false,
    isOtpVerified: false,
    otpLoading: false,
    generatedOtp: '',
    otpTimer: 0,
    canResend: true
  });

  useEffect(() => {
    let interval: any;
    if (otpState.otpTimer > 0) {
      interval = setInterval(() => {
        setOtpState(prev => ({
          ...prev,
          otpTimer: prev.otpTimer - 1,
          canResend: prev.otpTimer <= 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpState.otpTimer]);

  useEffect(() => {
    let interval: any;
    if (mobileOtpState.otpTimer > 0) {
      interval = setInterval(() => {
        setMobileOtpState(prev => ({
          ...prev,
          otpTimer: prev.otpTimer - 1,
          canResend: prev.otpTimer <= 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mobileOtpState.otpTimer]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    if (!formData.email || !formData.fullName) {
      alert('Please enter full name and email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email');
      return;
    }
    setOtpState(prev => ({ ...prev, otpLoading: true }));
    try {
      const otp = generateOTP();
      const success = await sendOTPEmail(formData.email, otp, formData.fullName);
      if (success) {
        setOtpState({
          ...otpState,
          isOtpSent: true,
          generatedOtp: otp,
          otpTimer: 60,
          canResend: false,
          otpLoading: false
        });
        alert(`OTP sent to ${formData.email}`);
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to send OTP');
      setOtpState(prev => ({ ...prev, otpLoading: false }));
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp === otpState.generatedOtp) {
      setOtpState(prev => ({ ...prev, isOtpVerified: true }));
      alert('Email OTP verified!');
    } else {
      alert('Invalid OTP');
    }
  };

  const handleSendMobileOtp = async () => {
    if (!validatePhone(formData.phoneNumber)) {
      alert('Enter a valid phone number');
      return;
    }
    setMobileOtpState(prev => ({ ...prev, otpLoading: true }));
    try {
      const result = await sendSMSOTP(formData.phoneNumber);
      if (result.success) {
        setMobileOtpState({
          ...mobileOtpState,
          isOtpSent: true,
          generatedOtp: '',
          otpTimer: 60,
          canResend: false,
          otpLoading: false
        });
        alert(`SMS OTP sent to ${formData.phoneNumber}`);
      } else {
        throw new Error(result.error || 'Failed to send SMS OTP');
      }
    } catch (error: any) {
      alert(error.message || 'SMS OTP failed');
      setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
    }
  };

  const handleVerifyMobileOtp = () => {
    if (!formData.mobileOtp) {
      alert('Enter the mobile OTP');
      return;
    }
    setMobileOtpState(prev => ({ ...prev, otpLoading: true }));
    verifySMSOTP(formData.phoneNumber, formData.mobileOtp)
      .then(result => {
        if (result.success) {
          setMobileOtpState(prev => ({ ...prev, isOtpVerified: true, otpLoading: false }));
          alert('Mobile OTP verified!');
        } else {
          alert(result.error || 'Invalid mobile OTP');
          setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
        }
      })
      .catch(() => {
        alert('Failed to verify mobile OTP');
        setMobileOtpState(prev => ({ ...prev, otpLoading: false }));
      });
  };

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const validateAadhaar = (aadhaar: string) => /^\d{4}\s?\d{4}\s?\d{4}$/.test(aadhaar.replace(/\s/g, ''));

  const handleDrop = (e: React.DragEvent, field: 'aadhaarImage' | 'applicantImage') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({
      ...prev,
      [field === 'aadhaarImage' ? 'aadhaar' : 'applicant']: false
    }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(field, e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (field: 'aadhaarImage' | 'applicantImage', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        [field]: {
          name: file.name,
          file: file,
          base64: base64String,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <div className="text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Registration Submitted!</h2>
            <p className="text-gray-600 mt-2">
              You will receive your admin credentials after approval.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-1000 mt-6">
          <div className="text-center mb-8">
            <Link to="/Register" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                KissanHelper
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Registration</h2>
            <p className="text-slate-400">Apply for admin access - Manual approval required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                    {!mobileOtpState.isOtpSent ? (
                      <button
                        type="button"
                        onClick={handleSendMobileOtp}
                        disabled={mobileOtpState.otpLoading}
                        className="text-sm bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
                      >
                        {mobileOtpState.otpLoading ? 'Sending...' : 'Send OTP'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendMobileOtp}
                        disabled={!mobileOtpState.canResend || mobileOtpState.otpLoading}
                        className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
                      >
                        {mobileOtpState.otpLoading ? (
                          'Sending...'
                        ) : mobileOtpState.canResend ? (
                          'Resend'
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            {mobileOtpState.otpTimer}s
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {mobileOtpState.isOtpSent && (
                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-slate-300">
                        OTP sent to {formData.phoneNumber}
                      </span>
                      {mobileOtpState.isOtpVerified && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={formData.mobileOtp}
                        onChange={(e) => handleInputChange('mobileOtp', e.target.value.replace(/\D/g, ''))}
                        className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={mobileOtpState.isOtpVerified}
                      />

                      {!mobileOtpState.isOtpVerified ? (
                        <button
                          type="button"
                          onClick={handleVerifyMobileOtp}
                          disabled={formData.mobileOtp?.length !== 6 || mobileOtpState.otpLoading}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                        >
                          {mobileOtpState.otpLoading ? 'Verifying...' : 'Verify'}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                          <Check className="w-5 h-5" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-40 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                    {!otpState.isOtpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpState.otpLoading}
                        className="text-sm bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
                      >
                        {otpState.otpLoading ? 'Sending...' : 'Send OTP'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!otpState.canResend || otpState.otpLoading}
                        className="text-sm bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white py-2 px-3 rounded transition-colors flex items-center gap-1"
                      >
                        {otpState.otpLoading ? (
                          'Sending...'
                        ) : otpState.canResend ? (
                          'Resend'
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            {otpState.otpTimer}s
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {otpState.isOtpSent && (
                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-slate-300">
                        OTP sent to {formData.email}
                      </span>
                      {otpState.isOtpVerified && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                        className="flex-1 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={otpState.isOtpVerified}
                      />

                      {!otpState.isOtpVerified ? (
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={formData.otp.length !== 6 || otpState.otpLoading}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                        >
                          {otpState.otpLoading ? 'Verifying...' : 'Verify'}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                          <Check className="w-5 h-5" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Password *"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Confirm Password *"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <textarea
                required
                placeholder="Complete Address *"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                required
                placeholder="Aadhaar Card Number (XXXX XXXX XXXX) *"
                value={formData.aadhaarNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
                  if (value.length <= 14) {
                    handleInputChange('aadhaarNumber', value);
                  }
                }}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Aadhaar Card Image *</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.aadhaar ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-green-500 hover:bg-slate-700/30'}`}
                  onDragEnter={(e) => handleDrop(e, 'aadhaarImage')}
                  onDragLeave={(e) => handleDrop(e, 'aadhaarImage')}
                  onDragOver={(e) => handleDrop(e, 'aadhaarImage')}
                  onDrop={(e) => handleDrop(e, 'aadhaarImage')}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarImage', e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  {formData.aadhaarImage ? (
                    <p className="text-green-400 text-sm font-medium">{formData.aadhaarImage.name}</p>
                  ) : (
                    <p className="text-slate-400 text-sm">Drop Aadhaar card here or click to upload</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Photo *</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${dragActive.applicant ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-green-500 hover:bg-slate-700/30'}`}
                  onDragEnter={(e) => handleDrop(e, 'applicantImage')}
                  onDragLeave={(e) => handleDrop(e, 'applicantImage')}
                  onDragOver={(e) => handleDrop(e, 'applicantImage')}
                  onDrop={(e) => handleDrop(e, 'applicantImage')}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('applicantImage', e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  {formData.applicantImage ? (
                    <p className="text-green-400 text-sm font-medium">{formData.applicantImage.name}</p>
                  ) : (
                    <p className="text-slate-400 text-sm">Drop your photo here or click to upload</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-slate-400">
                I agree to the{' '}
                <Link to="#" className="text-green-400 hover:text-green-300">Terms and Conditions</Link> and understand that this registration requires manual approval.
              </span>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Important Notice:</h4>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• Your application will be manually reviewed</li>
                <li>• Admin credentials will be sent to your email after approval</li>
                <li>• Email and mobile verification with OTP is required</li>
                <li>• Payment is required to complete registration</li>
                <li>• If file upload fails, you can email documents manually</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || !otpState.isOtpVerified || !mobileOtpState.isOtpVerified}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${loading || !otpState.isOtpVerified || !mobileOtpState.isOtpVerified
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-105'
                }`}
            >
              {loading ? 'Processing...' : (!otpState.isOtpVerified || !mobileOtpState.isOtpVerified ? 'Verify Email & Mobile First' : 'Register & Pay ₹499')}
            </button>

            <div className="mt-8 text-center">
              <p className="text-slate-400">
                Already have login credentials?{' '}
                <Link to="/Login" className="text-green-400 hover:text-green-300 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

