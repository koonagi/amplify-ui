{
  /* DO NOT EDIT DIRECTLY */
}
{
  /* This file is autogenerated by "docs/scripts/generate-props-tables.ts" script. */
}
export const propsData = {
  displayName: 'View',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div',
  htmlElement: 'div',
  propsLists: [
    {
      name: 'View',
      props: [
        {
          name: 'alignContent',
          isOptional: true,
          type: 'ResponsiveStyle<Property.AlignContent>',
          description:
            "Sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)",
        },
        {
          name: 'alignItems',
          isOptional: true,
          type: 'ResponsiveStyle<Property.AlignItems>',
          description:
            'Sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)',
        },
        {
          name: 'alignSelf',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.AlignSelf>>',
          description:
            "Overrides a grid or flex item's align-items value. In Grid, it aligns the item inside the grid area. In Flexbox, it aligns the item on the cross axis. See: @see[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)",
        },
        {
          name: 'AllStyleProps',
          isOptional: true,
          type: 'extends BaseStyleProps,     ImageStyleProps,     FlexContainerStyleProps,     GridContainerStyleProps,     TextAreaStyleProps',
          description: '',
        },
        {
          name: 'ariaLabel',
          isOptional: true,
          type: "AriaAttributes['aria-label']",
          description:
            'Defines a string value that labels an interactive element for accessibility',
        },
        {
          name: 'ariaValuetext',
          isOptional: true,
          type: "AriaAttributes['aria-valuetext']",
          description:
            'Defines the human readable text alternative of &#96;aria-valuenow&#96; for a range widget',
        },
        {
          name: 'as',
          isOptional: true,
          type: 'ElementType',
          description: 'Changes the type of HTML element rendered',
        },
        {
          name: 'backgroundColor',
          isOptional: true,
          type: 'ResponsiveStyle<     ColorKeys<StyleToken<Property.BackgroundColor>>   >',
          description:
            'Sets the background color of an element. See: @see[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)',
        },
        {
          name: 'backgroundImage',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.BackgroundImage>>',
          description:
            'Sets one or more background images on an element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)',
        },
        {
          name: 'base',
          isOptional: true,
          type: 'PropertyType',
          description: '',
        },
        {
          name: 'border',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.Border>>',
          description:
            "Shorthand CSS property that sets an element's border-width, border-style, and border-color. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border)",
        },
        {
          name: 'borderRadius',
          isOptional: true,
          type: 'ResponsiveStyle<RadiiKeys<StyleToken<Property.BorderRadius>>>',
          description:
            "Rounds the corners of an element's outer border edge.     You can set a single radius to make circular corners, or two radii to make elliptical corners. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)",
        },
        {
          name: 'bottom',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Bottom>>>',
          description:
            'Participates in setting the vertical position of a positioned element.     It has no effect on non-positioned elements. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom)',
        },
        {
          name: 'boxShadow',
          isOptional: true,
          type: 'ResponsiveStyle<BoxShadowKeys<StyleToken<Property.BoxShadow>>>',
          description:
            "Adds shadow effects around an element's frame. You can set multiple effects separated by commas.     A box shadow is described by X and Y offsets relative to the element, blur and spread radius, and color. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)",
        },
        {
          name: 'className',
          isOptional: true,
          type: 'string',
          description: 'Additional CSS class name for component',
        },
        {
          name: 'color',
          isOptional: true,
          type: 'ResponsiveStyle<ColorKeys<StyleToken<Property.Color>>>',
          description:
            "Sets the foreground color value of an element's text and text decorations, and sets the &#96;currentcolor&#96; value.     &#96;currentcolor&#96; may be used as an indirect value on other properties and is the default for other color properties, such as border-color. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color)",
        },
        {
          name: 'columnGap',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.GridColumnGap>>>',
          description:
            'Controls the spacing between Flex/Grid child columns See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)',
        },
        {
          name: 'display',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.Display>>',
          description:
            'Sets whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)',
        },
        {
          name: 'fontFamily',
          isOptional: true,
          type: 'ResponsiveStyle<FontFamilyKeys<StyleToken<Property.FontFamily>>>',
          description:
            'Specifies a prioritized list of one or more font family names and/or generic family names for the selected element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)',
        },
        {
          name: 'fontSize',
          isOptional: true,
          type: 'ResponsiveStyle<FontSizeKeys<StyleToken<Property.FontSize>>>',
          description:
            'Sets the size of the font. Changing the font size also updates the sizes of the font size-relative &#60;length&#62; units, such as em, ex, and so forth. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)',
        },
        {
          name: 'fontStyle',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.FontStyle>>',
          description:
            'Sets whether a font should be styled with a normal, italic, or oblique face from its font-family. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)',
        },
        {
          name: 'fontWeight',
          isOptional: true,
          type: 'ResponsiveStyle<FontWeightKeys<StyleToken<Property.FontWeight>>>',
          description:
            'Sets the weight (or boldness) of the font. The weights available depend on the font-family that is currently set. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)',
        },
        {
          name: 'gap',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Gap>>>',
          description:
            'Controls the spacing between child components. Shorthand for rowGap and columnGap. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)',
        },
        {
          name: 'height',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Height>>>',
          description:
            'specifies the height of an element. By default, the property defines the height of the content area.     If box-sizing is set to border-box, however, it instead determines the height of the border area. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/height)',
        },
        {
          name: 'id',
          isOptional: true,
          type: 'string',
          description: 'Unique identifier',
        },
        {
          name: 'isDisabled',
          isOptional: true,
          type: 'boolean',
          description:
            'Sets the Boolean &#96;disabled&#96; HTML attribute, which, when present, makes the element not mutable, focusable, or even submitted with the form',
        },
        {
          name: 'justifyContent',
          isOptional: true,
          type: 'ResponsiveStyle<Property.JustifyContent>',
          description:
            'Defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)',
        },
        {
          name: 'large',
          isOptional: true,
          type: 'PropertyType',
          description: '',
        },
        {
          name: 'left',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Left>>>',
          description:
            'Participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/left)',
        },
        {
          name: 'letterSpacing',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.LetterSpacing>>   >',
          description:
            'Sets the horizontal spacing behavior between text characters.     This value is added to the natural spacing between characters while rendering the text. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)',
        },
        {
          name: 'lineHeight',
          isOptional: true,
          type: 'ResponsiveStyle<LineHeightKeys<StyleToken<Property.LineHeight>>>',
          description:
            "Sets the height of a line box. It's commonly used to set the distance between lines of text. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)",
        },
        {
          name: 'margin',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Margin>>>',
          description:
            'Shorthand CSS property that sets the margin area on all four sides of an element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)',
        },
        {
          name: 'marginBlock',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginBlock>>>',
          description:
            "Shorthand CSS property that defines the logical block start and end margins of an element,     which maps to physical margins depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block)",
        },
        {
          name: 'marginBlockEnd',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.MarginBlockEnd>>   >',
          description:
            "Defines the logical block end margin of an element,     which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-end)",
        },
        {
          name: 'marginBlockStart',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.MarginBlockStart>>   >',
          description:
            "Defines the logical block start margin of an element,     which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-start)",
        },
        {
          name: 'marginBottom',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginBottom>>>',
          description:
            'Sets the margin area on the bottom of an element.     A positive value places it farther from its neighbors, while a negative value places it closer. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom)',
        },
        {
          name: 'marginInline',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginInline>>>',
          description:
            "Shorthand CSS property that defines both the logical inline start and end margins of an element,     which maps to physical margins depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline)",
        },
        {
          name: 'marginInlineEnd',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.MarginInlineEnd>>   >',
          description:
            "Defines the logical inline end margin of an element,     which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end)",
        },
        {
          name: 'marginInlineStart',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.MarginInlineStart>>   >',
          description:
            "Defines the logical inline start margin of an element,     which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start)",
        },
        {
          name: 'marginLeft',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginLeft>>>',
          description:
            'Sets the margin area on the left side of an element.     A positive value places it farther from its neighbors, while a negative value places it closer. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left)',
        },
        {
          name: 'marginRight',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginRight>>>',
          description:
            'Sets the margin area on the right side of an element.     A positive value places it farther from its neighbors, while a negative value places it closer. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right)',
        },
        {
          name: 'marginTop',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginTop>>>',
          description:
            'Sets the margin area on the top of an element.     A positive value places it farther from its neighbors, while a negative value places it closer. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)',
        },
        {
          name: 'maxHeight',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MaxHeight>>>',
          description:
            'Sets the maximum height of an element.     It prevents the used value of the height property from becoming larger than the value specified for max-height. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)',
        },
        {
          name: 'maxWidth',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MaxWidth>>>',
          description:
            'Sets the maximum width of an element.     It prevents the used value of the width property from becoming larger than the value specified by max-width. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)',
        },
        {
          name: 'medium',
          isOptional: true,
          type: 'PropertyType',
          description: '',
        },
        {
          name: 'minHeight',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MinHeight>>>',
          description:
            'Sets the minimum height of an element.     It prevents the used value of the height property from becoming smaller than the value specified for min-height. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height)',
        },
        {
          name: 'minWidth',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.MinWidth>>>',
          description:
            'Sets the minimum width of an element.     It prevents the used value of the width property from becoming smaller than the value specified for min-width. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)',
        },
        {
          name: 'opacity',
          isOptional: true,
          type: 'ResponsiveStyle<OpacityKeys<StyleToken<Property.Opacity>>>',
          description:
            'Sets the opacity of an element.     Opacity is the degree to which content behind an element is hidden, and is the opposite of transparency. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)',
        },
        {
          name: 'overflow',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.Overflow>>',
          description:
            "Shorthand CSS property that sets the desired behavior for an element's overflow     — i.e. when an element's content is too big to fit in its block formatting context — in both directions. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)",
        },
        {
          name: 'padding',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Padding>>>',
          description:
            'Shorthand CSS property that sets the padding area on all four sides of an element at once. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)',
        },
        {
          name: 'paddingBlock',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingBlock>>>',
          description:
            "Shorthand CSS property that defines the logical block start and end padding of an element,     which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block)",
        },
        {
          name: 'paddingBlockEnd',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.PaddingBlockEnd>>   >',
          description:
            "Defines the logical block end padding of an element,     which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-end)",
        },
        {
          name: 'paddingBlockStart',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.PaddingBlockStart>>   >',
          description:
            "Defines the logical block start padding of an element,     which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-start)",
        },
        {
          name: 'paddingBottom',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.PaddingBottom>>   >',
          description:
            'Sets the height of the padding area on the bottom of an element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom)',
        },
        {
          name: 'paddingInline',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.PaddingInline>>   >',
          description:
            "Shorthand CSS property that defines the logical inline start and end padding of an element,     which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline)",
        },
        {
          name: 'paddingInlineEnd',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.PaddingInlineEnd>>   >',
          description:
            "Defines the logical inline end padding of an element,     which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end)",
        },
        {
          name: 'paddingInlineStart',
          isOptional: true,
          type: 'ResponsiveStyle<     SpaceKeys<StyleToken<Property.PaddingInlineStart>>   >',
          description:
            "Defines the logical inline start padding of an element,     which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start)",
        },
        {
          name: 'paddingLeft',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingLeft>>>',
          description:
            'Sets the width of the padding area to the left of an element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left)',
        },
        {
          name: 'paddingRight',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingRight>>>',
          description:
            'Sets the width of the padding area on the right of an element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right)',
        },
        {
          name: 'paddingTop',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingTop>>>',
          description:
            'Sets the height of the padding area on the top of an element. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top)',
        },
        {
          name: 'position',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.Position>>',
          description:
            'Sets how an element is positioned in a document.     The top, right, bottom, and left properties determine the final location of positioned elements. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)',
        },
        {
          name: 'right',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Right>>>',
          description:
            'Participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/right)',
        },
        {
          name: 'role',
          isOptional: true,
          type: 'React.AriaRole',
          description:
            'Provides semantic meaning to content, allowing screen readers to support interaction in a way that is consistent with user expectations',
        },
        {
          name: 'rowGap',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.RowGap>>>',
          description:
            'Controls the spacing between Flex/Grid child rows See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)',
        },
        {
          name: 'small',
          isOptional: true,
          type: 'PropertyType',
          description: '',
        },
        {
          name: 'style',
          isOptional: true,
          type: 'React.CSSProperties',
          description:
            'Accepts a JavaScript object with camelCased properties rather than a CSS string.     This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes. See: [React docs](https://reactjs.org/docs/dom-elements.html#style)',
        },
        {
          name: 'testId',
          isOptional: true,
          type: 'string',
          description:
            'Used to provide a &#96;data-testid&#96; attribute for testing purposes',
        },
        {
          name: 'textAlign',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.TextAlign>>',
          description:
            'Sets the horizontal alignment of the content inside a block element or table-cell box.     This means it works like vertical-align but in the horizontal direction. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)',
        },
        {
          name: 'textDecoration',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.TextDecoration>>',
          description:
            'Shorthand CSS property that sets the appearance of decorative lines on text.     It is a shorthand for text-decoration-line, text-decoration-color, text-decoration-style, and the newer text-decoration-thickness property. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)',
        },
        {
          name: 'textTransform',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.TextTransform>>',
          description:
            "Specifies how to capitalize an element's text. It can be used to make text     appear in all-uppercase or all-lowercase, or with each word capitalized. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)",
        },
        {
          name: 'top',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Top>>>',
          description:
            'Participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/top)',
        },
        {
          name: 'transform',
          isOptional: true,
          type: 'ResponsiveStyle<TransformKeys<StyleToken<Property.Transform>>>',
          description:
            'Lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)',
        },
        {
          name: 'transformOrigin',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.TransformOrigin>>',
          description:
            "Sets the origin for an element's transformations. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)",
        },
        {
          name: 'whiteSpace',
          isOptional: true,
          type: 'ResponsiveStyle<StyleToken<Property.WhiteSpace>>',
          description:
            'Sets how white space inside an element is handled. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)',
        },
        {
          name: 'width',
          isOptional: true,
          type: 'ResponsiveStyle<SpaceKeys<StyleToken<Property.Width>>>',
          description:
            "Sets an element's width. By default, it sets the width of the content area,     but if box-sizing is set to border-box, it sets the width of the border area. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/width)",
        },
        {
          name: 'xl',
          isOptional: true,
          type: 'PropertyType',
          description: '',
        },
        {
          name: 'xxl',
          isOptional: true,
          type: 'PropertyType',
          description: '',
        },
      ],
      utilityProps: [],
    },
  ],
};
