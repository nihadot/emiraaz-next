export const formatCustomDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  console.log(date,'date')
  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[date.getMonth()];

  return `${day} ${month} ${year}`;
};
