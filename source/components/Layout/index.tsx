import InternalLayout, { BasicProps, Content, Footer, Header } from './Layout';
import Sider from './Sider';
import './style/index.less';

export type LayoutProps = BasicProps;

export { SiderProps } from './Sider';

interface LayoutType extends React.FC<BasicProps> {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
