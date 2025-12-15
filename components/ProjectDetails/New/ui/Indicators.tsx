export default function Indicators({
    total,
    active,
    onChange,
    maxDots,
}: {
    total: number;
    active: number;
    onChange: (i: number) => void;
    maxDots: number;
}) {

    function getIndicatorWindow(
        total: number,
        active: number,
        maxDots: number
    ) {
        if (total <= maxDots)
            return Array.from({ length: total }, (_, i) => i);

        const half = Math.floor(maxDots / 2);
        let start = active - half;
        let end = active + half;

        if (start < 0) {
            start = 0;
            end = maxDots - 1;
        }

        if (end >= total) {
            end = total - 1;
            start = total - maxDots;
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    const dots = getIndicatorWindow(total, active, maxDots);

    return (
        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20" >
            {
                dots.map((i) => (
                    <button
                        key={i}
                        onClick={() => onChange(i)}
                        className={`w-2.5 h-2.5 border border-white rounded-full ${i === active ? 'bg-white' : 'bg-transparent'
                            }`
                        }
                    />
                ))}
        </div>
    );
}



