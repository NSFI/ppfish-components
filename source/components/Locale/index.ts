import zh_CN from "./zh_CN";
import en_US from './en_US';
import zh_TW from './zh_TW';


type keyString = {
  [propName: string]: string,
}

type keyStringObj = {
  [propName: string]: string | object,
}

export interface LocaleProperties {
  locale: string,
  LoadMore?: keyString,
  AudioPlayer?: keyString;
  AutoComplete?: keyString;
  Cascader?: keyString;
  global?: keyString;
  Table?: keyString;
  Modal?: keyString;
  Guide?: keyString,
  List?: keyString,
  DatePicker?: keyStringObj,
  Spin?: keyString;
  RichEditor?: keyString,
  Pagination?: keyString,
  VideoViewer?: keyString,
  Select?: keyString;
  Transfer?: keyString;
  TreeSelect?: keyString;
  Upload?: keyString;
};

const Locale = {
  zh_CN,
  en_US,
  zh_TW,
}

export default Locale
