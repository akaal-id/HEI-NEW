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
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // If slug is too long, truncate it
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }
  
  // If slug is empty or too short, use ID
  if (!slug || slug.length < 3) {
    slug = `article-${id}`;
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

const SPREADSHEET_ID = '1OxE-sFGQ4hqfpxsQGo3GdanjahIEPE-XxHOy-mDUmvw';
const GID = '0';

/**
 * Fetches articles from Google Sheets
 * Uses Google Sheets CSV export (more reliable for public sheets)
 */
async function fetchFromGoogleSheets(): Promise<GoogleSheetRow[]> {
  try {
    // Use CSV export which is more reliable
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${GID}`;
    const response = await fetch(url, { 
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const csvText = await response.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return [];
    }

    // Parse CSV header
    const headers = parseCSVLine(lines[0]);
    const headerMap: { [key: string]: number } = {};
    headers.forEach((header, index) => {
      headerMap[header.trim()] = index;
    });

    // Parse data rows
    const rows: GoogleSheetRow[] = [];
    const seenIds = new Set<string>(); // Track seen IDs to prevent duplicates
    let rowIndex = 1; // Start from 1 (after header)
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      
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
      
      // Ensure ID is set correctly
      row['Id'] = idValue;
      
      // Validate Image_URL - if it doesn't look like a URL, set to empty
      const imageUrlValue = row['Image_URL'] || row['Image URL'] || row['image_url'] || '';
      if (imageUrlValue && !imageUrlValue.match(/^(https?:\/\/|\/)/i)) {
        // If it doesn't start with http://, https://, or /, it's probably not a URL
        row['Image_URL'] = '';
      }
      
      rows.push(row as GoogleSheetRow);
      rowIndex++;
    }

    return rows;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

/**
 * Parse a CSV line handling quoted fields
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
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add last field
  result.push(current.trim());
  return result;
}

/**
 * Maps Google Sheets data to Article interface
 */
function mapToArticle(row: GoogleSheetRow): Article {
  const slug = generateSlug(row.Title, row.Id);
  const description = truncateText(row.Text);
  const formattedDate = formatDate(row.Timestamp);
  const contentHtml = convertMarkdownToHtml(row.Text);
  const imageUrl = validateImageUrl(row.Image_URL || '');

  return {
    id: row.Id,
    slug,
    category: row.Category || 'Uncategorized',
    image: imageUrl,
    author: row.Author || 'AKAAL',
    date: formattedDate || row.Timestamp,
    title: row.Title,
    description,
    content: contentHtml,
    createdAt: row.Timestamp,
    updatedAt: row.Timestamp,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const rows = await fetchFromGoogleSheets();
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
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map(article => article.slug);
}
