# Google Form Integration Guide

## Overview
Your exhibitor registration form is now connected to your Google Form. When users fill out the form on your website, it will automatically pre-fill the Google Form with their information.

## How It Works
1. User fills out the exhibitor registration form on your website
2. When they click "REGISTER AS EXHIBITOR", the form validates their input
3. A confirmation dialog appears asking if they want to proceed
4. If confirmed, a new tab opens with your Google Form pre-filled with their data
5. User can review the information and submit the Google Form

## ✅ Integration Complete!

Your Google Form integration has been successfully configured with the correct entry IDs from your form.

### Entry IDs Configured:
- **Title**: `entry.758188846`
- **Full Name**: `entry.930896042`
- **Mobile Number**: `entry.553952233`
- **Email**: `entry.1598177166`
- **Country**: `entry.1208590350`
- **Company**: `entry.172760247`
- **Job Title**: `entry.622187862`
- **Company Address**: `entry.982931524`
- **Business Type**: `entry.759839504`
- **Business Type Other**: `entry.1322037478`
- **Market Sector**: `entry.1473624981`
- **Market Sector Other**: `entry.668076561`

### Google Form URL:
`https://docs.google.com/forms/d/e/1FAIpQLSdG4eicjOOgDHtMuF-VR0TpdsOOE2QaMwCO-BwyCDsifZc8kQ/viewform`

### Step 3: Test the Integration
1. Fill out the exhibitor registration form on your website
2. Click "REGISTER AS EXHIBITOR"
3. Confirm the dialog
4. Check that the Google Form opens with pre-filled data
5. Verify all fields are correctly populated

## Field Mapping

| Website Form Field | Google Form Field | Notes |
|-------------------|-------------------|-------|
| Title | Title | Dropdown selection |
| Full Name | Full Name | Text input |
| Mobile Number | Mobile Number | Includes country code |
| Email | Email | Email validation |
| Country | Country | Dropdown selection |
| Company | Company | Text input |
| Job Title | Job Title | Text input |
| Company Address | Company Address | Textarea |
| Business Type | Business Type | Dropdown + "Other" option |
| Market Sector | Market Sector of Interest | Dropdown + "Other" option |

## Troubleshooting

### Form Not Pre-filling
- Check that entry IDs are correct
- Verify the Google Form URL is accessible
- Check browser console for errors

### Wrong Data in Fields
- Verify the field mapping is correct
- Check that form field names match exactly
- Test with simple data first

### Form Not Opening
- Check if popup blockers are enabled
- Verify the Google Form URL is correct
- Test the URL manually in a new tab

## Helper Component
A blue "Show Helper" button appears at the bottom-right of the exhibitor registration page. Click it to see step-by-step instructions for getting entry IDs.

## Security Notes
- The form data is sent via URL parameters (visible in the address bar)
- Sensitive information should not be included in the form
- Consider using Google Apps Script for more secure data handling if needed

## Next Steps
1. Complete the entry ID mapping
2. Test the integration thoroughly
3. Consider adding form analytics
4. Monitor form submissions in Google Forms
5. Set up email notifications for new submissions

## Support
If you encounter issues:
1. Check the browser console for error messages
2. Verify all entry IDs are correct
3. Test the Google Form URL manually
4. Ensure the form is publicly accessible
