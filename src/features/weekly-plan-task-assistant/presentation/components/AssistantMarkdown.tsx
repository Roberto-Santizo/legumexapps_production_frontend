import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
    p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    h1: ({ children }) => <h3 className="mt-4 mb-2 text-base font-semibold text-ink first:mt-0">{children}</h3>,
    h2: ({ children }) => <h3 className="mt-4 mb-2 text-base font-semibold text-ink first:mt-0">{children}</h3>,
    h3: ({ children }) => <h4 className="mt-3 mb-1.5 text-sm font-semibold text-ink first:mt-0">{children}</h4>,
    ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5 marker:text-ink-subtle">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5 marker:text-ink-subtle">{children}</ol>,
    a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink-muted">{children}</a>,
    code: ({ children }) => <code className="rounded bg-canvas px-1 py-0.5 font-mono text-[0.85em]">{children}</code>,
    pre: ({ children }) => <pre className="my-3 overflow-x-auto rounded-lg border border-line bg-canvas p-3 text-xs">{children}</pre>,
    blockquote: ({ children }) => <blockquote className="my-3 border-l-2 border-line-strong pl-3 text-ink-muted">{children}</blockquote>,
    hr: () => <hr className="my-4 border-line" />,
    table: ({ children }) => (
        <div className="my-3 overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-left text-[13px] tabular-nums">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-canvas">{children}</thead>,
    tbody: ({ children }) => <tbody className="divide-y divide-line">{children}</tbody>,
    th: ({ children }) => <th className="px-3 py-2 text-xs font-semibold whitespace-nowrap text-ink-muted">{children}</th>,
    td: ({ children }) => <td className="px-3 py-2 align-top whitespace-nowrap text-ink">{children}</td>
};

export function AssistantMarkdown({ text }: { text: string }) {
    return (
        <div className="text-[14px] leading-relaxed text-ink">
            <Markdown remarkPlugins={[remarkGfm]} components={components}>{text}</Markdown>
        </div>
    )
}
