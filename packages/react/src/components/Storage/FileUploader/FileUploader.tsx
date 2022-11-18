import React, { useEffect, useState, useRef, useCallback } from 'react';
import { UploadTask, Storage } from '@aws-amplify/storage';
import { translate, uploadFile } from '@aws-amplify/ui';
import { FileStatuses, FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { ComponentClassNames, Text } from '../../../primitives';
import { UploadButton } from './UploadButton';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';
import { Tracker } from './Tracker';
import { Logger } from 'aws-amplify';

const isUploadTask = (value: unknown): value is UploadTask =>
  typeof (value as UploadTask)?.resume === 'function';

export function FileUploader({
  acceptedFileTypes,
  autoProceed = false,
  components = {},
  isPreviewerVisible,
  level,
  maxFiles,
  maxSize,
  multiple = true,
  onError,
  onSuccess,
  showImages = true,
  variation = 'button',
  resumable = false,
  ...rest
}: FileUploaderProps): JSX.Element {
  const {
    UploadDropZone = FileUploader.UploadDropZone,
    UploadButton = FileUploader.UploadButton,
    Previewer = FileUploader.Previewer,
    Tracker = FileUploader.Tracker,
  } = components;

  if (!acceptedFileTypes || !level) {
    new Logger(
      'You must include the level and acceptedFileNames props to use the file uploader!'
    );
  }

  // File Previewer loading state
  const [isLoading, setLoading] = useState(false);

  const fileStatusesRef = useRef<FileStatuses>([]);

  const {
    addTargetFiles,
    autoUploadRef,
    fileStatuses,
    inDropZone,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setFileStatuses,
    setShowPreviewer,
    showPreviewer,
  } = useFileUploader({
    maxSize,
    acceptedFileTypes,
    multiple,
    isLoading,
  });

  // Creates aggregate percentage to show during downloads
  const percentage = Math.floor(
    fileStatuses.reduce((prev, curr) => prev + (curr?.percentage ?? 0), 0) /
      fileStatuses.length
  );

  // checks if all downloads completed to 100%
  const isSuccess = () => {
    if (fileStatuses.length === 0) return;

    return fileStatuses.every((status) => status?.percentage === 100);
  };

  // Displays if over max files
  const maxFilesError = fileStatuses.length > maxFiles;

  useEffect(() => {
    // Loading ends when all files are at 100%
    if (Math.floor(percentage) === 100) {
      setLoading(false);
    }
  }, [percentage, fileStatuses]);

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  // Previewer Methods

  const progressCallback = useCallback(
    (index: number) => {
      return (progress: { loaded: number; total: number }) => {
        const percentage = Math.floor((progress.loaded / progress.total) * 100);
        const status = fileStatusesRef.current[index];
        fileStatusesRef.current[index] =
          percentage !== 100
            ? { ...status, percentage, fileState: 'loading' }
            : { ...status, percentage, fileState: 'success' };
        const newFileStatuses = [...fileStatusesRef.current];
        setFileStatuses(newFileStatuses);
      };
    },
    [setFileStatuses]
  );

  const errorCallback = useCallback(
    (index: number) => {
      return (err: string) => {
        const status = fileStatusesRef.current[index];
        fileStatusesRef.current[index] = {
          ...status,
          fileState: 'error',
          fileErrors: translate(err.toString()),
        };

        const newFileStatuses = [...fileStatusesRef.current];
        setFileStatuses(newFileStatuses);
        setLoading(false);
        if (typeof onError === 'function') onError(err);
      };
    },
    [onError, setFileStatuses]
  );

  const completeCallback = useCallback(() => {
    return (event: { key: string }) => {
      if (typeof onSuccess === 'function') onSuccess(event);
    };
  }, [onSuccess]);

  const onDelete = () => {
    //todo delete
  };

  const onPause = useCallback(
    (index: number): (() => void) => {
      return function () {
        const status = fileStatuses[index];
        if (isUploadTask(status.uploadTask)) {
          status.uploadTask.pause();
        }
        const newFileStatuses = [...fileStatuses];

        newFileStatuses[index] = { ...status, fileState: 'paused' };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onResume = useCallback(
    (index: number): (() => void) => {
      return function () {
        const status = fileStatuses[index];

        if (isUploadTask(status.uploadTask)) {
          status.uploadTask.resume();
        }
        const newFileStatuses = [...fileStatuses];

        newFileStatuses[index] = { ...status, fileState: 'resume' };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onFileClick = useCallback(() => {
    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    fileStatuses.forEach((status, i) => {
      if (status?.fileState === 'success') return;

      const uploadTask = uploadFile({
        file: status.file,
        fileName: status.name,
        level,
        resumable,
        progressCallback: progressCallback(i),
        errorCallback: errorCallback(i),
        completeCallback: completeCallback(),
        ...rest,
      });

      if (isUploadTask(uploadTask) && resumable) {
        uploadTasksTemp.push(uploadTask);
      }
    });

    const newFileStatuses = [...fileStatuses];
    fileStatusesRef.current = newFileStatuses.map((status, index) => {
      return {
        ...status,
        uploadTask: uploadTasksTemp?.[index],
        fileState: status.fileState ?? 'loading',
        percentage: status.percentage ?? 0,
      };
    });
    const uploadTasks = [...fileStatusesRef.current];
    setFileStatuses(uploadTasks);
  }, [
    completeCallback,
    errorCallback,
    fileStatuses,
    level,
    progressCallback,
    setFileStatuses,
    resumable,
    rest,
  ]);

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const { files } = event.target;
      const addedFilesLength = addTargetFiles([...files]);
      // only show previewer if the added files are great then 0
      if (addedFilesLength > 0) {
        setShowPreviewer(true);
        autoUploadRef.current = true;
      }
    },
    [addTargetFiles, autoUploadRef, setShowPreviewer]
  );

  const onClear = useCallback(() => {
    setShowPreviewer(false);
    setFileStatuses([]);
  }, [setFileStatuses, setShowPreviewer]);

  const onFileCancel = useCallback(
    (index: number) => {
      return () => {
        const { fileState, uploadTask } = fileStatuses[index];

        if (fileState === 'loading' && isUploadTask(uploadTask)) {
          // if downloading use uploadTask and stop download
          Storage.cancel(uploadTask);
          setLoading(false);
        }
        const updatedFiles = fileStatuses.filter((_, i) => i !== index);
        setFileStatuses(updatedFiles);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onNameChange = useCallback(
    (index: number) => {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFileStatuses = [...fileStatuses];
        const name = event.target.value;
        newFileStatuses[index].name = name;
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  // Tracker methods

  const onSaveEdit = useCallback(
    (index: number) => {
      return (value: string) => {
        // no empty file names
        if (value.trim().length === 0) return;
        const [extension] = value.split('.').reverse();
        const validExtension = acceptedFileTypes.includes('.' + extension);
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        newFileStatuses[index] = {
          ...status,
          name: value,
          fileState: !validExtension ? 'error' : null,
          fileErrors: validExtension
            ? null
            : translate('Extension not allowed'),
        };

        setFileStatuses(newFileStatuses);
      };
    },
    [acceptedFileTypes, fileStatuses, setFileStatuses]
  );

  const onCancelEdit = useCallback(
    (index: number) => {
      return () => {
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        newFileStatuses[index] = {
          ...status,
          fileState: null,
        };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onStartEdit = useCallback(
    (index: number) => {
      return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        newFileStatuses[index] = {
          ...status,
          fileState: 'editing',
        };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  useEffect(() => {
    if (autoProceed && autoUploadRef.current) {
      onFileClick();
    }
    autoUploadRef.current = false;
  }, [autoProceed, autoUploadRef, onFileClick]);

  // UploadButton
  const hiddenInput = React.useRef<HTMLInputElement>();
  const onUploadButtonClick = () => {
    hiddenInput.current.click();
    hiddenInput.current.value = null;
  };

  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
    onClick: onUploadButtonClick,
    hiddenInput,
  };

  if (showPreviewer) {
    return (
      <Previewer
        acceptedFileTypes={acceptedFileTypes}
        fileStatuses={fileStatuses}
        hiddenInput={hiddenInput}
        inDropZone={inDropZone}
        isLoading={isLoading}
        isSuccess={isSuccess()}
        maxFilesError={maxFilesError}
        multiple={multiple}
        onClear={onClear}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFileChange={onFileChange}
        onFileClick={onFileClick}
        onUploadButtonClick={onUploadButtonClick}
        percentage={percentage}
      >
        {fileStatuses?.map((status, index) => (
          <Tracker
            errorMessage={status?.fileErrors}
            file={status.file}
            fileState={status?.fileState}
            hasImage={status.file?.type.startsWith('image/')}
            showImage={showImages}
            key={index}
            name={status.name}
            onCancel={onFileCancel(index)}
            onCancelEdit={onCancelEdit(index)}
            onChange={onNameChange(index)}
            onDelete={onDelete}
            onPause={onPause(index)}
            onResume={onResume(index)}
            onSaveEdit={onSaveEdit(index)}
            onStartEdit={onStartEdit(index)}
            percentage={status.percentage}
            resumable={resumable}
            url={URL.createObjectURL(status.file)}
          />
        ))}
      </Previewer>
    );
  }

  if (variation === 'button') {
    return <UploadButton {...CommonProps} />;
  } else {
    return (
      <UploadDropZone
        inDropZone={inDropZone}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDrop={onDrop}
      >
        <Text className={ComponentClassNames.FileUploaderDropZoneText}>
          {translate('Drop files here or')}
        </Text>
        <UploadButton
          {...CommonProps}
          className={ComponentClassNames.FileUploaderDropZoneButton}
        />
      </UploadDropZone>
    );
  }
}

FileUploader.UploadDropZone = UploadDropZone;
FileUploader.UploadButton = UploadButton;
FileUploader.Previewer = Previewer;
FileUploader.Tracker = Tracker;
