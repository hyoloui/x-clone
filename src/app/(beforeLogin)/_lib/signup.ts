"use server";

import { redirect } from "next/navigation";

export async function onSubmit(prevState: any, formData: FormData) {
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    console.log("no_id" + formData.get("id"));
    return { message: "no_id" };
  }
  if (
    !formData.get("nickname") ||
    !(formData.get("nickname") as string)?.trim()
  ) {
    console.log("no_nickname" + formData.get("nickname"));
    return { message: "no_nickname" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    console.log("no_password" + formData.get("password"));
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    console.log("no_image" + formData.get("image"));
    return { message: "no_image" };
  }
  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );
    console.log("signup", response.status);

    if (response.status === 403) {
      return { message: "user_exists" };
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
    return;
  }

  if (shouldRedirect) {
    redirect("/home");
  }
}
