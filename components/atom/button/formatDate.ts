export function formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
  
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-based
    const day = `${date.getDate()}`.padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  