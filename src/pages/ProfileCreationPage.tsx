import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Shield, Star, CheckCircle } from 'lucide-react';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profileImage?: File;
  isPremium: boolean;
}

const ProfileCreationPage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, upgradeToPremium } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    isPremium: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        ...formData,
        profileCreated: true
      });

      if (formData.isPremium) {
        await upgradeToPremium();
        navigate('/assessment');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-emerald-600 rounded-full p-2 cursor-pointer">
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Street Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderPremiumOption = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Choose Your Plan</h3>
        <p className="text-gray-600">Select the plan that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            !formData.isPremium 
              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
              : 'border-gray-200 hover:border-emerald-200'
          }`}
          onClick={() => setFormData({ ...formData, isPremium: false })}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold">Basic Plan</h4>
              <p className="text-gray-600">Free</p>
            </div>
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Access to standard menu</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Basic meal tracking</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Standard delivery options</span>
            </li>
          </ul>
        </div>

        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            formData.isPremium 
              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
              : 'border-gray-200 hover:border-emerald-200'
          }`}
          onClick={() => setFormData({ ...formData, isPremium: true })}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold">Premium Plan</h4>
              <p className="text-gray-600">$14.99/month</p>
            </div>
            <Star className="w-6 h-6 text-emerald-600" />
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Personalized meal plans</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Advanced nutrition tracking</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Priority delivery</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Exclusive recipes</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span>Nutritionist consultation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Complete Your Profile
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Tell us a bit about yourself to get started
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex-1 h-2 ${
                    stepNumber <= step ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && renderPersonalInfo()}
            {step === 2 && renderAddressInfo()}
            {step === 3 && renderPremiumOption()}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating Profile...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage; 