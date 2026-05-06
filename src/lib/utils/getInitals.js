export default function getInitials(name) {
  if (!name) return "U"; // Default to "U" for unknown users    
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    //take first letter of every word and concatenate them
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
}