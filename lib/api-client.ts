// API Client for Next.js API Routes
const API_BASE_URL = '/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ApiError {
  success: false;
  error: string;
  status?: number;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
    role: string;
  };
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get session token from cookie
    const sessionToken = this.getSessionToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(sessionToken && { 'Authorization': `Session ${sessionToken}` }),
        ...options.headers,
      },
      credentials: 'include', // Important for cookies
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          error: data.error || 'Request failed',
          status: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        error: error
      });
      
      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw {
          success: false,
          error: 'Unable to connect to server. Please check your connection.',
          status: 0,
        } as ApiError;
      }
      
      // Handle JSON parsing errors
      if (error instanceof SyntaxError) {
        throw {
          success: false,
          error: 'Invalid response from server',
          status: 0,
        } as ApiError;
      }
      
      // Re-throw ApiError as is
      if (error && typeof error === 'object' && 'success' in error) {
        throw error;
      }
      
      // Handle other errors
      throw {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0,
      } as ApiError;
    }
  }

  private getSessionToken(): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => 
      cookie.trim().startsWith('session_id=')
    );
    
    return sessionCookie ? sessionCookie.split('=')[1].trim() : null;
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async verifySession(): Promise<ApiResponse<{
    user: {
      id: number;
      email: string;
      role: string;
    };
    session: {
      id: string;
      expiresAt: string;
      lastAccessed: string;
    };
  }>> {
    return this.request('/auth/verify');
  }

  // Partners
  async getPartners(params?: { type?: string; featured?: boolean }) {
    const query = new URLSearchParams();
    if (params?.type) query.append('type', params.type);
    if (params?.featured) query.append('featured', 'true');
    
    return this.request(`/partners?${query.toString()}`);
  }

  async getStrategicPartner(id: string) {
    return this.request(`/partners/strategic/${id}`);
  }

  async getEcosystemPartner(id: string) {
    return this.request(`/partners/ecosystem/${id}`);
  }

  async createStrategicPartner(data: any) {
    return this.request('/partners/strategic', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createEcosystemPartner(data: any) {
    return this.request('/partners/ecosystem', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStrategicPartner(id: string, data: any) {
    return this.request(`/partners/strategic/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStrategicPartner(id: string) {
    return this.request(`/partners/strategic/${id}`, {
      method: 'DELETE',
    });
  }

  // News
  async getNews(params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
    category?: string;
    status?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.featured) query.append('featured', 'true');
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    
    return this.request(`/news?${query.toString()}`);
  }

  async getNewsBySlug(slug: string) {
    return this.request(`/news/${slug}`);
  }

  async createNews(data: any) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNews(id: string, data: any) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNews(id: string) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials(params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
    status?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.featured) query.append('featured', 'true');
    if (params?.status) query.append('status', params.status);
    
    return this.request(`/testimonials?${query.toString()}`);
  }

  async getTestimonial(id: string) {
    return this.request(`/testimonials/${id}`);
  }

  async createTestimonial(data: any) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: any) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  async approveTestimonial(id: string) {
    return this.request(`/testimonials/${id}/approve`, {
      method: 'PATCH',
    });
  }

  async rejectTestimonial(id: string) {
    return this.request(`/testimonials/${id}/reject`, {
      method: 'PATCH',
    });
  }

  // Applications
  async getApplications(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.status) query.append('status', params.status);
    if (params?.type) query.append('type', params.type);
    
    return this.request(`/applications?${query.toString()}`);
  }

  async getApplication(id: string) {
    return this.request(`/applications/${id}`);
  }

  async createApplication(data: any) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateApplication(id: string, data: any) {
    return this.request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateApplicationStatus(id: string, status: string, adminNotes?: string) {
    return this.request(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, admin_notes: adminNotes }),
    });
  }

  async deleteApplication(id: string) {
    return this.request(`/applications/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async trackEvent(event: string, data?: any) {
    return this.request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ event, ...data }),
    });
  }

  async getAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    event?: string;
    category?: string;
    group_by?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.start_date) query.append('start_date', params.start_date);
    if (params?.end_date) query.append('end_date', params.end_date);
    if (params?.event) query.append('event', params.event);
    if (params?.category) query.append('category', params.category);
    if (params?.group_by) query.append('group_by', params.group_by);
    
    return this.request(`/analytics?${query.toString()}`);
  }

  async getDashboardAnalytics(period?: string) {
    const query = period ? `?period=${period}` : '';
    return this.request(`/analytics/dashboard${query}`);
  }

  // Settings
  async getSettings(category?: string) {
    const endpoint = category ? `/settings/${category}` : '/settings';
    return this.request(endpoint);
  }

  async updateSettings(settings: Record<string, any>) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings }),
    });
  }

  async getSMTPConfig() {
    return this.request('/settings/smtp/config');
  }

  async updateSMTPConfig(config: any) {
    return this.request('/settings/smtp/config', {
      method: 'PUT',
      body: JSON.stringify({ smtp_settings: config }),
    });
  }

  async testSMTP(config: any) {
    return this.request('/settings/smtp/test', {
      method: 'POST',
      body: JSON.stringify({ smtp_settings: config }),
    });
  }

  // Upload
  async uploadFile(file: File, type: 'single' | 'multiple' | 'image' | 'document' = 'single') {
    const formData = new FormData();
    formData.append(type === 'single' ? 'file' : 'files', file);

    return this.request(`/upload/${type}`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async uploadMultipleFiles(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    return this.request('/upload/multiple', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async deleteFile(filename: string) {
    return this.request(`/upload/${filename}`, {
      method: 'DELETE',
    });
  }

  async listFiles() {
    return this.request('/upload');
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getDashboardActivity(limit?: number) {
    const query = limit ? `?limit=${limit}` : '';
    return this.request(`/dashboard/activity${query}`);
  }

  async getDashboardCharts(period?: string) {
    const query = period ? `?period=${period}` : '';
    return this.request(`/dashboard/charts${query}`);
  }

  async getSystemHealth() {
    return this.request('/dashboard/health');
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, ApiError };
