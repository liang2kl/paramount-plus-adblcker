// ==UserScript==
// @name         Paramount+ Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      2024-11-01
// @description  Block ads in Paramount+ videos
// @author       liang2kl
// @match        https://www.paramountplus.com/shows/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=paramountplus.com
// @grant        none
// ==/UserScript==

const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const checkAd = (adElem) => {
    if (adElem.classList.contains("show")) {
        const counterElem = document.querySelector(".ad-info-manager-circular-loader-copy")
        const time = parseInt(counterElem.innerText || counterElem.textContent);
        const video = document.querySelector("video");
        const destTime = video.currentTime + time;
        video.currentTime = destTime;
        adElem.classList.remove("show");
    }
};

const main = (adElem) => {
    setInterval(() => checkAd(adElem), 2000);
};

waitForElm(".ad-info-manager").then((elm) => main(elm));