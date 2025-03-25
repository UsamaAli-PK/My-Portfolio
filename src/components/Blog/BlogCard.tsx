import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  link: string;
}

export function BlogCard({ title, excerpt, date, imageUrl, link }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={link}>
        <div className="relative h-48">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <div className="flex items-center text-sm text-gray-500">
            <time dateTime={date}>{date}</time>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}