import Clipboard from 'expo-clipboard';

export type ClipboardModule = {
  setString: (value: string) => Promise<void>;
};

export const initExpoClipboardModule = (
  clipboard: typeof Clipboard
): ClipboardModule => ({
  setString: async (value: string) => {
    await clipboard.setStringAsync(value);
  },
});
