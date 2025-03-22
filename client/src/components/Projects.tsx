import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "@/hooks/useInView";
import { Skeleton } from "@/components/ui/skeleton";

type Repository = {
  repoId: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  tags: string[];
};

type FilterType = 'all' | 'react' | 'typescript' | 'vanilla';

export default function Projects() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<FilterType>('all');
  const { ref, isVisible } = useInView();

  // Fetch GitHub repositories
  const { data: repositories, isLoading, isError } = useQuery<Repository[]>({
    queryKey: ['/api/github/repos'],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load GitHub repositories",
        variant: "destructive",
      });
    }
  });
  
  // Filter repositories based on selected filter
  const getFilteredRepos = () => {
    if (!repositories) return [];
    
    if (filter === 'all') return repositories;
    
    return repositories.filter(repo => {
      const lowerCaseLang = repo.language?.toLowerCase() || '';
      const lowerCaseTags = repo.tags.map(tag => tag.toLowerCase());
      
      switch(filter) {
        case 'react':
          return lowerCaseLang.includes('react') || 
                 lowerCaseTags.includes('react') || 
                 repo.name.toLowerCase().includes('react');
        case 'typescript':
          return lowerCaseLang.includes('typescript') || 
                 lowerCaseTags.includes('typescript') || 
                 repo.name.toLowerCase().includes('typescript');
        case 'vanilla':
          return lowerCaseLang.includes('javascript') && 
                 !lowerCaseLang.includes('typescript') && 
                 !lowerCaseTags.includes('react');
        default:
          return true;
      }
    });
  };
  
  // Format relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  };
  
  // Map languages to color classes
  const getLanguageColor = (language: string) => {
    const colorMap: Record<string, string> = {
      'javascript': 'bg-yellow-100 text-yellow-700',
      'typescript': 'bg-blue-100 text-blue-700',
      'html': 'bg-red-100 text-red-700',
      'css': 'bg-pink-100 text-pink-700',
      'scss': 'bg-pink-100 text-pink-700',
      'sass': 'bg-pink-100 text-pink-700',
      'react': 'bg-indigo-100 text-indigo-700',
      'vue': 'bg-green-100 text-green-700',
      'angular': 'bg-red-100 text-red-700',
      'python': 'bg-blue-100 text-blue-700',
      'java': 'bg-orange-100 text-orange-700',
      'php': 'bg-purple-100 text-purple-700',
      'c#': 'bg-green-100 text-green-700',
      'c++': 'bg-blue-100 text-blue-700',
      'go': 'bg-cyan-100 text-cyan-700',
    };
    
    const lowerCaseLang = language.toLowerCase();
    return colorMap[lowerCaseLang] || 'bg-slate-100 text-slate-700';
  };
  
  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Projects & GitHub Repositories</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-3xl mx-auto">
            A selection of my recent work and open-source projects. These repositories are pulled directly from my GitHub account.
          </p>
        </div>

        {/* Project Filter */}
        <div className="flex justify-center mb-8 overflow-x-auto py-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:text-indigo-600'}`}
              onClick={() => setFilter('all')}
            >
              All Projects
            </button>
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium ${filter === 'react' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:text-indigo-600'}`}
              onClick={() => setFilter('react')}
            >
              React
            </button>
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium ${filter === 'typescript' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:text-indigo-600'}`}
              onClick={() => setFilter('typescript')}
            >
              TypeScript
            </button>
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${filter === 'vanilla' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:text-indigo-600'}`}
              onClick={() => setFilter('vanilla')}
            >
              Vanilla JS
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-3/4">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-600 mb-2">Failed to load repositories from GitHub.</p>
            <p className="text-slate-600">Please try again later or check your network connection.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !isError && (
          <div 
            ref={ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {getFilteredRepos().length > 0 ? (
              getFilteredRepos().map((repo) => (
                <div 
                  key={repo.repoId} 
                  className="repo-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-primary mb-1">{repo.name}</h3>
                        <div className="flex items-center text-sm text-slate-500">
                          <span className="flex items-center">
                            <i className="far fa-star mr-1"></i> {repo.stars}
                          </span>
                          <span className="flex items-center ml-3">
                            <i className="fas fa-code-branch mr-1"></i> {repo.forks}
                          </span>
                        </div>
                      </div>
                      <div className="text-indigo-600">
                        <i className="fas fa-folder text-xl"></i>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">
                      {repo.description || 'No description provided.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <span className={`px-2 py-1 ${getLanguageColor(repo.language)} rounded-full text-xs font-medium`}>
                          {repo.language}
                        </span>
                      )}
                      {repo.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">
                        Updated {getRelativeTime(repo.updatedAt)}
                      </span>
                      <a 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        View Repository
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-8 bg-slate-50 rounded-lg">
                <p className="text-slate-600">No repositories found matching the selected filter.</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-10">
          <a 
            href="https://github.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <i className="fab fa-github mr-2"></i>
            See More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
