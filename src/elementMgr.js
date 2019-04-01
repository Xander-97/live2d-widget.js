/**
 * @description The container and manager for all the DOM and WebGL emelents.
 */


import { config } from './config/configMgr';
import htmlTemplate from './tmplate/innerHTML';

/**
 * The current WebGL element
 * @type {RenderingContext}
 */

let currWebGL = undefined;

/**
 * The current canvas element
 * @type {HTMLElement}
 */

let currCanvas;

/**
 * Create the canvas and styles using DOM
 * @return {null}
 */

function createElement() {

  let e = document.getElementById(config.name.div)
  if (e !== null) {
    document.body.removeChild(e);
  }

  let newElem = document.createElement('div');
  newElem.id = config.name.div;
  newElem.innerHTML = htmlTemplate;
  let newCanvasElem = document.createElement('canvas');
  newCanvasElem.setAttribute('id', config.name.canvas);
  newCanvasElem.setAttribute('width', config.display.width * config.display.superSample);
  newCanvasElem.setAttribute('height', config.display.height * config.display.superSample);
  newCanvasElem.style.setProperty('position', 'fixed');
  newCanvasElem.style.setProperty('width', config.display.width + 'px');
  newCanvasElem.style.setProperty('height', config.display.height + 'px');
  newCanvasElem.style.setProperty('opacity', config.react.opacityDefault);
  newCanvasElem.style.setProperty(config.display.position, config.display.hOffset + 'px');
  newCanvasElem.style.setProperty('bottom', config.display.vOffset + 'px');
  newCanvasElem.style.setProperty('z-index', 99999);
  newCanvasElem.style.setProperty('pointer-events', 'none');
  if (config.dev.border) newCanvasElem.style.setProperty('border', 'dashed 1px #CCC');
  newElem.appendChild(newCanvasElem);

  document.body.appendChild(newElem);
  currCanvas = document.getElementById(config.name.canvas);

  initWebGL();

}

/**
 * Find and set the current WebGL element to the container
 * @return {null}
 */

function initWebGL() {

  var NAMES = ['webgl2', 'webgl', 'experimental-webgl2', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  for (let i = 0; i < NAMES.length; i++) {
    try {
      let ctx = currCanvas.getContext(NAMES[i], {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        failIfMajorPerformanceCaveat: false,
      });
      if (ctx) currWebGL = ctx;
    } catch (e) { }
  }
  if (!currWebGL) {
    console.error('Live2D widgets: Failed to create WebGL context.');
    if (!window.WebGLRenderingContext) {
      console.error('Your browser may not support WebGL, check https://get.webgl.org/ for futher information.');
    }
    return;
  }
};


export {
  createElement,
  currWebGL,
  currCanvas,
}
