import Clipboard from '@react-native-clipboard/clipboard';

export type ClipboardModule = {
  getString: () => Promise<string>;
  setString: (value: string) => Promise<void>;
};

export const initRNClipboardModule = (
  clipboard: typeof Clipboard
): ClipboardModule | null => {
  if (typeof clipboard.setString !== 'function') {
    return null;
  }
  return {
    setString: async (value: string) => {
      await new Promise(() => {
        clipboard.setString(value);
      });
    },
    getString: async () => {
      const output = await clipboard.getString();
      return output;
    },
  };
};
