import { NextResponse } from 'next/server';

// Google Sheets configuration
const SHEET_ID = '1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw';

export async function GET() {
  console.log('=== TESTING GOOGLE SHEETS ACCESS ===');
  
  const results = {
    sheetId: SHEET_ID,
    tests: [] as any[],
    summary: ''
  };
  
  // Test different URL formats
  const csvUrls = [
    {
      name: 'Standard CSV Export',
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`
    },
    {
      name: 'CSV Export without GID',
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`
    },
    {
      name: 'GViz CSV Export',
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`
    },
    {
      name: 'GViz CSV Export without GID',
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`
    },
    {
      name: 'Public View URL',
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`
    }
  ];
  
  for (const test of csvUrls) {
    try {
      console.log(`Testing ${test.name}: ${test.url}`);
      
      const response = await fetch(test.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const result = {
        name: test.name,
        url: test.url,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        contentType: response.headers.get('content-type'),
        contentLength: response.headers.get('content-length'),
        success: false,
        error: null as string | null
      };
      
      if (response.ok) {
        const content = await response.text();
        result.success = true;
        result.contentLength = content.length.toString();
        console.log(`✅ ${test.name}: SUCCESS (${content.length} chars)`);
      } else {
        result.error = `HTTP ${response.status}: ${response.statusText}`;
        console.log(`❌ ${test.name}: FAILED - ${result.error}`);
      }
      
      results.tests.push(result);
      
    } catch (error) {
      const result = {
        name: test.name,
        url: test.url,
        status: 0,
        statusText: 'Network Error',
        ok: false,
        contentType: null,
        contentLength: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      
      results.tests.push(result);
      console.log(`❌ ${test.name}: ERROR - ${result.error}`);
    }
  }
  
  // Generate summary
  const successfulTests = results.tests.filter(t => t.success);
  if (successfulTests.length > 0) {
    results.summary = `✅ ${successfulTests.length}/${results.tests.length} tests passed. Google Sheets is accessible.`;
  } else {
    results.summary = `❌ All tests failed. Google Sheets is not accessible. Check sharing permissions.`;
  }
  
  console.log('=== TEST RESULTS ===');
  console.log(results.summary);
  
  return NextResponse.json(results, { 
    status: successfulTests.length > 0 ? 200 : 500 
  });
}
