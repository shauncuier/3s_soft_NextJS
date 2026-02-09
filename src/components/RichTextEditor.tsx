"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Loading editor...</span>
        </div>
    ),
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Start writing...",
    minHeight = "300px",
}: RichTextEditorProps) {
    // Quill modules configuration
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ font: [] }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ script: "sub" }, { script: "super" }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    [{ direction: "rtl" }],
                    [{ align: [] }],
                    ["blockquote", "code-block"],
                    ["link", "image", "video"],
                    ["clean"],
                ],
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );

    // Quill formats configuration
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "list",
        "indent",
        "direction",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
    ];

    return (
        <div className="rich-text-editor">
            <style jsx global>{`
                .rich-text-editor .ql-toolbar {
                    background-color: #374151;
                    border: 1px solid #4b5563;
                    border-radius: 0.5rem 0.5rem 0 0;
                }
                .rich-text-editor .ql-toolbar .ql-stroke {
                    stroke: #9ca3af;
                }
                .rich-text-editor .ql-toolbar .ql-fill {
                    fill: #9ca3af;
                }
                .rich-text-editor .ql-toolbar .ql-picker {
                    color: #9ca3af;
                }
                .rich-text-editor .ql-toolbar .ql-picker-options {
                    background-color: #374151;
                    border-color: #4b5563;
                }
                .rich-text-editor .ql-toolbar .ql-picker-item:hover {
                    color: #ffffff;
                }
                .rich-text-editor .ql-toolbar button:hover .ql-stroke,
                .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #3b82f6;
                }
                .rich-text-editor .ql-toolbar button:hover .ql-fill,
                .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
                    fill: #3b82f6;
                }
                .rich-text-editor .ql-toolbar button:hover,
                .rich-text-editor .ql-toolbar button.ql-active {
                    color: #3b82f6;
                }
                .rich-text-editor .ql-container {
                    background-color: #374151;
                    border: 1px solid #4b5563;
                    border-top: none;
                    border-radius: 0 0 0.5rem 0.5rem;
                    min-height: ${minHeight};
                    font-size: 1rem;
                }
                .rich-text-editor .ql-editor {
                    color: #ffffff;
                    min-height: ${minHeight};
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: #6b7280;
                    font-style: italic;
                }
                .rich-text-editor .ql-editor a {
                    color: #3b82f6;
                }
                .rich-text-editor .ql-editor blockquote {
                    border-left: 4px solid #3b82f6;
                    padding-left: 1rem;
                    color: #9ca3af;
                }
                .rich-text-editor .ql-editor pre {
                    background-color: #1f2937;
                    color: #e5e7eb;
                    border-radius: 0.375rem;
                    padding: 1rem;
                }
                .rich-text-editor .ql-editor code {
                    background-color: #1f2937;
                    color: #f472b6;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                }
                .rich-text-editor .ql-snow .ql-tooltip {
                    background-color: #374151;
                    border-color: #4b5563;
                    color: #ffffff;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .rich-text-editor .ql-snow .ql-tooltip input[type="text"] {
                    background-color: #1f2937;
                    border-color: #4b5563;
                    color: #ffffff;
                }
                .rich-text-editor .ql-snow .ql-tooltip a.ql-action::after,
                .rich-text-editor .ql-snow .ql-tooltip a.ql-remove::before {
                    color: #3b82f6;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
        </div>
    );
}
