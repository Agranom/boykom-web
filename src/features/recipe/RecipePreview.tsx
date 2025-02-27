import { IRecipeMetadata } from './models/recipe-metadata';
import { Image } from 'antd';

type RecipePreviewProps = {
  metadata: IRecipeMetadata;
}

const RecipePreview = ({ metadata }: RecipePreviewProps) => {
  const { videoUrl, imageUrl, description } = metadata;

  return <div className="flex flex-col gap-4">
    {videoUrl ? <video className="h-96" src={`${videoUrl}#t=0.1`}></video> : <Image src={imageUrl} className="h-96"/>}
    <div className="h-48 overflow-y-hidden">
      <div className="overflow-y-auto h-full">
        <p>{description}</p>
      </div>
    </div>
  </div>;
};

export default RecipePreview;