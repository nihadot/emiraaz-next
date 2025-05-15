export function parsePrice(input: string | number | null): number {
    if (!input) return 0;

    input = input.toString().trim().toLowerCase();

    // Remove commas and % symbols
    input = input.replace(/,/g, '').replace(/%/g, '');

    let number = parseFloat(input);

    if (isNaN(number)) {
        // Handle words
        const match = input.match(/([\d.]+)\s*(million|m|lakh|lac|lacs|crore|cr)/);
        if (!match) return 0;

        const value = parseFloat(match[1]);
        const unit = match[2];

        switch (unit) {
            case 'm':
            case 'million':
                return value * 1_000_000;
            case 'lakh':
            case 'lac':
            case 'lacs':
                return value * 100_000;
            case 'crore':
            case 'cr':
                return value * 10_000_000;
            default:
                return 0;
        }
    }

    return number;
}
