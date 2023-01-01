import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Logger } from 'aws-amplify';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { icons } from '../../../assets';
import { useModule } from '../../../contexts';
import { IconButton, Label } from '../../../primitives';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSetupTOTPComponent } from '../types';
import { styles } from './styles';
import { View } from 'react-native';

const COMPONENT_NAME = 'SetupTOTP';

const logger = new Logger('Authenticator');

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTOTPText,
  getSetupTOTPInstructionsText,
} = authenticatorTextUtil;

const SetupTOTP: DefaultSetupTOTPComponent = ({
  fields,
  getTotpSecretCode,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  ...rest
}) => {
  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  const Clipboard = useModule('Clipboard');
  const hasClipboardModule = !!Clipboard;

  const [secretKey, setSecretKey] = useState<string | null>(null);

  const getSecretKey = useCallback(async () => {
    try {
      const newSecretKey = await getTotpSecretCode();
      setSecretKey(newSecretKey);
    } catch (error) {
      logger.error(error);
    }
  }, [getTotpSecretCode]);

  useEffect(() => {
    if (!secretKey) {
      getSecretKey();
    }
  }, [getSecretKey, secretKey]);

  const headerText = getSetupTOTPText();
  const primaryButtonText = isPending ? getConfirmingText() : getConfirmText();
  const secondaryButtonText = getBackToSignInText();

  const copyText = () => {
    if (hasClipboardModule && secretKey) {
      Clipboard.setString(secretKey);
    }
  };

  const body = secretKey ? (
    <View style={styles.secretKeyContainer}>
      <Label>{getSetupTOTPInstructionsText()}</Label>
      <View style={styles.secretKeySubcontainer}>
        <Label selectable={!hasClipboardModule} style={styles.secretKeyText}>
          {secretKey}
        </Label>
        {hasClipboardModule ? (
          <IconButton
            color="teal"
            iconStyle={styles.copyIcon}
            onPress={copyText}
            source={icons.copy}
            testID="amplify__copy-text-button"
          />
        ) : null}
      </View>
    </View>
  ) : null;

  const buttons = useMemo(
    () => ({
      primary: { children: primaryButtonText, onPress: handleFormSubmit },
      links: [{ children: secondaryButtonText, onPress: toSignIn }],
    }),
    [handleFormSubmit, primaryButtonText, secondaryButtonText, toSignIn]
  );

  return (
    <DefaultContent
      {...rest}
      body={body}
      buttons={buttons}
      headerText={headerText}
      fields={fieldsWithHandlers}
      isPending={isPending}
    />
  );
};

SetupTOTP.Footer = DefaultFooter;
SetupTOTP.FormFields = DefaultTextFormFields;
SetupTOTP.Header = DefaultHeader;

SetupTOTP.displayName = COMPONENT_NAME;
export default SetupTOTP;
