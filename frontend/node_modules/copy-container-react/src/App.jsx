import React, { useEffect, useRef } from 'react';
import CopyContainer from './CopyContainer';
import './App.css'

function App(){
  return(
    <CopyContainer lang='python' highlight={true} copyText='' copiedText=''>
{`import requests
from bs4 import BeautifulSoup
  for title in soup.find_all('h2'):  # assuming titles are within h2 tags
      print(title.get_text())

crawl('http://www.blogsite.com')
`}
  </CopyContainer>
  ) 
}

export default App;
