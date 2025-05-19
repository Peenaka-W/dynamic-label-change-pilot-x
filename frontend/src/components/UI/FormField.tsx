import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface FormFieldProps {
  labelKey: string;
  labelName: string;
  defaultName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onLabelUpdate: (labelKey: string, newName: string) => Promise<void>;
  type?: 'text' | 'select';
  options?: string[];
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  labelKey,
  labelName,
  defaultName,
  value,
  onChange,
  onLabelUpdate,
  type = 'text',
  options = [],
  required = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(labelName);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditClick = () => {
    setEditValue(labelName);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (editValue.trim() === '') return;
    
    setIsUpdating(true);
    try {
      await onLabelUpdate(labelKey, editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update label:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditValue(labelName);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2 group">
        {isEditing ? (
          <div className="flex items-center w-full">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-2 py-1 text-sm font-medium text-gray-700 border-b-2 border-blue-500 bg-blue-50 focus:outline-none focus:border-blue-600"
              autoFocus
            />
            <button
              onClick={handleSaveClick}
              disabled={isUpdating}
              className="ml-2 p-1 text-green-600 hover:text-green-800 transition-colors duration-150 disabled:opacity-50"
              title="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancelClick}
              className="ml-1 p-1 text-red-600 hover:text-red-800 transition-colors duration-150"
              title="Cancel"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center w-full">
            <label
              htmlFor={labelKey}
              className="flex-1 text-sm font-medium text-gray-700"
            >
              {labelName}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <button
              onClick={handleEditClick}
              className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-gray-400 hover:text-blue-600 transition-all duration-200"
              title="Edit label"
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </div>
      
      {type === 'text' ? (
        <input
          type="text"
          id={labelKey}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          placeholder={`Enter ${labelName.toLowerCase()}`}
          required={required}
        />
      ) : (
        <select
          id={labelKey}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          required={required}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormField;



// import React, { useState } from 'react';
// import { Edit2, Check, X } from 'lucide-react';

// interface FormFieldProps {
//   labelKey: string;
//   labelName: string;
//   defaultName: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   onLabelUpdate: (labelKey: string, newName: string) => Promise<void>;
//   type?: 'text' | 'select';
//   options?: string[];
//   required?: boolean;
// }

// const FormField: React.FC<FormFieldProps> = ({
//   labelKey,
//   labelName,
//   defaultName,
//   value,
//   onChange,
//   onLabelUpdate,
//   type = 'text',
//   options = [],
//   required = false,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(labelName);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleEditClick = () => {
//     setEditValue(labelName);
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     if (editValue.trim() === '') return;
    
//     setIsUpdating(true);
//     try {
//       await onLabelUpdate(labelKey, editValue);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update label:', error);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className="mb-4">
//       <div className="flex items-center mb-1">
//         {isEditing ? (
//           <>
//             <input
//               type="text"
//               value={editValue}
//               onChange={(e) => setEditValue(e.target.value)}
//               className="text-sm font-medium text-gray-700 border-b border-blue-500 bg-blue-50 px-1 py-0.5 mr-2 focus:outline-none"
//               autoFocus
//             />
//             <button
//               onClick={handleSaveClick}
//               disabled={isUpdating}
//               className="p-1 text-green-600 hover:text-green-800 transition-colors duration-150"
//               title="Save"
//             >
//               <Check size={16} />
//             </button>
//             <button
//               onClick={handleCancelClick}
//               className="p-1 text-red-600 hover:text-red-800 transition-colors duration-150"
//               title="Cancel"
//             >
//               <X size={16} />
//             </button>
//           </>
//         ) : (
//           <>
//             <label
//               htmlFor={labelKey}
//               className="block text-sm font-medium text-gray-700"
//             >
//               {labelName}
//               {required && <span className="text-red-500 ml-1">*</span>}
//             </label>
//             <button
//               onClick={handleEditClick}
//               className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors duration-150"
//               title="Edit label"
//             >
//               <Edit2 size={14} />
//             </button>
//           </>
//         )}
//       </div>
//       {type === 'text' ? (
//         <input
//           type="text"
//           id={labelKey}
//           value={value}
//           onChange={onChange}
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
//           placeholder={`Enter ${labelName.toLowerCase()}`}
//           required={required}
//         />
//       ) : (
//         <select
//           id={labelKey}
//           value={value}
//           onChange={onChange}
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
//           required={required}
//         >
//           <option value="">Select...</option>
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       )}
//       {defaultName !== labelName && (
//         <p className="mt-1 text-xs text-gray-500">Default: {defaultName}</p>
//       )}
//     </div>
//   );
// };

// export default FormField;