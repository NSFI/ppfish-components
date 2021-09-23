import * as React from 'react';
import classNames from 'classnames';

export interface GeneratorProps {
  prefixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void;
    removeSider: (id: string) => void;
  };
}
export const LayoutContext = React.createContext<LayoutContextProps>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
});

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

function generator({ prefixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    const Adapter: React.FC<BasicProps> = props => {
      return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />;
    };
    Adapter.displayName = displayName;
    return Adapter;
  };
}

const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, children, tagName, ...others } = props;
  const classString = classNames(prefixCls, className);
  return React.createElement(tagName, { className: classString, ...others }, children);
};

const BasicLayout: React.FC<BasicPropsWithTagName> = props => {
  const [siders, setSiders] = React.useState<string[]>([]);

  const { prefixCls, className, children, hasSider, tagName: Tag, ...others } = props;
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
    },
    className,
  );

  return (
    <LayoutContext.Provider
      value={{
        siderHook: {
          addSider: (id: string) => {
            setSiders(prev => [...prev, id]);
          },
          removeSider: (id: string) => {
            setSiders(prev => prev.filter(currentId => currentId !== id));
          },
        },
      }}
    >
      <Tag className={classString} {...others}>
        {children}
      </Tag>
    </LayoutContext.Provider>
  );
};

const Layout = generator({
  prefixCls: 'fishd-layout',
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout);

const Header = generator({
  prefixCls: 'fishd-layout-header',
  tagName: 'header',
  displayName: 'Header',
})(Basic);

const Footer = generator({
  prefixCls: 'fishd-layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic);

const Content = generator({
  prefixCls: 'fishd-layout-content',
  tagName: 'main',
  displayName: 'Content',
})(Basic);

export { Header, Footer, Content };

export default Layout;
