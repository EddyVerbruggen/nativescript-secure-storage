import { NavigatedData, Page } from "@nativescript/core";
import { HelloWorldModel } from './main-view-model';

export function navigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();
}