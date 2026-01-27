# Environment Variables Setup

This project uses environment variables to configure the Google Sheets database connection.

## Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Google Sheets configuration:
   ```env
   GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here
   GOOGLE_SHEETS_GID=0
   ```

## Getting Your Google Sheets Configuration

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit?gid={GID}`
3. Extract:
   - `SPREADSHEET_ID`: The long string between `/d/` and `/edit`
   - `GID`: The number after `gid=` (usually `0` for the first sheet)

### Example:
- URL: `https://docs.google.com/spreadsheets/d/1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw/edit?gid=0`
- `GOOGLE_SHEETS_SPREADSHEET_ID=1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw`
- `GOOGLE_SHEETS_GID=0`

## Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`: Your spreadsheet ID
   - `GOOGLE_SHEETS_GID`: Your sheet GID (usually `0`)

4. Make sure to add them for all environments:
   - Production
   - Preview
   - Development

5. After adding the variables, redeploy your application

## Important Notes

- `.env.local` is already in `.gitignore` and won't be committed
- `.env.example` is committed as a template for other developers
- Never commit `.env.local` or any file containing actual credentials
- The code has fallback values, but it's recommended to use environment variables for better security and flexibility
