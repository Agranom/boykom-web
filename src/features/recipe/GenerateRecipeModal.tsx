import { useForm } from 'antd/es/form/Form';
import { Form, Input, Modal } from 'antd';
import { validationMessages } from '../../translations/validation-messages.translations';
import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { usePreviewRecipe } from './api/preview-recipe';
import { IRecipeMetadata } from './models/recipe-metadata';
import RecipePreview from './RecipePreview';
import { useAbortRecipe } from './api/abort-generate-recipe';
import { eSocketEvent, useSocketEvent } from '../../hooks/use-socket';
import { useAlert } from '../../hooks/use-alert';

interface FormValue {
  postUrl: string;
}

type GenerateRecipeModalProps = {
  onCancel: () => void;
  onCreate: (metadata: IRecipeMetadata) => void;
}

const GenerateRecipeModal = ({ onCreate, onCancel }: GenerateRecipeModalProps) => {
  const [form] = useForm<FormValue>();
  const [recipeMetadata, setRecipeMetadata] = useState<IRecipeMetadata>();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: previewRecipe } = usePreviewRecipe({ onSuccess: () => setIsLoading(true) });
  const { mutate: abortRecipe } = useAbortRecipe();
  const { showError } = useAlert();

  useSocketEvent(eSocketEvent.RecipePreviewed, (payload: { success: boolean; data?: IRecipeMetadata }) => {
    const { success, data } = payload || {};

    setIsLoading(false);

    if (success) {
      setRecipeMetadata(data);
    } else {
      // TODO: handle invalid recipes
      showError('Не удалось загрузить рецепт');
    }
  });

  const submitHandler = ({ postUrl }: FormValue) => {
    previewRecipe(postUrl);
  };

  const cancelHandler = () => {
    const videoFile = recipeMetadata?.videoFile;
    if (videoFile) {
      abortRecipe({ publicFileId: videoFile.publicFileId, fileId: videoFile.fileId });
    }
    onCancel();
  };

  const createHandler = () => {
    if (recipeMetadata) {
      onCreate(recipeMetadata);
    }
  };

  return <Modal title="Сгенерировать рецепт" open={true} footer={false} onCancel={onCancel}>
    <p>Возможность автоматического создания рецепта из публикации Instagram.</p>
    {recipeMetadata
      ?
      <>
        <RecipePreview metadata={recipeMetadata}/>
        <div className="flex gap-2 justify-end mt-4">
          <Button size="large" type="button" variant="outlined" onClick={cancelHandler}>Отмена</Button>
          <Button size="large" type="button" variant="contained" onClick={createHandler}>Создать</Button>
        </div>
      </>
      :
      <Form form={form} onFinish={submitHandler} disabled={isLoading}>
        <Form.Item label="Ссылка на публикацию" name="postUrl" rules={[{
          required: true,
          message: validationMessages.required,
        }, {
          pattern: /^https:\/\/(www\.)?instagram\.com/,
          message: validationMessages.invalidFormat,
        }]}>
          <Input placeholder="https://www.instagram.com/..."/>
        </Form.Item>
        <div className="flex gap-4">
          <Button size="large" type="submit" variant="contained" disabled={isLoading}>Загрузить</Button>
          {isLoading && <CircularProgress/>}
        </div>
      </Form>
    }
  </Modal>;
};

export default GenerateRecipeModal;