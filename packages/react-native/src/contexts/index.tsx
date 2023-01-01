import React, { createContext, ReactNode, useContext } from 'react';

export type ClipboardModule = {
  getString: () => Promise<string>;
  setString: (value: string) => Promise<void>;
};

type ModuleContextType = {
  Clipboard?: ClipboardModule | null;
};

type Modules = ModuleContextType;

const ModuleContext = createContext<ModuleContextType | null>(null);

export const ModuleProvider = ({
  children,
  modules,
}: {
  children: ReactNode;
  modules: Modules;
}): JSX.Element => {
  return (
    <ModuleContext.Provider value={modules}>{children}</ModuleContext.Provider>
  );
};

export const useModules = (): ModuleContextType | null => {
  const context = useContext(ModuleContext);
  return context;
};

export const useModule = (
  name: keyof ModuleContextType
): ModuleContextType[keyof ModuleContextType] | null => {
  return useModules()?.[name];
};
