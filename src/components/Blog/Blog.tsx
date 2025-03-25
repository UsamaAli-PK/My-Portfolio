import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getLatestPosts, WordPressPost } from '../../lib/wordpress';

export function Blog() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getLatestPosts(3);
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest web development trends, tips, and best practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <div className="relative">
                  {post._embedded?.['wp:featuredmedia']?.[0] ? (
                    <img
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2 hover:text-primary transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p
                    className="text-gray-600 mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="flex items-center text-primary font-medium">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Visit Blog
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}