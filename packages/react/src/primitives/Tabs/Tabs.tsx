import classNames from 'classnames';
import * as RadixTabs from '@radix-ui/react-tabs';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { TabsProps, TabsSpacing, TabItemProps, Primitive } from '../types';
import { View } from '../View';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR),
// the module will be imported as CommonJS module, in which we have to reference the `default`
let sanitizedRadixTabs = { default: undefined, ...RadixTabs };
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
sanitizedRadixTabs = sanitizedRadixTabs.default ?? sanitizedRadixTabs;
const { Root, List, Trigger: RadixTab, Content: Panel } = sanitizedRadixTabs;

/**
 * `TabItemProps` does not include HTML data attributes, so `data-spacing` is added explicitly
 * to the props of the return type of `isExtendedTabItem` to allow passing of `data-spacing`
 * to `TabsItem` from inside `Tabs`.
 * 
 * Additionally, `value` is avaialble on the props of `TabItemPrimitive`, but is not present
 * on `TabItemProps`. To mitigate this issue prefer usage of the props of `TabItemPrimitive`
`*/
type ExtendedTabItemProps = Parameters<typeof TabItemPrimitive>[0] & {
  'data-spacing': TabsSpacing;
};

const isExtendedTabItem = (
  child: React.ReactFragment | React.ReactChild | React.ReactPortal
): child is React.ReactElement<ExtendedTabItemProps> =>
  React.isValidElement<TabItemProps>(child);

const TabsPrimitive: Primitive<TabsProps, typeof Flex> = (
  {
    ariaLabel,
    children,
    className,
    defaultIndex = 0,
    currentIndex,
    onChange,
    indicatorPosition,
    spacing,
    ...rest
  }: TabsProps,
  ref
) => {
  // mapping our props to Radix's props
  // value (currentIndex) and defaultValue (defaultIndex) must be strings
  // https://www.radix-ui.com/docs/primitives/components/tabs#api-reference
  const rootProps = {
    defaultValue: defaultIndex.toString(),
    // only pass value/currentIndex prop if it is defined
    value: currentIndex != null ? currentIndex.toString() : undefined,
    onValueChange: onChange,
  };

  // Remove null or undefined children or else they will mess up the index
  // This is an issue when using defaultIndex
  const nonNullChildren = React.Children.toArray(children).filter(
    (child) => !!child
  );

  return (
    <Root {...rootProps}>
      <List aria-label={ariaLabel}>
        <Flex
          className={classNames(ComponentClassNames.Tabs, className)}
          data-indicator-position={indicatorPosition}
          ref={ref}
          {...rest}
        >
          {React.Children.map(nonNullChildren, (child, index) => {
            if (isExtendedTabItem(child)) {
              return React.cloneElement(child, {
                'data-spacing': spacing,
                key: index,
                value: `${index}`,
              });
            }
          })}
        </Flex>
      </List>
      {React.Children.map(nonNullChildren, (child, index) => {
        if (isExtendedTabItem(child)) {
          return (
            <Panel key={index} value={`${index}`}>
              {child.props.children}
            </Panel>
          );
        }
      })}
    </Root>
  );
};

const TabItemPrimitive: Primitive<TabItemProps, 'button'> = (
  { className, title, ...rest },
  ref
) => (
  <View
    as={RadixTab}
    className={classNames(ComponentClassNames.TabItems, className)}
    ref={ref}
    {...rest}
  >
    {title}
  </View>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const Tabs = React.forwardRef(TabsPrimitive);
export const TabItem = React.forwardRef(TabItemPrimitive);

Tabs.displayName = 'Tabs';
TabItem.displayName = 'TabItem';
