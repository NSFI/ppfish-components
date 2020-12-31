import zh_CN from "./zh_CN";
import en_US from './en_US';


type keyStringObj = {
  [propName: string]: string | object,
}
type keyString = {
  [propName: string]: string,
}

export interface LocaleProperties {
  locale: string;
  AudioPlayer?: keyStringObj;
  AutoComplete?: keyStringObj;
  Cascader?: keyStringObj;
  global?: keyStringObj;
  Table?: keyString;
  Modal?: keyStringObj;
  Form?: keyStringObj & {
    defaultValidateMessages: keyStringObj;
  };
  Spin?: keyStringObj;
  Select?: keyString;
  Transfer?: keyStringObj;
  TreeSelect?: keyStringObj;
  Upload?: keyStringObj;
};

const Locale = {
  zh_CN,
  en_US
}

export default Locale