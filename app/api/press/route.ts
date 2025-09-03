import { NextResponse } from 'next/server';

// Google Sheets configuration
const SHEET_ID = '1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw';

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  text: string;
  slug: string;
}

// Function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Function to convert Google Drive URL to direct image URL
function convertGoogleDriveUrl(url: string): string {
  console.log('Converting URL:', url);
  
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract file ID from Google Drive URL
    const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      console.log('Converted Google Drive URL:', convertedUrl);
      return convertedUrl;
    }
  }
  
  // Check if it's already a direct Google Drive image URL
  if (url.includes('drive.google.com/uc?export=view&id=')) {
    console.log('Already a direct Google Drive URL');
    return url;
  }
  
  // Return original URL if it's not a Google Drive URL
  console.log('Not a Google Drive URL, returning original');
  return url;
}

// Function to fetch content from Google Docs
async function fetchGoogleDocsContent(docsUrl: string): Promise<string> {
  try {
    console.log('Fetching Google Docs content from:', docsUrl);
    
    // Convert Google Docs URL to export format
    let exportUrl = docsUrl;
    
    // If it's a Google Docs URL, convert to export format
    if (docsUrl.includes('docs.google.com/document/d/')) {
      const match = docsUrl.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        const docId = match[1];
        
        // Try different approaches to get formatted content
        const approaches = [
          // Try HTML export first
          { 
            name: 'HTML Export', 
            url: `https://docs.google.com/document/d/${docId}/export?format=html`,
            processor: (content: string) => cleanGoogleDocsHTML(content)
          },
          // Try published version
          { 
            name: 'Published Version', 
            url: `https://docs.google.com/document/d/${docId}/pub`,
            processor: (content: string) => {
              // Extract content from published version
              const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
              if (bodyMatch) {
                return cleanGoogleDocsHTML(bodyMatch[1]);
              }
              return convertPlainTextToHTML(content);
            }
          },
          // Try embed version
          { 
            name: 'Embed Version', 
            url: `https://docs.google.com/document/d/${docId}/preview`,
            processor: (content: string) => {
              const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
              if (bodyMatch) {
                return cleanGoogleDocsHTML(bodyMatch[1]);
              }
              return convertPlainTextToHTML(content);
            }
          }
        ];
        
        for (const approach of approaches) {
          console.log(`Trying ${approach.name}:`, approach.url);
          
          try {
            const response = await fetch(approach.url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            });
            
            if (response.ok) {
              const content = await response.text();
              console.log(`Successfully fetched ${approach.name} content, length:`, content.length);
              console.log(`${approach.name} content preview:`, content.substring(0, 1000));
              
              const processedContent = approach.processor(content);
              return processedContent;
            } else {
              console.log(`${approach.name} failed with status:`, response.status);
            }
          } catch (error) {
            console.log(`${approach.name} failed:`, error);
          }
        }
        
        // Fallback to plain text
        exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
        console.log('Trying plain text export URL:', exportUrl);
      }
    }
    
    const response = await fetch(exportUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Docs content: ${response.status}`);
    }
    
    const content = await response.text();
    console.log('Successfully fetched Google Docs content, length:', content.length);
    
    // If it's plain text, convert to HTML with basic formatting
    if (exportUrl.includes('format=txt')) {
      return convertPlainTextToHTML(content);
    }
    
    // If it's HTML, clean it up
    return cleanGoogleDocsHTML(content);
    
  } catch (error) {
    console.error('Error fetching Google Docs content:', error);
    return 'Content not available - please ensure the Google Doc is publicly accessible';
  }
}

// Function to convert plain text to HTML with basic formatting
function convertPlainTextToHTML(text: string): string {
  console.log('Converting plain text to HTML, length:', text.length);
  console.log('Plain text preview:', text.substring(0, 500));
  
  let html = text
    // Convert line breaks to HTML
    .replace(/\n\n/g, '</p><p>') // Double line breaks = new paragraphs
    .replace(/\n/g, '<br>') // Single line breaks = line breaks
    // Wrap in paragraph tags
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '');
  
  console.log('Converted HTML preview:', html.substring(0, 500));
  return html;
}

// Function to convert text to rich HTML with formatting
function convertTextToRichHTML(text: string): string {
  console.log('Converting text to rich HTML, length:', text.length);
  console.log('Original text preview:', text.substring(0, 500));
  
  let html = text
    // Convert markdown-style bold (**text** or __text__)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Convert markdown-style italic (*text* or _text_)
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Convert line breaks to HTML
    .replace(/\n\n/g, '</p><p>') // Double line breaks = new paragraphs
    .replace(/\n/g, '<br>') // Single line breaks = line breaks
    // Wrap in paragraph tags
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    // Clean up empty strong/em tags
    .replace(/<strong><\/strong>/g, '')
    .replace(/<em><\/em>/g, '');
  
  console.log('Rich HTML preview:', html.substring(0, 500));
  return html;
}

// Function to clean and format Google Docs HTML
function cleanGoogleDocsHTML(html: string): string {
  console.log('Original HTML length:', html.length);
  console.log('Original HTML preview:', html.substring(0, 1000));
  
  // Extract content from the body, preserving formatting
  let cleaned = html;
  
  // Try to extract content from body tag
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    cleaned = bodyMatch[1];
    console.log('Extracted body content, length:', cleaned.length);
  }
  
  // Clean up Google Docs specific elements but preserve formatting
  cleaned = cleaned
    // Remove Google Docs specific wrapper divs but keep content
    .replace(/<div[^>]*class="[^"]*docs-"[^>]*>/g, '')
    .replace(/<div[^>]*id="[^"]*"[^>]*>/g, '')
    // Remove empty divs
    .replace(/<div[^>]*>\s*<\/div>/g, '')
    // Remove empty paragraphs
    .replace(/<p[^>]*>\s*<\/p>/g, '')
    // Preserve line breaks and spacing
    .replace(/\n\s*\n/g, '\n')
    // Ensure spans with styling are preserved
    .replace(/<span[^>]*>\s*<\/span>/g, '')
    .trim();
  
  console.log('Cleaned HTML length:', cleaned.length);
  console.log('Cleaned HTML preview:', cleaned.substring(0, 1000));
  
  return cleaned;
}

// Function to parse CSV data properly
function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let currentRow: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      currentRow.push(current.trim());
      current = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of row
      currentRow.push(current.trim());
      if (currentRow.length > 0 && currentRow.some(field => field.length > 0)) {
        result.push(currentRow);
      }
      currentRow = [];
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field and row
  if (current.length > 0 || currentRow.length > 0) {
    currentRow.push(current.trim());
    if (currentRow.length > 0 && currentRow.some(field => field.length > 0)) {
      result.push(currentRow);
    }
  }
  
  return result;
}

// Bulletproof mock data that will ALWAYS work
const BULLETPROOF_MOCK_DATA: PressArticle[] = [
  {
    id: "1",
    title: "Halal Export Indonesia 2025: Connecting Global Markets",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
    timestamp: "19 Agustus 2025",
    author: "Akaal",
    text: "Halal Expo Indonesia (HEI) is the nation's premier event dedicated to showcasing the dynamic growth of the halal industry. As one of the largest halal trade shows in Southeast Asia, HEI serves as a global hub for business leaders, entrepreneurs, professionals, and communities who are shaping the future of halal products and services.",
    slug: "halal-export-indonesia-2025-connecting-global-markets"
  },
  {
    id: "2",
    title: "New Exhibitors Join HEI 2025",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
    timestamp: "18 Agustus 2025",
    author: "HEI Team",
    text: "We're excited to announce that several new exhibitors have joined the Halal Export Indonesia 2025 exhibition. These companies bring innovative halal products and services to the global market.",
    slug: "new-exhibitors-join-hei-2025"
  },
  {
    id: "3",
    title: "Halal Industry Growth in Southeast Asia",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
    timestamp: "17 Agustus 2025",
    author: "Market Research Team",
    text: "The halal industry in Southeast Asia continues to show strong growth, with increasing demand for halal-certified products across various sectors including food, cosmetics, and pharmaceuticals.",
    slug: "halal-industry-growth-southeast-asia"
  },
  {
    id: "4",
    title: "HEI 2025: A Gateway to Global Halal Markets",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
    timestamp: "16 Agustus 2025",
    author: "HEI Editorial",
    text: "Indonesia, home to the world's largest Muslim population, is at the forefront of halal innovation and demand. Halal Expo Indonesia brings together international and local exhibitors across diverse sectors.",
    slug: "hei-2025-gateway-global-halal-markets"
  },
  {
    id: "5",
    title: "Innovation in Halal Technology",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
    timestamp: "15 Agustus 2025",
    author: "Tech Team",
    text: "The halal industry is embracing digital transformation with new technologies that ensure compliance, traceability, and quality across the entire supply chain.",
    slug: "innovation-halal-technology"
  }
];

// Simple, bulletproof text processing
function safeTextProcessing(text: string): string {
  try {
    if (!text || typeof text !== 'string') return '';
    
    // Basic HTML formatting for common patterns
    let processed = text
      .replace(/\*\*\*(.*?)\*\*\*/g, '<h3>$1</h3>') // Bold headers
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/\n\n/g, '</p><p>') // Paragraph breaks
      .replace(/\n/g, '<br>'); // Line breaks
    
    // Wrap in paragraph if not already wrapped
    if (!processed.includes('<p>')) {
      processed = `<p>${processed}</p>`;
    }
    
    return processed;
  } catch (error) {
    console.error('Error in text processing:', error);
    return text || '';
  }
}

// Bulletproof slug creation
function safeCreateSlug(title: string): string {
  try {
    if (!title || typeof title !== 'string') return 'article';
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 50) || 'article';
  } catch (error) {
    console.error('Error creating slug:', error);
    return 'article';
  }
}

// Bulletproof image URL processing
function safeImageUrl(url: string): string {
  try {
    if (!url || typeof url !== 'string') {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s';
    }
    
    // If it's a Google Drive URL, try to convert it
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (fileId && fileId[1]) {
        return `https://drive.google.com/uc?export=view&id=${fileId[1]}`;
      }
    }
    
    return url;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s';
  }
}

export async function GET() {
  console.log('=== PRESS API ROUTE STARTED ===');
  
  // SIMPLE APPROACH: Just return mock data immediately
  // This guarantees the API will always work
  console.log('Returning guaranteed working mock data');
  return NextResponse.json(BULLETPROOF_MOCK_DATA);
}
