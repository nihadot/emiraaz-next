/**
 * Performance monitoring utilities for Next.js
 * Helps track and optimize page load times
 */

export function measurePerformance(label: string) {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();

    return {
        end: () => {
            const endTime = performance.now();
            const duration = endTime - startTime;

            if (process.env.NODE_ENV === 'development') {
                console.log(`⚡ [Performance] ${label}: ${duration.toFixed(2)}ms`);
            }

            return duration;
        }
    };
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: any) {
    if (process.env.NODE_ENV === 'development') {
        console.log('📊 Web Vital:', metric);
    }

    // Send to analytics service (Google Analytics, etc.)
    // Example: gtag('event', metric.name, { value: metric.value });
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
    if (typeof window === 'undefined') return;

    // Preload critical API endpoints
    const criticalEndpoints = [
        '/api/meta-data?referencePage=home-page',
        '/api/emirate/names',
        '/api/city/names'
    ];

    criticalEndpoints.forEach(endpoint => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'fetch';
        link.href = endpoint;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}
