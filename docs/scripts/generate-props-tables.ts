import fs from 'fs';
import path from 'path';
import { globbyStream } from 'globby';
import { getAllTypesData, getCatalog, getFrontmatter } from './util';
import type {
  Catalog,
  Category,
  ComponentName,
  Properties,
} from './types/catalog';
import { TypeFileName } from './types/allTypesData';
import { capitalizeString } from '@/utils/capitalizeString';

const catalog = getCatalog();
const { allTypeFilesInterfaceData } = getAllTypesData();

createAllPropsLists();

async function createAllPropsLists() {
  for await (const componentFilepath of globbyStream(
    path.join(
      __dirname,
      '../../docs/src/pages/[platform]/components/*/index.page.mdx'
    )
  )) {
    const regex =
      /src\/pages\/\[platform\]\/components\/(\w*)\/index\.page\.mdx/;
    const componentPageName = (componentFilepath as string).match(
      regex
    )[1] as Lowercase<ComponentName>;
    const componentName = Object.keys(catalog).find(
      (categoryName) =>
        categoryName.toLowerCase() === componentPageName.toLowerCase()
    ) as ComponentName;

    const mainPropsList = createPropsList(catalog, componentName);
    const propsLists = [`${mainPropsList}`];

    const componentsWithChildren: { [key in ComponentName]?: ComponentName[] } =
      {
        Expander: ['ExpanderItem'],
        Menu: ['MenuButton', 'MenuItem'],
        RadioGroupField: ['Radio'],
        Tabs: ['TabItem'],
        Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
        ToggleButton: ['ToggleButtonGroup'],
      };

    if (componentName in componentsWithChildren) {
      componentsWithChildren[componentName].forEach((childName) => {
        propsLists.push(`${createPropsList(catalog, childName)},`);
      });
    }

    if (!mainPropsList) continue;
    const { mdnUrl, htmlElement } = getFrontmatter(componentFilepath as string);

    fs.writeFileSync(
      path.join(
        __dirname,
        '../../docs/src/pages/[platform]/components/',
        `./${componentPageName}/propsData.ts`
      ),
      Output(componentName, propsLists, mdnUrl, htmlElement)
    );
    console.log(`✅ ${componentPageName} Props Tables are updated.`);
  }
}

type CategoryProperty = { [key in Category]: Properties };
type SortedPropertiesByCategory = { [key: string]: Properties }[];
type PropertiesByCategory = Record<Category, Properties>;

function Output(displayName, propsLists, mdnUrl, htmlElement) {
  return `
{/* DO NOT EDIT DIRECTLY */}
{/* This file is autogenerated by "docs/scripts/generate-props-tables.ts" script. */}
export const propsData = {  
    displayName: "${displayName}",
    mdnUrl: "${mdnUrl}",
    htmlElement: "${htmlElement}",
    propsLists: [${propsLists}]
}`;
}

function getUtilityPropsList(
  propsSortedByCategory: SortedPropertiesByCategory,
  componentName: ComponentName
) {
  const utilityProps = (categoryProperty: CategoryProperty): string => {
    const title = Object.keys(categoryProperty)[0];
    const props = getPropItems(categoryProperty[title]);
    return `
{
  name: "${title === 'Layout' ? title : componentName}",
  utilityProps: [${props}]
}`;
  };

  return `${propsSortedByCategory.map(utilityProps).join('')}`;
}

function formatString(string: string) {
  const formattedString = string
    .replace(/\n/g, ' ')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');
  return formattedString;
}

function getPropItems(properties: Properties) {
  const propItems = Object.entries(properties)
    .sort(([propNameA], [propNameB]) => propNameA.localeCompare(propNameB))
    .map(([propName, { name, type, description, isOptional }]) => {
      type = type.replace(/\n/g, ' ');
      return `
{
  name: "${name}",
  isOptional: ${isOptional},
  type: "${formatString(type)}",
  description: "${formatString(description)}"
},`;
    });

  return `${propItems.join('')}`;
}

function createPropsList(catalog: Catalog, componentName: ComponentName) {
  const properties = catalog[componentName];

  const propsSortedByCategory = getPropsSortedByCategory(
    properties,
    componentName
  );

  if (!propsSortedByCategory) {
    throw new Error(`❗️ Not generating props table for ${componentName}`);
  }

  const mainProps = getPropItems(Object.values(propsSortedByCategory[0])[0]);

  const utilityProps = getUtilityPropsList(
    propsSortedByCategory.slice(1),
    componentName
  );

  return `
{ 
  name: '${componentName}',
  props: [${mainProps}
  ],
  utilityProps: [${utilityProps}
  ]
}
`;
}

