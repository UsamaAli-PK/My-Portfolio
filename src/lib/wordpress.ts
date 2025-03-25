import axios from 'axios';

const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://your-domain.com/blog/wp-json/wp/v2';

export interface WordPressPost {
    id: number;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    link: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
    };
}

export async function getLatestPosts(count: number = 3): Promise<WordPressPost[]> {
    try {
        const response = await axios.get<WordPressPost[]>(`${WORDPRESS_API_URL}/posts`, {
            params: {
                per_page: count,
                _embed: true,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching WordPress posts:', error);
        return [];
    }
} 