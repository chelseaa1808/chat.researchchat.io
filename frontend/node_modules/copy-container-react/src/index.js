"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _highlight = _interopRequireDefault(require("highlight.js"));
require("highlight.js/styles/stackoverflow-dark.css");
require("./CopyContainer.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let check = /*#__PURE__*/_react.default.createElement("svg", {
  className: "check h-[50%]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#D9D9E3",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/_react.default.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
let clipboard = /*#__PURE__*/_react.default.createElement("svg", {
  className: "clipboard inline-block h-[50%]",
  stroke: "#D9D9E3",
  fill: "none",
  strokeWidth: "2",
  viewBox: "0 0 24 24",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/_react.default.createElement("path", {
  d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
}), /*#__PURE__*/_react.default.createElement("rect", {
  x: "8",
  y: "2",
  width: "8",
  height: "4",
  rx: "1",
  ry: "1"
}));
function Text(props) {
  var codeRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (props.highlight) {
      _highlight.default.highlightBlock(codeRef.current);
      let result = _highlight.default.highlightAuto(codeRef.current.textContent);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement("pre", {
    className: "text-body rounded-b-md"
  }, /*#__PURE__*/_react.default.createElement("code", {
    ref: codeRef,
    className: "rounded-b-md language-".concat(props.lang)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "p-[12px] rounded-b-md inner"
  }, props.children)));
}
function CopyContainer(props) {
  var [copyToggle, setCopyToggle] = (0, _react.useState)(false);
  function handleChangeType(event) {
    setType(event.target.value);
  }
  function handleChangeOs(event) {
    setOs(event.target.value);
  }
  var handleChangeLang = event => {
    setLang(event.target.value);
  };
  function copyCode() {
    navigator.clipboard.writeText(props.children);
    setCopyToggle(true);
    setTimeout(() => {
      setCopyToggle(false);
    }, 2000);
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "rounded-b"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "top-bar flex justify-between bg-[#343541]  rounded-t-md h-[40px] px-[16px]"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-center text-[#D9D9E3]"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-lang"
  }, props.lang)), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-copy flex items-center hover:cursor-pointer gap-[5px] text-[12px]",
    onClick: copyCode
  }, copyToggle ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, check, /*#__PURE__*/_react.default.createElement("div", {
    className: " flex items-center justify-center text-[#D9D9E3]"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-copy"
  }, props.copiedText))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, clipboard, /*#__PURE__*/_react.default.createElement("div", {
    className: "copy-text flex items-center justify-center text-[#D9D9E3]"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-copy"
  }, props.copyText))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "rounded-b-md overflow-hidden"
  }, /*#__PURE__*/_react.default.createElement(Text, {
    lang: props.lang,
    highlight: props.highlight
  }, props.children))));
}
CopyContainer.defaultProps = {
  lang: '',
  highlight: true,
  copyText: 'Copy Code',
  copiedText: 'Copied!'
};
var _default = CopyContainer;
exports.default = _default;