function getPropsSortedByCategory(
  properties: Properties,
  componentName: ComponentName
): SortedPropertiesByCategory {
  if (properties) {
    let propertiesByCategory: PropertiesByCategory =
      getPropertiesByCategory(componentName);

    const allTableCategories: {
      [key in 'Main' | 'Layout']: Category[];
    } = {
      Main: ['BaseComponentProps'],
      Layout: [
        'CSSLayoutStyleProps',
        'FlexContainerStyleProps',
        'FlexItemStyleProps',
        'GridContainerStyleProps',
        'GridItemStyleProps',
      ],
    };

    const isPropMainCategory = (category) => {
      const isCurrentComponentProp = category
        .toLowerCase()
        .includes(componentName.toLowerCase());
      const isPropsOrOptions = category.toLowerCase().match(/props|options/);
      const isSharedBasicCategory = Object.values(allTableCategories).find(
        (propArr) => propArr.includes(category)
      );
      const isBaseStyleProps = category === 'BaseStyleProps';
      const isAriaProps = category === 'AriaProps';

      return (
        isCurrentComponentProp ||
        (isPropsOrOptions &&
          !isSharedBasicCategory &&
          !isBaseStyleProps &&
          !isAriaProps)
      );
    };

    allTableCategories.Main = [
      ...allTableCategories.Main,
      ...Object.keys(propertiesByCategory).filter(isPropMainCategory),
    ] as Category[];

    return Object.keys(allTableCategories)
      .map((category) => {
        switch (category) {
          case 'Main':
            return {
              Main: combineCategories(
                propertiesByCategory,
                allTableCategories.Main
              ),
            };
          case 'Layout':
            return {
              Layout: combineCategories(
                propertiesByCategory,
                allTableCategories.Layout
              ),
            };
          case 'Styling':
            return {
              Styling: combineCategories(propertiesByCategory, [
                'BaseStyleProps',
              ]),
            };
          default:
            break;
        }
      })
      .filter((v) => Object.values(Object.values(v)[0])[0]);
  } else {
    throw new Error(` 🫥  ${componentName} doesn't have any type properties.`);
  }
}

function combineCategories(propertiesByCategory, toBeCombined: Category[]) {
  return toBeCombined.reduce(
    (acc, category) => ({
      ...acc,
      ...propertiesByCategory[category],
    }),
    {}
  );
}

function getPropertiesByCategory(
  componentName: ComponentName
): PropertiesByCategory {
  let propertiesByCategory: PropertiesByCategory = {} as PropertiesByCategory;

  /**
   * Some special components don't have accurate properties generated from getCatalog, so we have to manually point it to AllTypesData as well in addition to the Catalog.
   * First element is the component's name
   */
  const specialComponents: { [key in string]: TypeFileName[] } = {
    View: ['View', 'Base', 'Style'],
    TextField: ['TextField', 'TextArea', 'Input', 'Field'],
  };

  for (const propertyName in catalog[componentName]) {
    const property = catalog[componentName][propertyName];
    propertiesByCategory = {
      ...propertiesByCategory,
      [property.category]: {
        ...propertiesByCategory[property.category],
        [propertyName]: property,
      },
    };
  }
  if (Object.keys(specialComponents).includes(componentName)) {
    propertiesByCategory = {
      ...propertiesByCategory,
      [componentName]: {
        ...propertiesByCategory[componentName],
        ...getPropertiesFromAllTypeData(specialComponents[componentName]),
      },
    };
  }
  return propertiesByCategory;
}

function getPropertiesFromAllTypeData(sourceTypes: TypeFileName[]) {
  let targetProps: Properties;

  sourceTypes.forEach((type) => {
    if (!allTypeFilesInterfaceData.get(type)) return;
    for (const [propName, property] of allTypeFilesInterfaceData
      .get(type)
      .entries()) {
      targetProps = {
        ...targetProps,
        [propName]: {
          name: String(property.get('name')),
          type: String(property.get('type')),
          description: property.get('description')
            ? Object.entries(property.get('description'))
                .map(
                  ([tag, tagText]) =>
                    `${
                      ['description', 'deprecated'].includes(tag)
                        ? ''
                        : `${capitalizeString(tag)}: `
                    }${tagText}`
                )
                .join(' ')
            : '',
          category: property.get('category') as Category,
          isOptional: property.get('isOptional') as boolean,
        },
      };
    }
  });
  return targetProps;
}
