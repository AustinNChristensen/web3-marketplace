export interface ICourse {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    type: string;
    index?: number;
    slug: string;
    wsl: string[];
}