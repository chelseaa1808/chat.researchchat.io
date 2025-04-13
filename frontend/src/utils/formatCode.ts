import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";

export async function formatCode(code: string, language: string): Promise<string> {
  const parser = ["ts", "tsx", "typescript"].includes(language)
    ? "typescript"
    : "babel";

  try {
    return await prettier.format(code, {
      parser,
      plugins: [parserBabel, parserTypescript],
    });
  } catch (err) {
    console.warn("Prettier failed to format:", err);
    return code;
  }
}