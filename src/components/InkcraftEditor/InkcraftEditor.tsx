import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  BlockQuote,
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SimpleUploadAdapter,
  Strikethrough,
  TextTransformation,
  Underline,
  Undo,
  WordCount,
  Editor,
  ImageUploadProgress,
  FileLoader,
} from "ckeditor5";
import translations from "ckeditor5/translations/en.js";
import { LoaderCircle } from "lucide-react";
import { Group } from "@mantine/core";
import CustomUploadAdapter from "./plugins/CustomUploadAdapter";
import { useChapterPostStore } from "@/stores/chapterPostStore";

export default function InkcraftEditor({
  value,
  onChange,
  postId,
}: {
  value: string;
  onChange: (value: string) => void;
  postId: string;
}) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const { setWordCount } = useChapterPostStore();

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
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "removeFormat",
        "|",
        "horizontalLine",
        "insertImage",
        "blockQuote",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      BlockQuote,
      Bold,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Italic,
      List,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SimpleUploadAdapter,
      Strikethrough,
      TextTransformation,
      Underline,
      Undo,
      WordCount,
      ImageUploadProgress,
    ],
    extraPlugins: [customUploadAdapterPlugin, wordCountPlugin],
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
    image: {
      toolbar: [
        "imageStyle:full",
        "imageStyle:side",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    language: "en",
    placeholder: "Type or paste your content here!",
    translations: [translations],
  };

  function customUploadAdapterPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: FileLoader
    ) => {
      return new CustomUploadAdapter(loader, postId);
    };
  }

  function wordCountPlugin(editor: Editor) {
    editor.plugins.get("WordCount").on("update", (event: any) => {
      setWordCount(event.source.words);
    });
  }

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div>
              {isLayoutReady ? (
                <div className="prose !max-w-none">
                  <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    ref={editorRef}
                    config={editorConfig as any}
                    onChange={(_, editor) => {
                      const data = editor.getData();
                      onChange(data);
                    }}
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "calc(100vh - 200px)",
                          editor.editing.view.document.getRoot() as any
                        );
                      });
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
