# Introduction
Use this component to display code with syntax highlighting and a clipboard users can click to copy the code to their clipboard. The design is based on OpenAI's component in ChatGPT, and can be styled further.

The component can also be used to display text without syntax highlighting.

# How it looks
![basic](https://github.com/adam-zakaria/try/blob/main/screenshots/smaller/basic.png?raw=true)
![difftheme](https://github.com/adam-zakaria/try/blob/main/screenshots/smaller/different_theme.png?raw=true)
![text](https://github.com/adam-zakaria/try/blob/main/screenshots/smaller/text.png?raw=true)


# Usage
```javascript
import { CopyContainer } from 'copy-container-react'

function App(){
  return(
    <CopyContainer lang='python'>
{`import requests
from bs4 import BeautifulSoup

def crawl(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    for title in soup.find_all('h2'):  # assuming titles are within h2 tags
        print(title.get_text())

crawl('http://www.blogsite.com')
`}
  </CopyContainer>
  ) 
} 
```

Your text needs to be within braces (to embed JS in JSX) within grave accent marks (to start a multiline string) and needs to be a child of CopyContainer, as shown above. Spacing (tabs, index, new lines, etc.) in the multi-line string is preserved. It would be nice if the pasted text could start on the line *after* the grave accent so it would look nice in the code, but an extra new line would appear in your UI. The existing solution is likely the best we can do :)

All props can be omitted. Here's an example which uses all the props:
```javascript
import { CopyContainer } from 'copy-container-react'

function App(){
  return(
    <CopyContainer lang='python' highlight={true} copyText='Copy :)' copiedText='Yay :)'>
{`import requests
from bs4 import BeautifulSoup

def crawl(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    for title in soup.find_all('h2'):  # assuming titles are within h2 tags
        print(title.get_text())

crawl('http://www.blogsite.com')
`}
  </CopyContainer>
  ) 
} 
```


# Props

| Name  | Type  | Default | Required | Description |
|-------|-------|---------|----------|-------------|
| `lang` | String |  `''` | No  | Display the a string in the top left corner and pass the language to highlight.js so it doesn't need to guess. |
| `highlight` | Boolean |  `true`  | No | Enable syntax highlighting. |
| `copyText` | String | `Copy Code` | No | Text beside the clipboard before it is clicked. |
| `copiedText` | String | `Copied!` | No | Text beside the clipboard after it is clicked. |

# Choose a syntax highlighting style
To use a different style from the default, import one from this link:
https://github.com/highlightjs/highlight.js/tree/main/src/styles
like so:
```css
import 'highlight.js/styles/a11y-light.css';
```
Syntax highlighting styles and overriding CSS will likely interfere with each other so be careful if you choose to do both.

# Override CSS
Use the following classes in your own css to style parts of the UI.
```css
.text-lang{}, .text-copy{}, .top-bar{}, .code-body{}, .check{}, .clipboard{}
```

Let me know if anything should be added. If you want to style an element yourself you could use devtools to figure out a css selector.

Here's an example of the CSS used for the screenshot with the green top bar in the 'How it looks' section:

```css
.clipboard{
  stroke: #C71585;
}
.top-bar{
  background-color: #3CB371;
}
.text-body{
  background-color: whitesmoke;
}
```

# Additional information
The syntax highlighting library used by this component is highlight.js and the style is stackoverflow-dark.css. Highlight.js tries to automatically detect the programming language of the code, but it hasn't been correct in my experience, though I could be doing something wrong and appreciate their library very much. See their docs for more information (you can examine the highlightjs object to see confidence scores the library gives for its predictions).

# Contact
Please open an issue on github or email adam.p.zakaria at gmail dot com with any questions or comments :)
