import {
  AlignItemsValue,
  BorderContrast,
  BorderRadiusValue,
  BorderStyleValue,
  BorderWidthValue,
  BoxShadowValue,
  BoxSizingValue,
  CursorValue,
  DesignToken,
  GapValue,
  JustifyContentValue,
  OutlineColorValue,
  OutlineOffsetValue,
  OutlineStyleValue,
  OutlineWidthValue,
  SpaceValue,
  TextContrast,
  TransitionDurationValue,
  TransitionPropertyValue,
} from '../types/designToken';

interface RadioDisabledTokens {
  cursor: DesignToken<CursorValue>;
}

interface RadioButtonTokens extends BorderContrast, TextContrast {
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  boxSizing: DesignToken<BoxSizingValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  transitionProperty: DesignToken<TransitionPropertyValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  outlineColor: DesignToken<OutlineColorValue>;
  outlineStyle: DesignToken<OutlineStyleValue>;
  outlineWidth: DesignToken<OutlineWidthValue>;
  outlineOffset: DesignToken<OutlineOffsetValue>;
  padding: DesignToken<SpaceValue>;
  small: RadioButtonSizeTokens;
  large: RadioButtonSizeTokens;
  _checked: RadioButtonCheckedTokens;
  _focus: RadioButtonFocusTokens;
  _error: RadioButtonErrorTokens;
  _disabled: RadioButtonDisabledTokens;
}

interface RadioButtonSizeTokens {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
}

interface RadioButtonCheckedTokens extends TextContrast {
  _disabled: RadioButtonCheckedDisabledTokens;
}
interface RadioButtonCheckedDisabledTokens extends TextContrast {}

interface RadioButtonFocusTokens extends BorderContrast {
  boxShadow: DesignToken<BoxShadowValue>;
}

interface RadioButtonErrorTokens extends BorderContrast {
  _focus: RadioButtonErrorFocusTokens;
}

interface RadioButtonErrorFocusTokens {
  boxShadow: DesignToken<BoxShadowValue>;
}

interface RadioButtonDisabledTokens extends BorderContrast {}

interface RadioLabelTokens extends TextContrast {
  _disabled: RadioLabelDisabledTokens;
}

interface RadioLabelDisabledTokens extends TextContrast {}

export interface RadioTokens {
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  gap: DesignToken<GapValue>;
  _disabled: RadioDisabledTokens;
  button: RadioButtonTokens;
  label: RadioLabelTokens;
}

export const radio: RadioTokens = {
  alignItems: { value: 'center' },
  justifyContent: { value: 'flex-start' },
  gap: { value: 'inherit' },
  _disabled: { cursor: { value: 'not-allowed' } },
  button: {
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
    boxSizing: { value: 'border-box' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '50%' },
    borderColor: { value: '{colors.border.primary.value}' },
    color: { value: '{colors.background.primary.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.medium.value}' },
    outlineColor: { value: '{colors.transparent.value}' },
    outlineStyle: { value: 'solid' },
    outlineWidth: { value: '{outlineWidths.medium.value}' },
    outlineOffset: { value: '{outlineOffsets.medium.value}' },
    // We want the dot inside the border to be a border-width from the border
    padding: { value: '{borderWidths.medium.value}' },

    small: {
      width: { value: '{fontSizes.small.value}' },
      height: { value: '{fontSizes.small.value}' },
    },
    large: {
      width: { value: '{fontSizes.large.value}' },
      height: { value: '{fontSizes.large.value}' },
    },

    _checked: {
      backgroundColor: { value: '{colors.transparent}' },
      color: {
        value: '{colors.brand.primary.80.value}',
      },
      _disabled: {
        backgroundColor: { value: '{colors.transparent}' },
        color: { value: '{colors.background.disabled.value}' },
      },
    },

    _focus: {
      backgroundColor: { value: '{colors.transparent}' },
      borderColor: { value: '{colors.border.focus.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
    },

    _error: {
      backgroundColor: { value: '{colors.transparent}' },
      borderColor: { value: '{colors.border.error.value}' },
      _focus: {
        boxShadow: {
          value: '{components.fieldcontrol._error._focus.boxShadow.value}',
        },
      },
    },

    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
    },
  },

  label: {
    backgroundColor: { value: '{components.text.backgroundColor}' },
    color: { value: '{components.text.color.value}' },
    _disabled: {
      backgroundColor: { value: '{colors.transparent}' },
      color: {
        value: '{colors.font.disabled.value}',
      },
    },
  },
};
