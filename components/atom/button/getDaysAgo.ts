export const getDaysAgo = (dateString: string) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) return "just today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };
  