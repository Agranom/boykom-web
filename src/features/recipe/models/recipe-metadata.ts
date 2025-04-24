export interface IRecipeVideoFile {
  uri: string;
  fileId: string;
  fileName: string;
  url?: string;
  publicFileId?: string;
}

export interface IRecipeMetadata {
  description: string;
  hasInstructions: boolean;
  imageUrl?: string;
  videoUrl?: string;
  videoFile?: IRecipeVideoFile;
}
