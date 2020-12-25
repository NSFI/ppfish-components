import zh_CN from "./zh_CN";
import en_US from './en_US';


type keyStringObj = {
  [propName: string]: string | object,
}


export interface LocaleProperties {
  locale: string,
  global?: keyStringObj,
  Table?: keyStringObj,
  Modal?: keyStringObj,
  Form?: keyStringObj & {
    defaultValidateMessages: keyStringObj,
  }
};

const Locale = {
  zh_CN,
  en_US
}

export default Locale