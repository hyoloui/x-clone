"use client";

import style from "./postForm.module.css";
import {
  useRef,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import type { Session } from "next-auth";
import ReactTextareaAutosize from "react-textarea-autosize";

type Props = { session: Session | null };
export default function PostForm({ session: me }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [preivew, setPreivew] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    // formdata
    const formData = new FormData();
    formData.append("content", content);
    preivew.forEach((p) => {
      p && formData.append("images", p.file);
    });
    await fetch(`/${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onLoadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files) return;
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreivew((prevPreview) => {
          const prev = [...prevPreview];
          prev[index] = {
            dataUrl: reader.result as string,
            file,
          };
          return prev;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const onRemoveImage = (index: number) => {
    setPreivew((prevPreview) => {
      const prev = [...prevPreview];
      prev.splice(index, 1);
      return prev;
    });
  };

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img
            src={me?.user?.image as string}
            alt={me?.user?.email as string}
          />
        </div>
      </div>
      <div className={style.postInputSection}>
        <ReactTextareaAutosize
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div className={style.postImagePreview}>
          {preivew.length > 0 &&
            preivew.map((v, index) => (
              <div
                className={style.postImagePreivewItem}
                key={index}
                onClick={() => onRemoveImage(index)}
              >
                <img src={v?.dataUrl} alt={`${index + 1} 번째 이미지`} />
              </div>
            ))}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                accept="image/*"
                hidden
                ref={imageRef}
                onChange={onLoadImage}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
