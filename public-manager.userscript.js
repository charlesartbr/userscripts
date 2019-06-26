// ==UserScript==
// @name         PubliManager - Melhorias
// @namespace    https://www.charles.art.br/userscripts/publi-manager
// @version      0.1
// @description  Adiciona funcionalidades ao PubliManager web
// @author       Charles Cavalcante
// @match        http://192.168.1.1/PubliWeb/views/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery || {};

(function() {
    'use strict';

    setInterval(function () {
       GridViewExpander();
    }, 5000);

})();


var GridViewExpander = function () {
    var $items = $('.GridViewItemBody');

    if ($items.length === 0) return;

    $items.each(function () {
        $(this).find('> div').css({ 'width': 'auto' });
    });
}
