import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub API endpoints
  app.get("/api/github/repos", async (req: Request, res: Response) => {
    try {
      // You can replace this with your actual GitHub username
      const username = process.env.GITHUB_USERNAME || 'octocat';
      
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ 
          message: `GitHub API error: ${response.status} ${errorText}`
        });
      }
      
      const repos = await response.json();
      
      // Transform the data to match our schema
      const formattedRepos = repos.map((repo: any) => ({
        repoId: repo.id.toString(),
        name: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || '',
        updatedAt: new Date(repo.updated_at),
        tags: repo.topics || []
      }));
      
      res.json(formattedRepos);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      res.status(500).json({ message: 'Failed to fetch GitHub repositories' });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  });

  // Get all contact messages (could be protected in a real app)
  app.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve messages' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
