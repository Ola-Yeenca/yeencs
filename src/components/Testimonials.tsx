import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTestimonials, TestimonialType } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        setTestimonials(response.data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching testimonials:', err);
        setError(err.message || 'Failed to load testimonials');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!testimonials?.length) return <div className="text-center">No testimonials available.</div>;

  return (
    <div id="testimonials" className="w-full min-h-screen bg-gradient-to-b from-japanese-kinari/5 to-japanese-shironezu/10 dark:from-dark-coffee/5 dark:to-dark-oxford/10 py-20">
      <div className="max-w-[1000px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-japanese-asagi dark:text-japanese-sakura mb-4">
            What People Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Feedback from clients and collaborators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="relative">
                  <FaQuoteLeft className="text-3xl text-japanese-asagi dark:text-japanese-sakura opacity-20 absolute -top-2 -left-2" />
                  <p className="text-gray-700 dark:text-gray-300 text-lg relative z-10 mb-6">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center mt-6">
                  {testimonial.image && (
                    <div className="relative w-12 h-12 mr-4">
                      <motion.img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover border-2 border-japanese-asagi dark:border-japanese-sakura"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="absolute inset-0 rounded-full bg-japanese-asagi dark:bg-japanese-sakura opacity-10" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
