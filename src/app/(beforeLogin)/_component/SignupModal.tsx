import style from "./signup.module.css";
import BackButton from "./BackButton";
import { redirect } from "next/navigation";

export default function SignupModal() {
  const submit = async (formData: FormData) => {
    "use server";

    let shouldRedirect: boolean = false;

    if (!formData.get("id")) {
      return { message: "아이디를 입력해 주세요." };
    }
    if (!formData.get("name")) {
      return { message: "이름을 입력해 주세요." };
    }
    if (!formData.get("password")) {
      return { message: "비밀번호를 입력해 주세요." };
    }
    if (!formData.get("image")) {
      return { message: "이미지를 선택해 주세요." };
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          method: "post",
          body: formData,
          credentials: "include",
        }
      );
      console.log(response.status);

      if (response.status === 403) {
        return { message: "id is already taken" };
      }

      console.log(await response.json());
      shouldRedirect = true;
      // cookies 활용해 browser cookie에 sid 저장
      // const sid = response.headers.get("Set-Cookie");
      // if (sid) {
      //   cookies().set("sid", sid);
      // }
    } catch (error) {
      console.error(error);
    }

    if (shouldRedirect) {
      redirect("/home");
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  required
                  type="text"
                  placeholder=""
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  required
                  type="text"
                  placeholder=""
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  required
                  type="password"
                  placeholder=""
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  required
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
