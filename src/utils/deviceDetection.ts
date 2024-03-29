/**
 * Determines if the user agent matches a given pattern.
 * @param matcher The pattern to match
 */
const matchUserAgent = (matcher: {
  [Symbol.match](string: string): RegExpMatchArray;
}): boolean => {
  const match = navigator.userAgent.match(matcher);
  return match && match.length !== 0;
};

/**
 * Is the used device an android ?
 */
const isAndroid = (): boolean => matchUserAgent(/Android/i);
/**
 * Is the used device a blackberry ?
 */
const isBlackBerry = (): boolean => matchUserAgent(/BlackBerry/i);
/**
 * Is the used device an apple mobile device ?
 */
const isiOS = (): boolean => matchUserAgent(/iPhone|iPad|iPod/i);
/**
 * Is the used device using opera for mobile devices ?
 */
const isOpera = (): boolean => matchUserAgent(/Opera Mini/i);
/**
 * Is the used device using IE for mobile devices ?
 */
const isWindows = (): boolean => matchUserAgent(/IEMobile/i);

/**
 * Is the used device mobile ?
 * Does not cover every case.
 */
export const isMobile = (): boolean => {
  return isAndroid() || isBlackBerry() || isiOS() || isOpera() || isWindows();
};

// Documentation: https://github.com/hgoebl/mobile-detect.js/blob/master/mobile-detect.js
// or https://github.com/mrdoob/system.js/blob/master/src/System.js
