import zh_CN from "./zh_CN";
import en_US from './en_US';


type keyString = {
  [propName: string]: string,
}


export interface LocaleProperties {
  locale: string,
  AudioPlayer?: keyString,
  AutoComplete?: keyString,
  Cascader?: keyString,
  global?: keyString,
  Table?: keyString,
  Modal?: keyString,
  RichEditor?: keyString,
  Pagination?: keyString,
  VideoViewer?: keyString,
};

const Locale = {
  zh_CN,
  en_US
}

export default Locale