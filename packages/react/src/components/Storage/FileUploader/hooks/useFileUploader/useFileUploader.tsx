import { checkMaxSize, returnAcceptedFiles } from '@aws-amplify/ui';
import React, { useRef, useState } from 'react';
import { Files, FileStatuses } from '../../types';
import { UseFileUploader } from './types';

export default function useFileUploader({
  maxSize,
  acceptedFileTypes,
  multiple,
  isLoading,
}: {
  maxSize: number;
  acceptedFileTypes: string[];
  multiple: boolean;
  isLoading: boolean;
}): UseFileUploader {
  const [fileStatuses, setFileStatuses] = useState<FileStatuses>([]);
  const [showPreviewer, setShowPreviewer] = useState(false);
  const autoUploadRef = useRef(false);

  const [inDropZone, setInDropZone] = useState(false);

  const updateFileStatusArray = (files: Files, fileStatuses: FileStatuses) => {
    const statuses = [...fileStatuses];
    [...files].forEach((file) => {
      const errorFile = checkMaxSize(maxSize, file);

      statuses.unshift({
        fileState: errorFile ? 'error' : null,
        fileErrors: errorFile,
        file,
        name: file.name,
      });
    });
    setFileStatuses(statuses);
  };

  const addTargetFiles = (targetFiles: File[]): number => {
    // Only accept accepted files
    const targets = returnAcceptedFiles([...targetFiles], acceptedFileTypes);
    // return if no accepted files
    if (!targets) return 0;

    // If not multiple and files already selected return
    if (!multiple && fileStatuses.length > 0) return fileStatuses.length;

    // if not multiple and only 1 file selected save
    if (!multiple && targets.length == 1) {
      updateFileStatusArray([...targets], fileStatuses);
      return targets.length;
    }

    // if not multiple save just the first target into the array
    if (!multiple && targets.length > 1) {
      updateFileStatusArray([targets[0]], fileStatuses);
      return 1;
    }

    if (targets.length > 0) {
      updateFileStatusArray([...targets], fileStatuses);
    } else {
      return 0;
    }
    return targets.length + fileStatuses.length;
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    setInDropZone(false);
  };
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    setInDropZone(true);
    event.dataTransfer.dropEffect = 'copy';
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    const { files } = event.dataTransfer;
    const addedFilesLength = addTargetFiles([...files]);
    if (addedFilesLength > 0) {
      setShowPreviewer(true);
      autoUploadRef.current = true;
    }
    setInDropZone(false);
  };

  return {
    autoUploadRef,
    inDropZone,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setInDropZone,
    setShowPreviewer,
    addTargetFiles,
    showPreviewer,
    fileStatuses,
    setFileStatuses,
  };
}
