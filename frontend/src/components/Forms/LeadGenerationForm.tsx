import React, { useState } from 'react';
import type { Label } from '../../types';
import FormField from '../UI/FormField';
import { mockUpdateLabel, updateLabel } from '../../api/labelService';

interface LeadGenerationFormProps {
  labels: Label[];
  moduleName: string;
  tenantId: string;
  screenName: string;
  onLabelsUpdate: (updatedLabel: Label) => void;
}

const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({
  labels,
  moduleName,
  tenantId,
  screenName,
  onLabelsUpdate,
}) => {
  const [formData, setFormData] = useState({
    customerType: '',
    residentType: '',
    nearestLocation: '',
    leadChannel: '',
    preferredTime: '',
    marketingExecutive: '',
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

  const customerTypeLabel = getLabelByKey('lbl_customerType');
  const residentTypeLabel = getLabelByKey('lbl_residentType');
  const nearestLocationLabel = getLabelByKey('lbl_nearestLocation');
  const leadChannelLabel = getLabelByKey('lbl_leadChannel');
  const preferredTimeLabel = getLabelByKey('lbl_preferredTime');
  const marketingExecutiveLabel = getLabelByKey('lbl_marketingExecutive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would submit the form data to your backend
  };

  const customerTypeOptions = ['Individual', 'Corporate', 'Small Business'];
  const residentTypeOptions = ['Owned', 'Rented', 'Mortgaged', 'Living with Family'];
  const leadChannelOptions = ['Website', 'Phone', 'Walk-in', 'Referral', 'Social Media'];
  const preferredTimeOptions = ['Morning', 'Afternoon', 'Evening'];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Lead Generation</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {customerTypeLabel && (
          <FormField
            labelKey="lbl_customerType"
            labelName={customerTypeLabel.name}
            defaultName={customerTypeLabel.defaultName}
            value={formData.customerType}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            type="select"
            options={customerTypeOptions}
            required
          />
        )}
        
        {residentTypeLabel && (
          <FormField
            labelKey="lbl_residentType"
            labelName={residentTypeLabel.name}
            defaultName={residentTypeLabel.defaultName}
            value={formData.residentType}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            type="select"
            options={residentTypeOptions}
          />
        )}
        
        {nearestLocationLabel && (
          <FormField
            labelKey="lbl_nearestLocation"
            labelName={nearestLocationLabel.name}
            defaultName={nearestLocationLabel.defaultName}
            value={formData.nearestLocation}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
          />
        )}
        
        {leadChannelLabel && (
          <FormField
            labelKey="lbl_leadChannel"
            labelName={leadChannelLabel.name}
            defaultName={leadChannelLabel.defaultName}
            value={formData.leadChannel}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            type="select"
            options={leadChannelOptions}
            required
          />
        )}
        
        {preferredTimeLabel && (
          <FormField
            labelKey="lbl_preferredTime"
            labelName={preferredTimeLabel.name}
            defaultName={preferredTimeLabel.defaultName}
            value={formData.preferredTime}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
            type="select"
            options={preferredTimeOptions}
          />
        )}
        
        {marketingExecutiveLabel && (
          <FormField
            labelKey="lbl_marketingExecutive"
            labelName={marketingExecutiveLabel.name}
            defaultName={marketingExecutiveLabel.defaultName}
            value={formData.marketingExecutive}
            onChange={handleChange}
            onLabelUpdate={handleLabelUpdate}
          />
        )}
        
        <div className="col-span-1 md:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Submit Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadGenerationForm;