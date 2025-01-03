import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { API_URL } from './config';

// Type definitions
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ErrorResponse {
  message: string;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor to handle nested data structure
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    // Return the response as is - the data structure is already correct
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Error handling
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('Axios error:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message
    });
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }
    throw new Error(axiosError.message);
  }
  
  if (error instanceof Error) {
    throw error;
  }
  
  throw new Error('An unexpected error occurred');
};

// API endpoints
export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  order: number;
}

export const getTestimonials = async (): Promise<ApiResponse<TestimonialType[]>> => {
  try {
    const response = await api.get<ApiResponse<TestimonialType[]>>('/testimonials/');
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return handleError(error);
  }
};

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  created_at: string;
  featured_image_url?: string;
  featured_image_thumbnail_url?: string;
  featured_image_large_url?: string;
  featured_image_og_url?: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    canonical_url?: string;
    og_image?: string;
  };
}

export const getBlogPosts = async (): Promise<ApiResponse<BlogPost[]>> => {
  try {
    const response = await api.get<ApiResponse<BlogPost[]>>('/blog/');
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return handleError(error);
  }
};

export const getBlogPost = async (slug: string): Promise<ApiResponse<BlogPost>> => {
  try {
    const response = await api.get<ApiResponse<BlogPost>>(`/blog/${slug}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return handleError(error);
  }
};

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
}

export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
  try {
    const response = await api.get<ApiResponse<Project[]>>('/projects/');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return handleError(error);
  }
};

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
  description: string;
}

export const getSkills = async (): Promise<ApiResponse<Skill[]>> => {
  try {
    const response = await api.get<ApiResponse<Skill[]>>('/skills/');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return handleError(error);
  }
};

export const getSkillCategories = async (): Promise<ApiResponse<string[]>> => {
  try {
    const response = await api.get<ApiResponse<string[]>>('/skills/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return handleError(error);
  }
};

export const getFeaturedProjects = async (): Promise<ApiResponse<Project[]>> => {
  try {
    const response = await api.get<ApiResponse<Project[]>>('/projects/featured/');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return handleError(error);
  }
};

export interface About {
  id: number;
  title: string;
  content: string;
  cv_file?: string;
  profile_image: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  location: string;
}

export const getAbout = async (): Promise<ApiResponse<About>> => {
  try {
    const response = await api.get<ApiResponse<About>>('/about/');
    return response.data;
  } catch (error) {
    console.error('Error fetching about:', error);
    return handleError(error);
  }
};

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContact = async (formData: ContactForm): Promise<void> => {
  try {
    const response = await api.post('/contact/', formData);
    console.log('Contact submission response:', response);
  } catch (error) {
    console.error('Contact submission error:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await api.get('/testimonials/');
    console.log('API is healthy:', response.data);
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
