import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const formik = useFormik<ContactForm>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        console.log('Submitting form with values:', values);
        
        const response = await axios.post(
          'http://127.0.0.1:8000/api/api/contact/',
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
        
        console.log('Server response:', response);
        
        setSubmitStatus({
          type: 'success',
          message: response.data.message || 'Message sent successfully!',
        });
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
        let errorMessage = 'Failed to send message. Please try again.';
        
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            config: error.config,
            response: error.response,
            message: error.message
          });
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        setSubmitStatus({
          type: 'error',
          message: errorMessage,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div id='contact' className='w-full min-h-screen relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-japanese-kinari/20 to-dark-coffee/20 dark:from-dark-coffee/20 dark:to-japanese-kinari/20" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.25
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              scale: [null, Math.random() * 0.5 + 0.5],
              opacity: [null, Math.random() * 0.5 + 0.25]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className='max-w-[800px] mx-auto p-8 relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-accent-light to-accent-dark bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-dark-obsidian dark:text-japanese-soshoku">
            Let's create something amazing together
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={formik.handleSubmit}
          className="space-y-6 backdrop-blur-lg bg-white/10 dark:bg-black/10 p-8 rounded-2xl shadow-xl"
        >
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                  : 'bg-red-500/20 text-red-700 dark:text-red-300'
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-accent-light dark:text-accent-dark" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border-2 
                  ${formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-transparent'
                  } 
                  focus:border-accent-light dark:focus:border-accent-dark
                  outline-none transition-all duration-300`}
              />
              {formik.touched.name && formik.errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {formik.errors.name}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-accent-light dark:text-accent-dark" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border-2 
                  ${formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-transparent'
                  } 
                  focus:border-accent-light dark:focus:border-accent-dark
                  outline-none transition-all duration-300`}
              />
              {formik.touched.email && formik.errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {formik.errors.email}
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMessageSquare className="text-accent-light dark:text-accent-dark" />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border-2 
                ${formik.touched.subject && formik.errors.subject
                  ? 'border-red-500'
                  : 'border-transparent'
                } 
                focus:border-accent-light dark:focus:border-accent-dark
                outline-none transition-all duration-300`}
            />
            {formik.touched.subject && formik.errors.subject && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {formik.errors.subject}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 rounded-xl bg-white/5 border-2 
                ${formik.touched.message && formik.errors.message
                  ? 'border-red-500'
                  : 'border-transparent'
                } 
                focus:border-accent-light dark:focus:border-accent-dark
                outline-none transition-all duration-300 resize-none`}
            />
            {formik.touched.message && formik.errors.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {formik.errors.message}
              </motion.div>
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-accent-light to-accent-dark 
                     text-white rounded-xl font-bold text-lg
                     shadow-lg hover:shadow-xl transform transition-all duration-300
                     flex items-center justify-center gap-2"
          >
            <span>Send Message</span>
            <FiSend className="w-5 h-5" />
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
