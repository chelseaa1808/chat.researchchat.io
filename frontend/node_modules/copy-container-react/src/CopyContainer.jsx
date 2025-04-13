import { useState } from 'react'
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-dark.css';
import './CopyContainer.css'
let check =
  <svg className='check h-[50%]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D9D9E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
let clipboard =
  <svg className='clipboard inline-block h-[50%]' stroke="#D9D9E3" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>




function Text(props) {
  var codeRef = useRef();

  useEffect(() => {
    if (props.highlight) {
      hljs.highlightBlock(codeRef.current);
      let result = hljs.highlightAuto(codeRef.current.textContent);
    }
  }, []);

  return (
    <pre className='text-body rounded-b-md'>
      <code ref={codeRef} className={`rounded-b-md language-${props.lang}`}>
        <div className='p-[12px] rounded-b-md inner'>
          {props.children}
        </div>
      </code>
    </pre>
  );
}

function CopyContainer(props) {
  var [copyToggle, setCopyToggle] = useState(false)

  function handleChangeType(event) {
    setType(event.target.value);
  }

  function handleChangeOs(event) {
    setOs(event.target.value);
  }

  var handleChangeLang = (event) => {
    setLang(event.target.value);
  };

  function copyCode() {
    navigator.clipboard.writeText(props.children)
    setCopyToggle(true);
    setTimeout(() => {
      setCopyToggle(false);
    }, 2000);
  }

  return (
    <>
      <div className='rounded-b'>
        <div className='top-bar flex justify-between bg-[#343541]  rounded-t-md h-[40px] px-[16px]'>
          <div className='flex items-center justify-center text-[#D9D9E3]'><p className='text-lang'>{props.lang}</p>
          </div>
          <div className='text-copy flex items-center hover:cursor-pointer gap-[5px] text-[12px]' onClick={copyCode}>
            {copyToggle ?

              <>
                {check}
                <div className=' flex items-center justify-center text-[#D9D9E3]'><p className='text-copy'>{props.copiedText}</p>
                </div>
              </>
              :
              <>
                {clipboard}
                <div className='copy-text flex items-center justify-center text-[#D9D9E3]'><p className='text-copy'>{props.copyText}</p>
                </div>
              </>
            }
          </div>

        </div>
        <div className='rounded-b-md overflow-hidden'>
          <Text lang={props.lang} highlight={props.highlight}>
            {props.children}
          </Text>
        </div>
      </div>
    </>
  );
}
CopyContainer.defaultProps = { lang: '', highlight: true, copyText: 'Copy Code', copiedText: 'Copied!' }

export default CopyContainer;