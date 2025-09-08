// Test script to demonstrate slug generation
function safeCreateSlug(title) {
  try {
    if (!title || typeof title !== 'string') return 'article';
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() || 'article';
  } catch (error) {
    console.error('Error creating slug:', error);
    return 'article';
  }
}

// Test with the example title
const title = "Halal Value Chain, Bare Minimum For Your Business Go International";
const slug = safeCreateSlug(title);

console.log('Original Title:', title);
console.log('Generated Slug:', slug);
console.log('Slug Length:', slug.length);
console.log('Expected URL:', `/press/${slug}`);
