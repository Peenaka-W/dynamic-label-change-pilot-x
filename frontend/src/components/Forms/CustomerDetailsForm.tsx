import React, { useState } from 'react';
import type { Label } from '../../types';
import FormField from '../UI/FormField';
import { mockUpdateLabel, updateLabel } from '../../api/labelService';

interface CustomerDetailsFormProps {
  labels: Label[];
  moduleName: string;
  tenantId: string;
  screenName: string;
  onLabelsUpdate: (updatedLabel: Label) => void;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  labels,
  moduleName,
  tenantId,
  screenName,
  onLabelsUpdate,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    accountNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace('lbl_', '')]: value,
    }));
  };

  const handleLabelUpdate = async (labelKey: string, newName: string): Promise<void> => {
    try {
      const updatedLabel = await updateLabel(
        moduleName,
        tenantId,
        screenName,
        labelKey,
        { personalizedName: newName, updatedBy: 'Admin' }
      );
      
      if (updatedLabel) {
        onLabelsUpdate(updatedLabel);
      }
    } catch (error) {
      console.error('Failed to update label:', error);
    }
  };

  const getLabelByKey = (key: string): Label | undefined => {
    return labels.find((label) => label.key === key);
  };

  const titleLabel = getLabelByKey('lbl_title');
  const firstNameLabel = getLabelByKey('lbl_firstName');
  const lastNameLabel = getLabelByKey('lbl_lastName');
  const genderLabel = getLabelByKey('lbl_gender');
  const accountNumberLabel = getLabelByKey('lbl_accountNumber');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would submit the form data to your backend
  };

  const titleOptions = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Customer Details</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {titleLabel && (
          <FormField
            labelKey="lbl_title"
            labelName={titleLabel.name}
            defaultName={titleLabel.defaultName}
            value={formData.title}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            type="select"
            options={titleOptions}
            required
          />
        )}
        
        {firstNameLabel && (
          <FormField
            labelKey="lbl_firstName"
            labelName={firstNameLabel.name}
            defaultName={firstNameLabel.defaultName}
            value={formData.firstName}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            required
          />
        )}
        
        {lastNameLabel && (
          <FormField
            labelKey="lbl_lastName"
            labelName={lastNameLabel.name}
            defaultName={lastNameLabel.defaultName}
            value={formData.lastName}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            required
          />
        )}
        
        {genderLabel && (
          <FormField
            labelKey="lbl_gender"
            labelName={genderLabel.name}
            defaultName={genderLabel.defaultName}
            value={formData.gender}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            type="select"
            options={genderOptions}
          />
        )}
        
        {accountNumberLabel && (
          <FormField
            labelKey="lbl_accountNumber"
            labelName={accountNumberLabel.name}
            defaultName={accountNumberLabel.defaultName}
            value={formData.accountNumber}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
          />
        )}
        
        <div className="col-span-1 md:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Save Customer Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetailsForm;