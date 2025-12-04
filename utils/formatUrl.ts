export function formatUrl(url: string): string {
  const smallWords = ['for', 'in', 'the', 'and', 'of', 'on', 'at', 'a', 'an'];

  return url
    .split('/')
    .filter(Boolean)
    // .slice(1) // remove first segment (for-sale)
    .map(segment =>
      segment
        .split('-')
        .map((word, index) =>
          smallWords.includes(word.toLowerCase())
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
    )
    .join('/');
}