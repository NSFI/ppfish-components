import { LocaleProperties } from '.';

const LocaleValue: LocaleProperties = {
  locale: 'en_US',
  AudioPlayer: {
    notSupport: 'Your browser does not support the audio tag',
  },
  AutoComplete: {
    notFoundContent: 'No data',
  },
  Cascader: {
    placeholder: 'Please select',
    notFoundContent: 'No data',
  },
  Table: {
    filterTitle: 'filters',
  },
  Modal: {
    okText: 'ok',
    cancelText: 'cancel',
  },
  Pagination: {
    items_per_page: '/ page',
    jump_to: 'Go to',
    jump_to_confirm: 'confirm',
    page: '',

    // Pagination.jsx
    prev_page: 'Previous Page',
    next_page: 'Next Page',
    prev_5: 'Previous 5 Pages',
    next_5: 'Next 5 Pages',
    prev_3: 'Previous 3 Pages',
    next_3: 'Next 3 Pages'
  },
  VideoViewer: {
    fullScreen: 'fullScreen',
    cancelFullScreen: 'cancelFullScreen',
    download: 'download',
    retry: 'retry'
  }
}

export default LocaleValue;