import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter your answer...",
  className = "",
  disabled = false,
}: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    }),
    []
  );

  const formats = [
    "header",
    "size",
    "font",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      <style>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          font-size: 14px;
          background-color: rgb(0 0 0);
          color: rgb(255 255 255);
          border-color: rgb(55 65 81);
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          color: rgb(255 255 255);
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgb(156 163 175);
        }
        .rich-text-editor .ql-toolbar {
          background-color: rgb(17 24 39);
          border-color: rgb(55 65 81);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: rgb(209 213 219);
        }
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: rgb(209 213 219);
        }
        .rich-text-editor .ql-toolbar .ql-picker-label {
          color: rgb(209 213 219);
        }
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button.ql-active {
          background-color: rgb(55 65 81);
        }
        .rich-text-editor .ql-container {
          border-radius: 0 0 0.5rem 0.5rem;
        }
        .rich-text-editor .ql-snow .ql-picker.ql-expanded .ql-picker-options {
          background-color: rgb(17 24 39);
          border-color: rgb(55 65 81);
        }
        .rich-text-editor .ql-snow .ql-picker-options .ql-picker-item {
          color: rgb(209 213 219);
        }
        .rich-text-editor .ql-snow .ql-picker-options .ql-picker-item:hover {
          background-color: rgb(55 65 81);
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
      />
    </div>
  );
}

