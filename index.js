
/**
 * Module dependencies.
 */

var delegate = require('delegate');
var url = require('url');

/**
 * Handle link delegation on `el` or the document,
 * and invoke `fn(e)` when clickable.
 *
 * @param {Element|Function} el or fn
 * @param {Function} [fn]
 * @api public
 */

module.exports = (el, fn) => {
  // default to document
  if ('function' == typeof el) {
    fn = el;
    el = document;
  }

  var token = delegate.bind(el, 'a', 'click', e => {
    if (clickable(e)) fn(e);
  });

  return () => {
    delegate.unbind(el, 'click', token);
  };
};

/**
 * Check if `e` is clickable.
 */

function clickable(e) {
  if (1 != which(e)) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;

  // target
  var el = e.target;

  // check target
  if (el.target) return;

  // x-origin
  if (url.isCrossDomain(el.getAttribute('href'))) return;

  return true;
}

/**
 * Event button.
 */

function which(e) {
  e = e || window.event;
  return null == e.which
    ? e.button
    : e.which;
}
