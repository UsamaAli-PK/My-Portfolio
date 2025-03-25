import { useState, useEffect, useCallback } from 'react';
import { supabase, handleSupabaseError, CACHE_CONFIG } from '../lib/supabase';

interface QueryOptions {
    cacheKey: keyof typeof CACHE_CONFIG;
    enabled?: boolean;
}

export function useSupabaseQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    options: QueryOptions
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = useCallback(async (force = false) => {
        if (!options.enabled && !force) return;

        const cacheKey = `supabase-${options.cacheKey}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cacheConfig = CACHE_CONFIG[options.cacheKey];

        if (cachedData && !force) {
            const { data, timestamp } = JSON.parse(cachedData);
            const isStale = Date.now() - timestamp > cacheConfig.ttl;

            if (!isStale) {
                setData(data);
                setIsLoading(false);
                return;
            }

            if (cacheConfig.staleWhileRevalidate) {
                setData(data);
                setIsLoading(false);
            }
        }

        setIsFetching(true);
        try {
            const { data, error } = await queryFn();
            if (error) throw handleSupabaseError(error);

            setData(data);
            localStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
        } finally {
            setIsLoading(false);
            setIsFetching(false);
        }
    }, [queryFn, options.cacheKey, options.enabled]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData(true);
    }, [fetchData]);

    return {
        data,
        error,
        isLoading,
        isFetching,
        refetch
    };
} 