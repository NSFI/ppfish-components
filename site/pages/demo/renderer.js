import marked from 'marked';

const renderer = new marked.Renderer();

renderer.table = (header, body) => {
  return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
};
renderer.listitem = function (text) {
  return '<li class="md-listitem">' + text + '</li>\n';
};
renderer.paragraph = function (text) {
  return '<p class="md-paragraph">' + text + '</p>\n';
};
renderer.heading = function (text, level, raw) {
  if (this.options.headerIds) {
    let id = text;
    // h1
    if (level === 1) {
      const textId = text.replace(/【(.+)】/, '');
      id = textId === text ? text : textId;
      text = text.replace(/【(.+)】/, function (ownerList) {
        return `<div class="md-owner"><div class="owner-title"><i class="fishdicon fishdicon-user-line"></i></div><ul class="owner-list">${ownerList.slice(1, -1).split('|').map(owner => `<li class="item">${owner}</li>`).join('')}</ul></div>`;
      });
    }
    return '<h' + level + ' id="' + id + '" class="md-heading">' + text + '</h' + level + '>\n';
  }
  // ignore IDs
  return '<h' + level + ' class="md-heading" >' + text + '</h' + level + '>\n';
};

export default renderer;
