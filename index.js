
/**
 * Module dependencies.
 */

var url = require('url');
var event = require('event');
var closest = require('closest');

/**
 * Handle link delegation on `el` or the document,
 * and invoke `fn(e, anchor)` when clickable.
 *
 * @param {Element|Function} el or fn
 * @param {Function} [fn]
 * @api public
 */

module.exports = function(el, fn){
  // default to document
  if ('function' == typeof el) {
    fn = el;
    el = document;
  }

  event.bind(el, 'click', function(e){
    if (clickable(e)) {
      var a = closest(e.target, 'a', true);
      if (a && !a.target && !url.isCrossDomain(a.href)) fn(e, a);
    }
  });
};

/**
 * Check if `e` is clickable.
 */

function clickable(e) {
  if (1 != which(e)) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
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
