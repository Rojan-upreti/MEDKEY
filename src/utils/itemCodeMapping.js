// Item Code to Name Mapping Utility
// Handles mapping of medical item codes to their corresponding names

// Medical item codes and their corresponding names
export const ITEM_CODE_MAPPING = {
  '48119': 'Complete Blood Count',
  '48120': 'Lipid Panel',
  '48121': 'HbA1c Test',
  '48122': 'Thyroid Function Test',
  '48123': 'Liver Function Test',
  '48124': 'Kidney Function Test',
  '48125': 'Chest X-Ray',
  '48126': 'ECG',
  '48127': 'MRI Scan',
  '48128': 'CT Scan',
  '48129': 'Ultrasound',
  '48130': 'Biopsy',
  // Add more mappings as needed
};

/**
 * Get the item name for a given item code
 * @param {string} itemCode - The item code to look up
 * @returns {string} - The item name or 'Other' if not found
 */
export const getItemName = (itemCode) => {
  if (!itemCode) return 'Other';
  
  const itemName = ITEM_CODE_MAPPING[itemCode.toString()];
  return itemName || 'Other';
};

/**
 * Check if an item code exists in the mapping
 * @param {string} itemCode - The item code to check
 * @returns {boolean} - True if the item code exists in mapping
 */
export const hasItemCode = (itemCode) => {
  if (!itemCode) return false;
  return ITEM_CODE_MAPPING.hasOwnProperty(itemCode.toString());
};

/**
 * Get all available item codes
 * @returns {Array} - Array of all available item codes
 */
export const getAllItemCodes = () => {
  return Object.keys(ITEM_CODE_MAPPING);
};

/**
 * Get all item names
 * @returns {Array} - Array of all available item names
 */
export const getAllItemNames = () => {
  return Object.values(ITEM_CODE_MAPPING);
};

/**
 * Search for item codes by name (partial match)
 * @param {string} searchTerm - The search term to match against item names
 * @returns {Array} - Array of matching item codes and names
 */
export const searchItemCodes = (searchTerm) => {
  if (!searchTerm) return [];
  
  const searchLower = searchTerm.toLowerCase();
  const results = [];
  
  Object.entries(ITEM_CODE_MAPPING).forEach(([code, name]) => {
    if (name.toLowerCase().includes(searchLower) || code.includes(searchTerm)) {
      results.push({ code, name });
    }
  });
  
  return results;
};

/**
 * Add a new item code mapping
 * @param {string} itemCode - The item code to add
 * @param {string} itemName - The item name to associate with the code
 */
export const addItemCodeMapping = (itemCode, itemName) => {
  if (itemCode && itemName) {
    ITEM_CODE_MAPPING[itemCode.toString()] = itemName;
  }
};

/**
 * Remove an item code mapping
 * @param {string} itemCode - The item code to remove
 */
export const removeItemCodeMapping = (itemCode) => {
  if (itemCode && ITEM_CODE_MAPPING.hasOwnProperty(itemCode.toString())) {
    delete ITEM_CODE_MAPPING[itemCode.toString()];
  }
};
