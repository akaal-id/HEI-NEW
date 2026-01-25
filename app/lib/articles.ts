/**
 * Article Database Integration
 * 
 * This file contains helper functions and types for fetching articles from databases.
 * Replace the mock implementations with actual database queries.
 * 
 * Supported databases:
 * - Supabase (PostgreSQL)
 * - Google Sheets API
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
// MOCK DATA (Current Implementation)
// ============================================================================
// TODO: Replace with actual database calls

export async function getAllArticles(): Promise<Article[]> {
  // Mock data - replace with database fetch
  return [
    {
      id: '1',
      slug: 'lorem-ipsum-dolor-sit-amet-consectur',
      category: 'Live Report',
      image: '/images/overview.jpg',
      author: 'John Doe',
      date: 'January 8th, 2026',
      title: 'Lorem Ipsum Dolor Sit Amet Consectur Lorem Ipsum Dolor Sit Amet Consectur',
      description: "In today's fast-paced business environment, understanding market trends is crucial for success. Companies must adapt to changing consumer preferences and technological advancements to stay competitive. By leveraging data analytics and customer feedback, busines..."
    },
    {
      id: '2',
      slug: 'sed-do-eiusmod-tempor-incididunt',
      category: 'Business Education',
      image: '/images/overview.jpg',
      author: 'Jane Smith',
      date: 'February 15th, 2026',
      title: 'Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua',
      description: "As we navigate through the complexities of the digital age, the importance of cybersecurity cannot be overstated. Protecting sensitive information from breaches and cyber attacks is essential for maintaining consumer trust and business integrity. Implementing robust security measures"
    },
    {
      id: '3',
      slug: 'ut-enim-ad-minim-veniam',
      category: 'News & Article',
      image: '/images/overview.jpg',
      author: 'Alice Johnson',
      date: 'March 22nd, 2026',
      title: 'Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco Laboris',
      description: "Sustainability has become a key focus for organizations worldwide. Implementing eco-friendly practices not only benefits the environment but also enhances brand reputation and customer loyalty. By investing in renewable resources and promoting ethical sourcing, companies can..."
    }
  ];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map(article => article.slug);
}
