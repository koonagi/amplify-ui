import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface SetupTOTPStyle {
  copyIcon: ImageStyle;
  secretKeyContainer: ViewStyle;
  secretKeySubcontainer: ViewStyle;
  secretKeyText: TextStyle;
}

export const styles: SetupTOTPStyle = StyleSheet.create({
  // TODO: replace with tokens
  copyIcon: {
    marginLeft: 8,
  },
  secretKeyContainer: {
    marginHorizontal: 12,
    paddingTop: 4,
  },
  secretKeySubcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  secretKeyText: {
    flexWrap: 'wrap',
    flex: 1,
  },
});
