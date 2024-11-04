import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  Italic,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  Underline,
  Undo,
} from "ckeditor5";
import translations from "ckeditor5/translations/en.js";
import { LoaderCircle } from "lucide-react";
import { Group } from "@mantine/core";

export default function SimpleEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "underline",
        "removeFormat",
        "|",
        "bulletedList",
        "numberedList",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      Autosave,
      BlockQuote,
      Bold,
      Essentials,
      GeneralHtmlSupport,
      Italic,
      List,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      Underline,
      Undo,
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    language: "en",
    placeholder: "Type or paste your content here!",
    translations: [translations],
  };

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady ? (
                <div className="prose !max-w-none">
                  <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    config={editorConfig as any}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      onChange(data);
                    }}
                  />
                </div>
              ) : (
                <Group align="center" justify="center">
                  <LoaderCircle className="animate-spin h-4 w-4" />
                </Group>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
