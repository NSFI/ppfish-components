// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
export const getInternetExplorerVersion = () => {
  let rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer') {
    let ua = navigator.userAgent;
    let re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
};
export const isWebkit = () => {
  const agent = navigator.userAgent.toLowerCase();
  const index = agent.indexOf('chrome/');
  const version = parseInt(agent.slice(index + 7, index + 9));
  if (index > 0 && version >= 50) {
    return true;
  } else {
    return false;
  }
};
