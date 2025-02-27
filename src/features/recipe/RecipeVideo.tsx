import { IRecipeInstruction } from './models/recipe';
import { useRef, useState } from 'react';
import { Form, Switch } from 'antd';

type RecipeVideoProps = {
  videoUrl: string;
  instructions: IRecipeInstruction[];
}

/**
 * Format time to seconds
 * @param time
 */
function timeToSeconds(time: string | undefined): number {
  if (!time) {
    return 0;
  }

  try {
    const [minutes, seconds] = time.split(':').map(Number);

    return  minutes * 60 + seconds;
  } catch (e: any) {
    console.error(`timeToSeconds error: ${e.message}`);

    return 0;
  }

}

const RecipeVideo = ({ videoUrl, instructions }: RecipeVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  const handleInstructionClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;

      if (autoplay) {
        videoRef.current.play();
      }
    }
  };

  return <div>
    <video ref={videoRef} width="100%" className="h-[400px]" controls preload="metadata">
      <source src={`${videoUrl}#t=0.1`} type="video/mp4"/>
      Ваш браузер не поддерживает данное видео.
    </video>
    <div>
      <Form.Item label="Авто воспроизведение интрукции"
                 valuePropName="checked"
                 extra="Нажмите на инструкцию, чтобы воспроизвести нужный фрагмент">
        <Switch defaultChecked={autoplay} onChange={(checked) => setAutoplay(checked)} size="small"/>
      </Form.Item>
      <h4>Инструкции:</h4>
      <div style={{
        height: '190px',
        overflowY: 'hidden',
        boxShadow: 'inset 0 10px 10px -10px rgba(0, 0, 0, 0.15), inset 0 -10px 10px -10px rgba(0, 0, 0, 0.15)',
      }}>
        <div style={{ overflowY: 'auto', height: '100%' }}>
          <ol>
            {instructions
              .map(i => ({ ...i, videoStartTime: timeToSeconds(i.videoStartTime) }))
              .map((instruction, index) => (
                <li
                  key={index}
                  style={{ cursor: 'pointer', marginBottom: '10px' }}
                  onClick={() => handleInstructionClick(instruction.videoStartTime)}
                >
                  {instruction.text}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  </div>;
};

export default RecipeVideo;