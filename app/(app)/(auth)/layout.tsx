import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await caller.auth.session();
  if (session.user) redirect("/");
  return <section>{children}</section>;
}
