# Item Code to Name Mapping Fix

## Problem Description

In your healthcare application, there's an issue where item codes (like "48119") are being displayed as "Other" in the description field instead of showing their proper item names. This happens because the application doesn't have a mapping between item codes and their corresponding names.

## Solution

I've created a comprehensive solution that includes:

1. **Item Code Mapping Utility** (`src/utils/itemCodeMapping.js`)
2. **Fixed Display Components** (`src/components/ItemCodeDisplay.jsx`, `src/components/LabResultsFixed.jsx`)
3. **Integration Examples**

## Files Created

### 1. `src/utils/itemCodeMapping.js`
This utility provides:
- A mapping object with item codes and their names
- Functions to get item names from codes
- Search and management functions

```javascript
import { getItemName } from '../utils/itemCodeMapping';

// Instead of showing "Other"
const itemName = getItemName('48119'); // Returns "Complete Blood Count"
```

### 2. `src/components/ItemCodeDisplay.jsx`
A reusable component that properly displays item information:

```javascript
<ItemCodeDisplay
  itemCode="48119"
  description="Blood test for complete blood count"
  value="Normal"
  status="Normal"
  date="Jan 15, 2024"
/>
```

### 3. `src/components/LabResultsFixed.jsx`
A fixed version of the lab results component that uses proper item name mapping.

## How to Implement the Fix

### Step 1: Import the utility
```javascript
import { getItemName } from '../utils/itemCodeMapping';
```

### Step 2: Replace hardcoded "Other" with proper mapping
**Before:**
```javascript
<div className="data-item-label">Other</div>
```

**After:**
```javascript
<div className="data-item-label">{getItemName(itemCode)}</div>
```

### Step 3: Update your data structure
Make sure your lab results data includes the item code:

```javascript
const labResults = [
  {
    itemCode: '48119',
    status: 'Normal',
    date: 'Jan 15, 2024'
  },
  // ... more results
];
```

## Example Integration

Here's how to fix the existing lab results in your PHRDashboard:

```javascript
// In your renderLabs function, replace:
<li className="data-item">
  <span className="data-item-label">Complete Blood Count</span>
  <span className="data-item-value status-normal">Normal - Jan 15, 2024</span>
</li>

// With:
<li className="data-item">
  <span className="data-item-label">{getItemName('48119')}</span>
  <span className="data-item-value status-normal">Normal - Jan 15, 2024</span>
</li>
```

## Adding More Item Codes

To add more item codes to the mapping, edit `src/utils/itemCodeMapping.js`:

```javascript
export const ITEM_CODE_MAPPING = {
  '48119': 'Complete Blood Count',
  '48120': 'Lipid Panel',
  '48121': 'HbA1c Test',
  // Add your new codes here
  '48131': 'Your New Test Name',
};
```

## Benefits

1. **Consistent Display**: All item codes will show proper names instead of "Other"
2. **Maintainable**: Easy to add new item codes and names
3. **Searchable**: Can search for items by name or code
4. **Flexible**: Works with any component that needs to display item names

## Testing

You can test the fix by:

1. Using the `ItemCodeExample` component
2. Checking that item code "48119" now shows "Complete Blood Count" instead of "Other"
3. Verifying that unknown codes still show "Other" with the code displayed

## Next Steps

1. Integrate the `getItemName` function into your existing components
2. Update your data sources to include item codes
3. Add more item codes to the mapping as needed
4. Consider loading the mapping from an API or database for production use

