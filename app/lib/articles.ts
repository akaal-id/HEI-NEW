/**
 * Article Database Integration
 * 
 * This file contains helper functions and types for fetching articles from Google Sheets.
 * 
 * Google Sheets URL: https://docs.google.com/spreadsheets/d/1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw/edit?gid=0#gid=0
 * 
 * Columns: Id, Title, Image_URL, Timestamp, Author, Text, Category
 */

export interface Article {
  id: string;
  slug: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GoogleSheetRow {
  Id: string;
  Title: string;
  Image_URL: string;
  Timestamp: string;
  Author: string;
  Text: string;
  Category: string;
}

// Helper function to generate slug from title
// Limits length to prevent filesystem errors
function generateSlug(title: string, id: string): string {
  const maxLength = 100; // Limit slug length to prevent filesystem errors
  
  // Ensure title and id are valid strings
  const safeTitle = (title || '').trim();
  const safeId = (id || '').trim() || 'article';
  
  if (!safeTitle || safeTitle.length === 0) {
    // If no title, use ID-based slug
    return `article-${safeId}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  
  let slug = safeTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // If slug is too long, truncate it
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }
  
  // If slug is empty or too short, use ID
  if (!slug || slug.length < 3) {
    slug = `article-${safeId}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  
  // Final validation - ensure slug is never empty or undefined
  if (!slug || slug.trim().length === 0) {
    slug = `article-${safeId}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  
  return slug;
}

// Helper function to truncate text for description
function truncateText(text: string, maxLength: number = 200): string {
  if (!text) return '';
  const cleaned = text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).trim() + '...';
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If date parsing fails, return the original string
      return dateString;
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}

// Helper function to validate and sanitize image URL
function validateImageUrl(url: string): string {
  if (!url || !url.trim()) {
    return '/images/overview.jpg';
  }
  
  const trimmedUrl = url.trim();
  
  // If it's already a relative path, return as is
  if (trimmedUrl.startsWith('/')) {
    return trimmedUrl;
  }
  
  // Check if it looks like a URL (starts with http:// or https://)
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    // Doesn't look like a URL, return fallback
    return '/images/overview.jpg';
  }
  
  // Try to validate as a URL
  try {
    new URL(trimmedUrl);
    return trimmedUrl;
  } catch {
    // If URL is invalid, return fallback
    return '/images/overview.jpg';
  }
}

// Helper function to convert basic markdown to HTML
function convertMarkdownToHtml(text: string): string {
  if (!text) return '';
  
  let html = text;
  
  // Convert **text** to <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *text* to <em>text</em> (only if not part of **)
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');
  
  // Split by double newlines or single newline followed by content to create paragraphs
  const paragraphs = html.split(/\n\n+/).filter(p => p.trim());
  
  // Wrap each paragraph in <p> tags, but preserve existing HTML tags
  return paragraphs.map(p => {
    const trimmed = p.trim();
    // If it already starts with an HTML tag, return as is
    if (trimmed.match(/^<[a-z]/i)) {
      return trimmed;
    }
    return `<p>${trimmed}</p>`;
  }).join('\n\n');
}

// ============================================================================
// SUPABASE INTEGRATION EXAMPLE
// ============================================================================
/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}

export async function getArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug');

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  return data.map(article => article.slug);
}
*/

// ============================================================================
// GOOGLE SHEETS INTEGRATION EXAMPLE
// ============================================================================
/*
// Install: npm install googleapis
import { google } from 'googleapis';

const sheets = google.sheets('v4');

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return auth;
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const auth = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Articles!A2:H'; // Adjust range based on your sheet structure

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows) return [];

    // Map rows to Article objects
    // Adjust column mapping based on your sheet structure:
    // [id, slug, category, image, author, date, title, description, content]
    return rows.map((row) => ({
      id: row[0] || '',
      slug: row[1] || '',
      category: row[2] || '',
      image: row[3] || '',
      author: row[4] || '',
      date: row[5] || '',
      title: row[6] || '',
      description: row[7] || '',
      content: row[8] || '',
    }));
  } catch (error) {
    console.error('Error fetching articles from Google Sheets:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map(article => article.slug);
}
*/

// ============================================================================
// GOOGLE SHEETS INTEGRATION
// ============================================================================

// Get configuration from environment variables with fallback to defaults
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw';
const GID = process.env.GOOGLE_SHEETS_GID || '0';

type ArticleFetchOptions = {
  /** ISR revalidate interval in seconds. Omit for always-fresh (dynamic) fetches. */
  revalidate?: number;
};

/**
 * Fetches articles from Google Sheets
 * Uses Google Sheets CSV export (more reliable for public sheets)
 */
async function fetchFromGoogleSheets(
  options: ArticleFetchOptions = {}
): Promise<GoogleSheetRow[]> {
  try {
    // Use CSV export which is more reliable
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${GID}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const fetchOptions: RequestInit =
      options.revalidate != null && options.revalidate > 0
        ? { next: { revalidate: options.revalidate } }
        : { cache: 'no-store' };

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const csvText = await response.text();
    
    // Parse CSV properly handling quoted fields with newlines
    const csvRows = parseCSV(csvText);
    
    if (csvRows.length < 2) {
      return [];
    }

    // Parse CSV header
    const headers = csvRows[0];
    const headerMap: { [key: string]: number } = {};
    headers.forEach((header, index) => {
      headerMap[header.trim()] = index;
    });

    // Parse data rows
    const resultRows: GoogleSheetRow[] = [];
    const seenIds = new Set<string>(); // Track seen IDs to prevent duplicates
    let rowIndex = 1; // Start from 1 (after header)
    
    for (let i = 1; i < csvRows.length; i++) {
      const values = csvRows[i];
      
      // Skip if no values
      if (values.length === 0) {
        continue;
      }
      
      // Get ID and Title - handle case-insensitive header matching
      const idIndex = headerMap['Id'] ?? headerMap['id'] ?? headerMap['ID'] ?? -1;
      const titleIndex = headerMap['Title'] ?? headerMap['title'] ?? -1;
      
      if (idIndex === -1 || titleIndex === -1) {
        console.warn('Could not find Id or Title column in CSV');
        continue;
      }
      
      let idValue = (values[idIndex] || '').trim();
      const titleValue = (values[titleIndex] || '').trim();
      
      // Skip rows without title
      if (!titleValue) {
        continue;
      }
      
      // If ID is empty, generate one from row index
      if (!idValue) {
        idValue = `row-${rowIndex}`;
        rowIndex++;
      }

      // Skip if we've already seen this ID (prevent duplicates)
      if (seenIds.has(idValue)) {
        // Generate a unique ID for duplicates
        let uniqueId = idValue;
        let counter = 1;
        while (seenIds.has(uniqueId)) {
          uniqueId = `${idValue}-${counter}`;
          counter++;
        }
        idValue = uniqueId;
      }
      
      seenIds.add(idValue);

      const row: any = {};
      Object.keys(headerMap).forEach(header => {
        const index = headerMap[header];
        if (index >= 0 && index < values.length) {
          row[header] = (values[index] || '').trim();
        } else {
          row[header] = '';
        }
      });
      
      // Also handle case-insensitive column matching for common variations
      const textIndex = headerMap['Text'] ?? headerMap['text'] ?? headerMap['TEXT'] ?? -1;
      const imageUrlIndex = headerMap['Image_URL'] ?? headerMap['Image URL'] ?? headerMap['image_url'] ?? -1;
      const categoryIndex = headerMap['Category'] ?? headerMap['category'] ?? -1;
      const authorIndex = headerMap['Author'] ?? headerMap['author'] ?? -1;
      const timestampIndex = headerMap['Timestamp'] ?? headerMap['timestamp'] ?? -1;
      
      // Ensure all required fields are set with case-insensitive matching
      // Text field is critical - preserve it even if it contains newlines
      if (textIndex >= 0 && textIndex < values.length) {
        // Don't trim Text field as it may contain intentional whitespace/newlines
        row['Text'] = values[textIndex] || '';
      } else {
        row['Text'] = '';
      }
      
      if (imageUrlIndex >= 0 && imageUrlIndex < values.length) {
        row['Image_URL'] = (values[imageUrlIndex] || '').trim();
      }
      if (categoryIndex >= 0 && categoryIndex < values.length) {
        row['Category'] = (values[categoryIndex] || '').trim();
      }
      if (authorIndex >= 0 && authorIndex < values.length) {
        row['Author'] = (values[authorIndex] || '').trim();
      }
      if (timestampIndex >= 0 && timestampIndex < values.length) {
        row['Timestamp'] = (values[timestampIndex] || '').trim();
      }
      
      // Ensure ID is set correctly
      row['Id'] = idValue;
      
      // Validate Image_URL - if it doesn't look like a URL, set to empty
      const imageUrlValue = row['Image_URL'] || '';
      if (imageUrlValue && !imageUrlValue.match(/^(https?:\/\/|\/)/i)) {
        // If it doesn't start with http://, https://, or /, it's probably not a URL
        row['Image_URL'] = '';
      }
      
      // Ensure Text field is not empty (critical for content)
      if (!row['Text'] || row['Text'].trim().length === 0) {
        console.warn(`Article ${idValue} (${titleValue}) has no Text content`);
      }
      
      resultRows.push(row as GoogleSheetRow);
      rowIndex++;
    }

    return resultRows;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Google Sheets request timed out while fetching articles.');
      return [];
    }
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

/**
 * Parse CSV text handling quoted fields with newlines
 */
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of row (but only if not in quotes)
      if (char === '\n' || (char === '\r' && nextChar !== '\n')) {
        currentRow.push(currentField);
        if (currentRow.some(field => field.trim().length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
        // Skip \r\n combination
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      }
    } else {
      currentField += char;
    }
  }
  
  // Add last field and row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(field => field.trim().length > 0)) {
      rows.push(currentRow);
    }
  }
  
  return rows;
}

/**
 * Parse a CSV line handling quoted fields (legacy function for single-line parsing)
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add last field
  result.push(current);
  return result;
}

/**
 * Maps Google Sheets data to Article interface
 */
function mapToArticle(row: GoogleSheetRow): Article {
  const slug = generateSlug(row.Title, row.Id);
  const textContent = row.Text || '';
  const description = truncateText(textContent);
  const formattedDate = formatDate(row.Timestamp);
  const contentHtml = convertMarkdownToHtml(textContent);
  const imageUrl = validateImageUrl(row.Image_URL || '');

  // Ensure content is not empty
  if (!contentHtml || contentHtml.trim().length === 0) {
    console.warn(`Article ${row.Id} (${row.Title}) has empty content. Using description as fallback.`);
  }

  // Ensure slug is always valid
  const validSlug = slug && slug !== 'undefined' && slug.trim().length > 0 
    ? slug 
    : `article-${row.Id || 'unknown'}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    id: row.Id || `article-${Date.now()}`,
    slug: validSlug,
    category: row.Category || 'Uncategorized',
    image: imageUrl,
    author: row.Author || 'AKAAL',
    date: formattedDate || row.Timestamp,
    title: row.Title || 'Untitled Article',
    description,
    content: contentHtml || description || '<p>Content not available.</p>',
    createdAt: row.Timestamp,
    updatedAt: row.Timestamp,
  };
}

export async function getAllArticles(
  options: ArticleFetchOptions = {}
): Promise<Article[]> {
  try {
    const rows = await fetchFromGoogleSheets(options);
    const articles = rows.map(mapToArticle);
    
    // Remove duplicates based on ID, keeping the first occurrence
    const uniqueArticles = articles.filter((article, index, self) => 
      index === self.findIndex(a => a.id === article.id && a.id !== '')
    );
    
    return uniqueArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await getAllArticles();
    
    if (articles.length === 0) {
      console.warn('No articles found in database');
      return null;
    }
    
    // Normalize the search slug - handle URL encoding/decoding
    let normalizedSearchSlug: string;
    try {
      normalizedSearchSlug = decodeURIComponent(slug);
    } catch (e) {
      // If decoding fails, use the slug as-is
      normalizedSearchSlug = slug;
    }
    
    normalizedSearchSlug = normalizedSearchSlug.toLowerCase().trim();
    normalizedSearchSlug = normalizedSearchSlug.replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
    
    console.log(`[getArticleBySlug] Searching for slug: "${normalizedSearchSlug}" (from "${slug}")`);
    console.log(`[getArticleBySlug] Total articles available: ${articles.length}`);
    
    // Log first few article slugs for debugging
    if (articles.length > 0) {
      console.log(`[getArticleBySlug] Sample article slugs:`, articles.slice(0, 3).map(a => a.slug));
    }
    
    // Try exact match first (case-insensitive)
    let foundArticle: Article | undefined = articles.find(articleItem => {
      const articleSlug = articleItem.slug.toLowerCase().trim();
      // Also try URL-encoded version
      const articleSlugEncoded = encodeURIComponent(articleItem.slug).toLowerCase();
      const searchSlugEncoded = encodeURIComponent(slug).toLowerCase();
      
      return articleSlug === normalizedSearchSlug || 
             articleSlugEncoded === searchSlugEncoded ||
             articleItem.slug.toLowerCase() === slug.toLowerCase();
    });
    
    if (foundArticle) {
      console.log(`[getArticleBySlug] Found article with exact match: ${foundArticle.title} (slug: ${foundArticle.slug})`);
      return foundArticle;
    }
    
    // If not found, try matching the beginning (for truncated slugs)
    if (!foundArticle) {
      foundArticle = articles.find(articleItem => {
        const articleSlug = articleItem.slug.toLowerCase().trim();
        // Check if search slug starts with article slug or vice versa (at least 20 chars)
        const minLength = Math.min(20, normalizedSearchSlug.length, articleSlug.length);
        if (minLength < 10) return false;
        return articleSlug.substring(0, minLength) === normalizedSearchSlug.substring(0, minLength) ||
               normalizedSearchSlug.substring(0, minLength) === articleSlug.substring(0, minLength);
      });
    }
    
    if (foundArticle) {
      console.log(`Found article with prefix match: ${foundArticle.title} (slug: ${foundArticle.slug})`);
      return foundArticle;
    }
    
    // If still not found, try fuzzy match by word similarity
    if (!foundArticle) {
      const searchWords = normalizedSearchSlug.split('-').filter(w => w.length > 2);
      let bestMatch: Article | null = null;
      let bestScore = 0;
      
      for (const articleItem of articles) {
        const articleWords = articleItem.slug.toLowerCase().split('-').filter(w => w.length > 2);
        // Count matching words
        const matchingWords = searchWords.filter(word => 
          articleWords.some(aw => aw === word || aw.includes(word) || word.includes(aw))
        );
        const score = matchingWords.length / Math.max(searchWords.length, articleWords.length);
        
        if (score > bestScore && score >= 0.5) {
          bestScore = score;
          bestMatch = articleItem;
        }
      }
      
      if (bestMatch) {
        console.log(`Found article with fuzzy match: ${bestMatch.title} (slug: ${bestMatch.slug})`);
        return bestMatch;
      }
    }
    
    // Log available slugs for debugging
    console.warn(`[getArticleBySlug] Article not found for slug: "${normalizedSearchSlug}"`);
    console.log(`[getArticleBySlug] Available slugs (first 10):`, articles.slice(0, 10).map(a => ({ 
      slug: a.slug, 
      title: a.title.substring(0, 50),
      slugLength: a.slug.length 
    })));
    
    // Try one more time with the original slug (no normalization)
    const directMatch = articles.find(a => 
      a.slug === slug || 
      a.slug.toLowerCase() === slug.toLowerCase() ||
      encodeURIComponent(a.slug) === encodeURIComponent(slug)
    );
    
    if (directMatch) {
      console.log(`[getArticleBySlug] Found article with direct match: ${directMatch.title}`);
      return directMatch;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  try {
    const articles = await getAllArticles();
    return articles.map(article => article.slug).filter(Boolean);
  } catch (error) {
    console.error('Error fetching article slugs:', error);
    return [];
  }
}
