import { 
  users, 
  type User, 
  type InsertUser, 
  messages, 
  type Message, 
  type InsertMessage,
  repositories,
  type Repository,
  type InsertRepository
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Message operations (for contact form)
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  
  // Repository operations (optional for caching GitHub repos)
  saveRepository(repo: InsertRepository): Promise<Repository>;
  getRepositories(): Promise<Repository[]>;
  getRepositoryById(repoId: string): Promise<Repository | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private repos: Map<number, Repository>;
  private userCurrentId: number;
  private messageCurrentId: number;
  private repoCurrentId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.repos = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    this.repoCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Message methods
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const message: Message = { ...insertMessage, id, createdAt };
    this.messages.set(id, message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  // Repository methods
  async saveRepository(insertRepo: InsertRepository): Promise<Repository> {
    const id = this.repoCurrentId++;
    const repo: Repository = { ...insertRepo, id };
    this.repos.set(id, repo);
    return repo;
  }

  async getRepositories(): Promise<Repository[]> {
    return Array.from(this.repos.values());
  }

  async getRepositoryById(repoId: string): Promise<Repository | undefined> {
    return Array.from(this.repos.values()).find(
      (repo) => repo.repoId === repoId
    );
  }
}

export const storage = new MemStorage();
