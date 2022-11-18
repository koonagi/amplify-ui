import { FileUploader } from '@aws-amplify/ui-react';

export const LevelExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="private"
      provider="fast" // IGNORE
    />
  );
};
