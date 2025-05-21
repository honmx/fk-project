import { AppProps } from "next/app";
import { INextPageWithLayout } from "./INextPageWithLayout";

export type IAppPropsWithLayout = AppProps & {
  Component: INextPageWithLayout;
}