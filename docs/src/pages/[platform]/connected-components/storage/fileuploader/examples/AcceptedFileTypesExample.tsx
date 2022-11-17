import { FileUploader } from '@aws-amplify/ui-react';
export const AcceptedFileTypesExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['.gif', '.bmp', '.doc']}
      level="public"
      provider="slow" // IGNORE
    />
  );
};
