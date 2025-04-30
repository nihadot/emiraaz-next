export function shuffle<T extends any[] | Record<string, any>>(input: T): T {
    const shuffleArray = <U>(arr: U[]): U[] =>
      arr
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
  
    if (Array.isArray(input)) {
      return shuffleArray(input) as T;
    } else if (typeof input === 'object' && input !== null) {
      const entries = Object.entries(input);
      const shuffled = shuffleArray(entries);
      return Object.fromEntries(shuffled) as T;
    } else {
      throw new Error('Only arrays or objects are supported');
    }
  }
  