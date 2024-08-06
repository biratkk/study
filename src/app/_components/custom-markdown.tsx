import ReactMarkdown from "react-markdown";

export default function CustomMarkdown({ children }: { children: string }) {
  return <ReactMarkdown components={{
    h1: (props) => <h1 {...props} className="text-4xl mb-3"></h1>,
    h2: (props) => <h2 {...props} className="text-3xl mb-2"></h2>,
    h3: (props) => <h3 {...props} className="text-2xl mb-1"></h3>,
    ul: (props) => <ul {...props} className="list-disc list-inside"></ul>,
    li: (props) => <li {...props} className="mb-2"></li>,
    p: (props) => <p {...props} className="mb-3"></p>
  }}>{children}</ReactMarkdown>;
}
