import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyCodeBlock from "./CodeBlock";
import { formatCode } from "@/utils/formatCode";

interface MarkdownWrapperProps {
  text: string;
}

const CustomVscDarkPlus = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    padding: "0 0 0 0",
  },
};

const MarkdownWrapper: React.FC<MarkdownWrapperProps> = ({ text }) => {
  const [formattedMarkdown, setFormattedMarkdown] = useState(text);

  useEffect(() => {
    const reformatMarkdown = async () => {
      const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
      const matches = [...text.matchAll(codeBlockRegex)];

      if (matches.length === 0) {
        setFormattedMarkdown(text);
        return;
      }

      let updatedMarkdown = text;

      for (const match of matches) {
        const [fullMatch, lang, code] = match;
        const formatted = await formatCode(code, lang);
        updatedMarkdown = updatedMarkdown.replace(fullMatch, `\`\`\`${lang}\n${formatted}\`\`\``);
      }

      setFormattedMarkdown(updatedMarkdown);
    };

    reformatMarkdown();
  }, [text]);

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match?.[1] || "";

          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={CustomVscDarkPlus}
              language={language}
              useInlineStyles={true}
              CodeTag={CopyCodeBlock}
              codeTagProps={{ language }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {formattedMarkdown}
    </ReactMarkdown>
  );
};

export default MarkdownWrapper;
