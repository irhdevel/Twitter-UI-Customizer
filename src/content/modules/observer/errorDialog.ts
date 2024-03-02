import { TUICI18N } from "@modules/i18n";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { Dialog } from "@shared/tlui/components/Dialog";
import { TextboxComponent } from "@shared/tlui/components/TextboxComponent";

const errors = [];

/** エラーダイアログを表示します。 */
export function catchError(e: Error, callback: (() => unknown) | null = null, callbackTime: number = 5000) {
    console.error(e);
    errors.push(`${e.toString()}${"\r"}${e.stack}`);
    if (errors.length > 2) {
        const dialog = new Dialog(TUICI18N.get("common-error"));
        dialog
            .addComponents([
                ...TUICI18N.get("observerError-message").split("\r"),
                "",
                new TextboxComponent(errors.join("\r\r"), { readonly: true, rows: 5 }),
                new ButtonComponent(TUICI18N.get("observerError-copy"), () => {
                    dialog.close();
                    navigator.clipboard.writeText(errors.join("\r\r"));
                }),
                new ButtonComponent(
                    TUICI18N.get("common-close"),
                    () => dialog.close(),

                    {
                        invertColor: true,
                    },
                ),
            ])
            .open();
    } else {
        if (callback) window.setTimeout(() => callback?.(), callbackTime);
    }
}
