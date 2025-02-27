export interface IRecipeVideoFile {
  uri: string;
  fileId: string;
  fileName: string;
}

export interface IRecipeMetadata {
  description: string;
  hasInstructions: boolean;
  imageUrl?: string;
  videoUrl?: string;
  videoFile?: IRecipeVideoFile;
}
