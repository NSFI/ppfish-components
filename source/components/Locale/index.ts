import zh_CN from "./zh_CN";
import en_US from './en_US';


type keyStringObj = {
  [propName: string]: string | object,
}


export interface LocaleProperties {
  locale: string,
  AudioPlayer?: keyStringObj,
  AutoComplete?: keyStringObj,
  Cascader?: keyStringObj,
  global?: keyStringObj,
  Table?: keyStringObj,
  Modal?: keyStringObj,
  Form?: keyStringObj & {
    defaultValidateMessages: keyStringObj,
  },
  Transfer?: keyStringObj,
  TreeSelect?: keyStringObj,
  Upload?: keyStringObj,
};

const Locale = {
  zh_CN,
  en_US
}

export default Locale