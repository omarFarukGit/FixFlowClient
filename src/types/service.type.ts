export interface ICategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CreateServiceRequestPayload {
  title: string;
  description: string;
  address: string;
  city: string;
  area: string;
  scheduledAt?: string;
  estimatedPrice?: number;
  categoryId: string;
}
