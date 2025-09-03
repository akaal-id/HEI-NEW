import { NextRequest, NextResponse } from 'next/server';

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
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract file ID from Google Drive URL
    const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      // Convert to direct image URL
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  // Return original URL if it's not a Google Drive URL
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    console.log(`Fetching article with slug: ${slug}`);

    // Use the public CSV export URL (no API key needed)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    
    const response = await fetch(csvUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Process data and find the article with matching slug
    const articles = await Promise.all(
      rows.slice(1).map(async (row: string[], index: number) => {
        // Map columns: A=Id, B=Title, C=Image_URL, D=Author, E=Timestamp, F=Text (Google Docs URL)
        const [id, title, imageUrl, author, timestamp, textUrl] = row;
        
        // Skip empty rows
        if (!title || !imageUrl) {
          return null;
        }
        
                 // Process text content - if it's a Google Docs URL, fetch it; otherwise use as rich text
         let text = '';
         if (textUrl && textUrl.includes('docs.google.com')) {
           text = await fetchGoogleDocsContent(textUrl);
         } else {
           // Convert plain text to rich HTML with formatting
           text = convertTextToRichHTML(textUrl || '');
         }
        
        return {
          id: id || (index + 1).toString(),
          title: title || '',
          imageUrl: convertGoogleDriveUrl(imageUrl || ''),
          author: author || '',
          timestamp: timestamp || '',
          text: text,
          slug: createSlug(title || '')
        };
      })
    );
    
    // Remove null entries
    const validArticles = articles.filter((article): article is PressArticle => article !== null);
    
    const article = validArticles.find(item => item.slug === slug);
    
    if (!article) {
      console.log(`Article not found for slug: ${slug}`);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    console.log(`Found article:`, article);
    return NextResponse.json(article);
    
  } catch (error) {
    console.error('Error fetching press article:', error);
    
    // Return mock data as fallback
    const mockData: PressArticle[] = [
      {
        id: "1",
        title: "Halal Export Indonesia 2025: Connecting Global Markets",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
        timestamp: "19 Agustus 2025",
        author: "Akaal",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        slug: "halal-export-indonesia-2025-connecting-global-markets"
      }
    ];
    
    const article = mockData.find(item => item.slug === slug);
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json(article);
  }
}
