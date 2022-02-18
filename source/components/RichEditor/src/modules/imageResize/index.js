import './assets/resize.css'

import Resize from './QuillResize'
import { Image } from './formats/image'
import PlaceholderRegister from './formats/placeholder'

// note: 后面还可以加上视频文件的缩放, 现在未开放, 功能里有

export {
  EmbedPlaceholder,
  TagPlaceholder,
  ClassNamePlaceholder,
  convertPlaceholderHTML
} from './formats/placeholder'

export default Resize
export { Resize, Image, PlaceholderRegister }
