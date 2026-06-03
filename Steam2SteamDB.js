// ==UserScript==
// @name         steam跳转steamDB
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在Steam商店页面添加跳转到SteamDB的按钮，在SteamDB页面添加跳转到学习版搜索页的按钮
// @author       mopanda
// @match        https://store.steampowered.com/app/*
// @match        https://steamdb.info/app/*
// @grant        none
// @icon         https://store.steampowered.com/favicon.ico
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    if (window.location.href.startsWith('https://store.steampowered.com/app/')) {
        const gameId = window.location.href.match(/app\/(\d+)/)[1];
        const otherSiteInfoDiv = document.querySelector('.apphub_OtherSiteInfo');
        if (otherSiteInfoDiv) {
            const steamDBButton = document.createElement('a');
            steamDBButton.href = 'javascript:void(0)';
            steamDBButton.classList.add('btnv6_blue_hoverfade', 'btn_medium');
            steamDBButton.style.backgroundColor = 'orange';
            steamDBButton.style.setProperty('color', 'white', 'important');
            steamDBButton.style.borderColor = 'transparent';
            steamDBButton.style.boxShadow = 'none';

            const span = document.createElement('span');
            span.textContent ='steamDB';
            steamDBButton.appendChild(span);

            otherSiteInfoDiv.insertBefore(steamDBButton, otherSiteInfoDiv.firstChild);

            steamDBButton.addEventListener('click', function () {
                window.open(`https://steamdb.info/app/${gameId}/`, '_blank');
            });
        }
    } else if (window.location.href.startsWith('https://steamdb.info/app/')) {
        const gameNameElement = document.querySelector('h1[itemprop="name"]');
        let gameName = '';
        if (gameNameElement) {
            gameName = gameNameElement.textContent;
        }

        const existingButtons = document.querySelectorAll('.pagehead-actions a');
        if (existingButtons.length > 0) {
            const newButton = document.createElement('a');
            newButton.textContent = `查找学习版`;
            newButton.href = 'javascript:void(0)';
            newButton.classList.add('btn', 'tooltipped', 'tooltipped-s');
            newButton.style.backgroundColor ='red';
            newButton.style.color = 'white';
            newButton.setAttribute('aria-label', '在igg-games.com上查找学习版');

            existingButtons[0].parentNode.insertBefore(newButton, existingButtons[0]);

            newButton.addEventListener('click', function () {
                const formattedGameName = gameName.split(' ').join('+');
                window.open(`https://igg-games.com/?s=${formattedGameName}`, '_blank');
            });
        }
    }
})();
