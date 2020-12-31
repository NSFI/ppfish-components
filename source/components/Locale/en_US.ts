import { LocaleProperties } from '.';

const LocaleValue: LocaleProperties = {
  locale: 'en_US',
  AudioPlayer: {
    notSupport: 'Your browser does not support the audio tag'
  },
  AutoComplete: {
    notFoundContent: 'No data'
  },
  Cascader: {
    placeholder: 'Please select',
    notFoundContent: 'No data'
  },
   LoadMore: {
    defaultText: 'Show More',
    loadingText: 'Loading',
    errorText: 'Failed to load. Please try again',
    endText: 'No data',
  },
  Table: {
    filterTitle: 'filters', 
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    emptyText: 'No data',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
    selectionAll: 'Select all data',
    sortTitle: 'Sort',
    expand: 'Expand row',
    collapse: 'Collapse row',
    triggerDesc: 'Click to sort descending',
    triggerAsc: 'Click to sort ascending',
    cancelSort: 'Click to cancel sorting',
    modalTitle: 'Select the data item to be displayed',
    defaultOptionTitle: 'Default display data items',
    okText: 'OK',
    cancelText: 'Cancel',
  },
  List: {
    emptyText: 'No Data'
  },
  Guide: {
    prevBtnText: 'Prev',
    nextBtnText: 'Next',
    doneBtnText: 'Got It',
    skipBtnText: 'Skip',
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
  },
  Spin: {
    loading: 'Loading...',
  },
  Select: {
    errorMessage: 'Option limit exceeded',
    multipleSelectAllText: 'All select',
    notFoundContent: 'No data',
    placeholder: 'Please select',
    searchPlaceholder: 'Please enter keyword',
    selectAllText: 'Select All',
    confirmText: 'OK',
    cancelText: 'Cancel',
    loading: 'Loading...'
  },
  Transfer: {
    notFoundContent: 'No Data',
    sourceNotFoundContent: 'No Data',
    targetNotFonudContent: 'No Data',
    searchPlaceholder: 'Search here',
  },
  TreeSelect: {
    placeholder: 'Please select',
    searchPlaceholder: 'Search here',
    treeNodeResetTitle: 'Do not select any category',
    notFoundContent: 'No Data',
    okText: 'Ok',
    cancelText: 'Cancel',
  },
  Upload: {
    uploading: 'Uploading',
    removeFile: 'Remove',
    uploadError: 'UploadError',
    previewFile: 'Preview',
    cancelText: 'Cancel',
    deleteText: 'DeleteAll',
    uploadedTip: '${length} item uploaded'
  },
};

export default LocaleValue;
