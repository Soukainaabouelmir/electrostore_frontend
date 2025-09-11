export const filterCategories = (categories, searchTerm) => {
  if (!searchTerm.trim()) return categories;
  
  const term = searchTerm.toLowerCase();
  
  return categories.filter(category => 
    category.nom.toLowerCase().includes(term) ||
    category.parent?.toLowerCase().includes(term) ||
    category.subCategories?.some(sub => sub.toLowerCase().includes(term))
  );
};