export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: SupportInfo;
  _meta: Metadata;
}

export interface Metadata {
  powered_by: string;
  upgrade_url: string;
  docs_url: string;
  template_gallery: string;
  message: string;
  features: string[];
  upgrade_cta: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role?: 'admin' | 'user';
}

export interface SupportInfo {
  url: string;
  text: string;
}
