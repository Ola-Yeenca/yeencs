import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API endpoints
app.get('/api/projects', (req, res) => {
  console.log('Received request for projects');
  try {
    const projects = [
      {
        id: 1,
        title: "Portfolio Website",
        description: "3D interactive portfolio showcasing my work",
        image: "/images/portfolio.jpg",
        technologies: ["React", "Three.js", "TypeScript"],
        github_url: "https://github.com/yourusername/portfolio",
        live_url: "https://portfolio.example.com",
        featured: true
      },
      {
        id: 2,
        title: "E-commerce Platform",
        description: "Modern e-commerce platform with real-time inventory",
        image: "/images/ecommerce.jpg",
        technologies: ["React", "Node.js", "MongoDB"],
        github_url: "https://github.com/yourusername/ecommerce",
        live_url: "https://ecommerce.example.com",
        featured: true
      }
    ];
    
    console.log('Sending projects:', projects);
    res.json({
      data: projects,
      message: "Projects retrieved successfully"
    });
  } catch (error) {
    console.error('Error in /api/projects:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/api/about', (req, res) => {
  console.log('Received request for about');
  try {
    const about = {
      id: 1,
      title: "About Me",
      content: "I am passionate about building excellent software that improves the lives of those around me.",
      profile_image: "/images/profile.jpg",
      email: "olayinka@example.com",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      location: "Your Location"
    };
    
    console.log('Sending about:', about);
    res.json({
      data: about,
      message: "About data retrieved successfully"
    });
  } catch (error) {
    console.error('Error in /api/about:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/api/skills', (req, res) => {
  console.log('Received request for skills');
  try {
    const skills = [
      {
        id: 1,
        name: "React",
        icon: "FaReact",
        category: "Frontend",
        proficiency: 90
      },
      {
        id: 2,
        name: "TypeScript",
        icon: "SiTypescript",
        category: "Frontend",
        proficiency: 85
      },
      {
        id: 3,
        name: "Node.js",
        icon: "FaNodeJs",
        category: "Backend",
        proficiency: 88
      }
    ];
    
    console.log('Sending skills:', skills);
    res.json({
      data: skills,
      message: "Skills retrieved successfully"
    });
  } catch (error) {
    console.error('Error in /api/skills:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
