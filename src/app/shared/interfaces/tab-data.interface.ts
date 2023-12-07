import { TemplateRef } from "@angular/core";

export interface TabData {
    label: string,
    tabId: string | number,
    template: TemplateRef<any>,
    context: { [key: string]: any; }
}