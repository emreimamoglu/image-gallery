export type ImageQueryResponse = {
  total: number;
  totalHits: number;
  hits: Image[];
};

export type ImageType = "all" | "photo" | "illustration" | "vector";
export type Tags = "blossom, bloom, flower";

export type Image = {
  id: number;
  pageURL: string;
  type: ImageType;
  tags: Tags;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};
