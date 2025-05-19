import type{ Label, LabelsResponse, SingleLabelResponse, UpdateLabelPayload, UpdateLabelResponse } from '../types';

const BASE_URL = 'http://localhost:8080/fusionX';

export const fetchLabels = async (
  moduleName: string,
  tenantId: string,
  screenName: string
): Promise<Label[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${moduleName}/${tenantId}/${encodeURIComponent(screenName)}/labels`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch labels: ${response.statusText}`);
    }
    
    const data: LabelsResponse = await response.json();
    return data.labels;
  } catch (error) {
    console.error('Error fetching labels:', error);
    return [];
  }
};

export const fetchLabel = async (
  moduleName: string,
  tenantId: string,
  screenName: string,
  labelKey: string
): Promise<Label | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${moduleName}/${tenantId}/${encodeURIComponent(screenName)}/labels/${labelKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch label: ${response.statusText}`);
    }
    
    const data: SingleLabelResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching label:', error);
    return null;
  }
};

export const updateLabel = async (
  moduleName: string,
  tenantId: string,
  screenName: string,
  labelKey: string,
  payload: UpdateLabelPayload
): Promise<Label | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${moduleName}/${tenantId}/${encodeURIComponent(screenName)}/labels/${labelKey}`,
      {
        method: 'PUT', // Changed from POST to PUT
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to update label: ${response.statusText}`);
    }
    
    const data: UpdateLabelResponse = await response.json();
    return data.labels[0] || null;
  } catch (error) {
    console.error('Error updating label:', error);
    return null;
  }
};

// Mock implementations for development
export const mockFetchLabels = (
  moduleName: string,
  tenantId: string,
  screenName: string
): Promise<Label[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (screenName === 'Lead Generation') {
        resolve([
          {
            id: '1',
            key: 'lbl_customerType',
            name: 'Type of the Customer',
            defaultName: 'Customer Type'
          },
          {
            id: '2',
            key: 'lbl_residentType',
            name: 'Type of Residence',
            defaultName: 'Resident Type'
          },
          {
            id: '3',
            key: 'lbl_nearestLocation',
            name: 'Location',
            defaultName: 'Nearest Location'
          },
          {
            id: '4',
            key: 'lbl_leadChannel',
            name: 'Channel Name',
            defaultName: 'Lead Channel'
          },
          {
            id: '5',
            key: 'lbl_preferredTime',
            name: 'Time',
            defaultName: 'Preferred Time'
          },
          {
            id: '6',
            key: 'lbl_marketingExecutive',
            name: 'Marketing Officer',
            defaultName: 'Marketing Executive'
          }
        ]);
      } else if (screenName === 'Customer Details') {
        resolve([
          {
            id: '7',
            key: 'lbl_title',
            name: 'Title',
            defaultName: 'Title'
          },
          {
            id: '8',
            key: 'lbl_firstName',
            name: 'First Name',
            defaultName: 'First Name'
          },
          {
            id: '9',
            key: 'lbl_lastName',
            name: 'Last Name',
            defaultName: 'Last Name'
          },
          {
            id: '10',
            key: 'lbl_gender',
            name: 'Gender',
            defaultName: 'Gender'
          },
          {
            id: '11',
            key: 'lbl_accountNumber',
            name: 'Account Number',
            defaultName: 'Account Number'
          }
        ]);
      } else {
        resolve([]);
      }
    }, 500);
  });
};

export const mockUpdateLabel = (
  moduleName: string,
  tenantId: string,
  screenName: string,
  labelKey: string,
  payload: UpdateLabelPayload
): Promise<Label | null> => {
  console.log('Updating label:', { moduleName, tenantId, screenName, labelKey, payload });
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedLabel = {
        id: '2',
        key: labelKey,
        name: payload.personalizedName,
        defaultName: 'Default Name'
      };
      console.log('Label updated:', updatedLabel);
      resolve(updatedLabel);
    }, 500);
  });
};

// import type { Label, LabelsResponse, SingleLabelResponse, UpdateLabelPayload, UpdateLabelResponse } from '../types';

// const BASE_URL = 'http://localhost:8080/fusionX';

// export const fetchLabels = async (
//   moduleName: string,
//   tenantId: string,
//   screenName: string
// ): Promise<Label[]> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/${moduleName}/${tenantId}/${encodeURIComponent(screenName)}/labels`
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch labels: ${response.statusText}`);
//     }
    
//     const data: LabelsResponse = await response.json();
//     return data.labels;
//   } catch (error) {
//     console.error('Error fetching labels:', error);
//     return [];
//   }
// };

// export const fetchLabel = async (
//   moduleName: string,
//   tenantId: string,
//   screenName: string,
//   labelKey: string
// ): Promise<Label | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/${moduleName}/${tenantId}/${encodeURIComponent(screenName)}/labels/${labelKey}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch label: ${response.statusText}`);
//     }
    
//     const data: SingleLabelResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching label:', error);
//     return null;
//   }
// };

// export const updateLabel = async (
//   moduleName: string,
//   tenantId: string,
//   screenName: string,
//   labelKey: string,
//   payload: UpdateLabelPayload
// ): Promise<Label | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/${moduleName}/${tenantId}/${encodeURIComponent(screenName)}/labels/${labelKey}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to update label: ${response.statusText}`);
//     }
    
//     const data: UpdateLabelResponse = await response.json();
//     return data.labels[0] || null;
//   } catch (error) {
//     console.error('Error updating label:', error);
//     return null;
//   }
// };

// // Mock implementations for development (remove in production)
// export const mockFetchLabels = (
//   moduleName: string,
//   tenantId: string,
//   screenName: string
// ): Promise<Label[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (screenName === 'Lead Generation') {
//         resolve([
//           {
//             id: '1',
//             key: 'lbl_customerType',
//             name: 'Type of the Customer',
//             defaultName: 'Customer Type'
//           },
//           {
//             id: '2',
//             key: 'lbl_residentType',
//             name: 'Type of Residence',
//             defaultName: 'Resident Type'
//           },
//           {
//             id: '3',
//             key: 'lbl_nearestLocation',
//             name: 'Location',
//             defaultName: 'Nearest Location'
//           },
//           {
//             id: '4',
//             key: 'lbl_leadChannel',
//             name: 'Channel Name',
//             defaultName: 'Lead Channel'
//           },
//           {
//             id: '5',
//             key: 'lbl_preferredTime',
//             name: 'Time',
//             defaultName: 'Preferred Time'
//           },
//           {
//             id: '6',
//             key: 'lbl_marketingExecutive',
//             name: 'Marketing Officer',
//             defaultName: 'Marketing Executive'
//           }
//         ]);
//       } else if (screenName === 'Customer Details') {
//         resolve([
//           {
//             id: '7',
//             key: 'lbl_title',
//             name: 'Title',
//             defaultName: 'Title'
//           },
//           {
//             id: '8',
//             key: 'lbl_firstName',
//             name: 'First Name',
//             defaultName: 'First Name'
//           },
//           {
//             id: '9',
//             key: 'lbl_lastName',
//             name: 'Last Name',
//             defaultName: 'Last Name'
//           },
//           {
//             id: '10',
//             key: 'lbl_gender',
//             name: 'Gender',
//             defaultName: 'Gender'
//           },
//           {
//             id: '11',
//             key: 'lbl_accountNumber',
//             name: 'Account Number',
//             defaultName: 'Account Number'
//           }
//         ]);
//       } else {
//         resolve([]);
//       }
//     }, 500);
//   });
// };

// export const mockUpdateLabel = (
//   moduleName: string,
//   tenantId: string,
//   screenName: string,
//   labelKey: string,
//   payload: UpdateLabelPayload
// ): Promise<Label | null> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         id: '2',
//         key: labelKey,
//         name: payload.personalizedName,
//         defaultName: 'Default Name'
//       });
//     }, 500);
//   });
// };