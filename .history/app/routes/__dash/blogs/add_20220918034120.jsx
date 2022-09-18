import { redirect } from "@remix-run/node";
import { useActionData, useTransition, Form, Link } from "@remix-run/react";

import { getUserId } from "utils/session.server";
import cuid from "cuid";
import { addblog } from "utils/blog.server";
import Main from "~/components/layout/Main";
import Field from "~/components/ui/Field";
import Button from "~/components/ui/Button";
import Textarea from "~/components/ui/Textarea";

import { useMemo, useRef, useEffect, useState } from "react";
import { Slate, Editable, withReact, useSlate, useFocused } from "slate-react";
import { Editor, Transforms, Text, createEditor, Range } from "slate";
import { withHistory } from "slate-history";

export async function action({ request }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const tagsRaw = formData.get("tags") ?? null;
  const tags = tagsRaw?.split(",");

  if (title && content) {
    const id = await getUserId(request);
    const slug = title.split(" ").join("-") + "-" + cuid.slug();
    let data = {
      title,
      slug,
      content,
    };

    if (tags) {
      data.tags = {
        connectOrCreate: tags.map((tags) => {
          return {
            create: { name: tags },
            where: { name: tags },
          };
        }),
      };
    }

    const blog = await addblog({ data, id });
    if (!blog) {
      return { error: "something went wrong" };
    }

    return redirect("/blogs");
  }

  return { error: "all fields are required" };
}

export default function AddBlog() {
  const data = useActionData();
  const transition = useTransition();
  const isBusy =
    transition.state === "loading" || transition.state === "submitting";

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "We have some base content." }],
    },
  ]);

  return (
    <Main>
      <Form
        method="POST"
        className="max-w-[min(640px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-6"
      >
        <fieldset className="contents" disabled={isBusy}>
          <h1 className="font-bold text-3xl">Post new blog</h1>
          <div className="flex flex-col items-stretch justify-start gap-2">
            <Field id="title" type="text" name="title" label="Title" />
            <Field id="slug" type="text" name="slug" label="Slug" />
            <Field
              component={Textarea}
              id="content"
              name="content"
              label="Content"
            />
            <Slate editor={editor} value={initialValue}>
              <HoveringToolbar />
              <Editable
                renderLeaf={(props) => <Leaf {...props} />}
                placeholder="Enter some text..."
                onDOMBeforeInput={(event) => {
                  switch (event.inputType) {
                    case "formatBold":
                      event.preventDefault();
                      return toggleFormat(editor, "bold");
                    case "formatItalic":
                      event.preventDefault();
                      return toggleFormat(editor, "italic");
                    case "formatUnderline":
                      event.preventDefault();
                      return toggleFormat(editor, "underlined");
                  }
                }}
              />
            </Slate>
            {/* <MyEditor /> */}
            <Field
              id="tags"
              type="text"
              name="tags"
              label="Tags (Comma seperated)"
              required={false}
            />
          </div>
          <Button type="submit">Post</Button>
        </fieldset>
      </Form>
    </Main>
  );
}

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <div>
      <div
        ref={ref}
        className="editor1"
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </div>
    </div>
  );
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <div
      reversed
      active={isFormatActive(editor, format)}
      onClick={() => toggleFormat(editor, format)}
    >
      <div>{icon}</div>
    </div>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: "italic", italic: true },
      { text: ", or anything else you might want to do!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "Try it out yourself! Just " },
      { text: "select any piece of text and the menu will appear", bold: true },
      { text: "." },
    ],
  },
];
