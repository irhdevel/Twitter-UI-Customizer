/**
 * Twitter UI Customizer
 * << Twitter を思いのままに。 >>
 */

import { TUICObserver } from "./observer.js";
import { TUICLibrary } from "./library.js";
import { TUICI18N } from "./i18n.js";
import { addCssElement } from "./applyCSS.js";
import { isSafemode, runSafemode } from "./safemode.js";

(async () => {
    await TUICI18N.fetch();
    await TUICLibrary.waitForElement("#react-root");

    String.prototype.escapeToUseHTML = function () {
        return TUICLibrary.escapeToUseHTML(this);
    };
    String.prototype.addClass = function () {
        return this;
    };
    TUICObserver.titleObserverFunction();

    console.log(
        `%cTwitter UI Customizer${isSafemode ? " (Safe Mode)" : ""}%cby kaonasi_biwa\n\nTwitter を思いのままに。⧸ Language: ${TUICI18N.get("@JapaneseLanguageName")}`,
        `font-family: system-ui, -apple-system, sans-serif, monospace; font-size: 1.2em; font-weight: bold; text-align: center; background: ${isSafemode ? "#5a9e1b" : "#1da1f2"}; color: #ffffff; padding: 0.5em 2em; margin-top: 0.5em; margin-left: 0.5em;`,
        `font-family: system-ui, -apple-system, sans-serif, monospace; margin: 0.5em; color: ${isSafemode ? "#5a9e1b" : "#1da1f2"};`,
    );

    for (const elem of document.querySelectorAll(".TUICOriginalContent")) {
        elem.remove();
    }

    addCssElement();
    if (document.querySelector(`#placeholder > svg`)) {
        TUICObserver.functions.twitterIcon(document.querySelector(`#placeholder > svg:not(.${"NOT_TUIC_DISPNONE".addClass()}):not(.${"TUIC_DISPNONE".addClass()}`), document.querySelector(`#placeholder`));
    }

    chrome.runtime.sendMessage({
        type: "update",
        updateType: "openTwitter",
    });

    // 旧バージョンからのアップデート
    await TUICLibrary.updatePref.update();

    (TUICObserver.target = document.querySelector("body")), TUICObserver.observer.observe(TUICObserver.target, TUICObserver.config);
    TUICObserver.observerFunction();

    const bodyAttributeObserver = new MutationObserver(addCssElement);
    bodyAttributeObserver.observe(document.querySelector("body"), {
        childList: false,
        subtree: false,
        attributes: true,
    });

    if (isSafemode) runSafemode();
})();
