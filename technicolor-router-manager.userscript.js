// ==UserScript==
// @name         Technicolor Router Manager
// @namespace    http://charles.art.br/userscripts/technicolor
// @version      2018.05.30
// @description  Adiciona funcionalidades ao Technicolor Router Manager: auto-login; informação sobre qual é o nome do dispositivo do MAC address
// @author       Charles Cavalcante
// @match        http://192.168.1.1/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery || {};

(function()
{
    'use strict';

    AutoLogin();

    $(document).on("loaded.bs.modal shown.bs.modal", "#device-modal", function(){ setTimeout(MacAddresses, 1000); });
    MacAddresses();

})();

function AutoLogin()
{
    $("#srp_username").val("admin");
    $("#srp_password").val("password");
    $('#sign-me-in').trigger('click');
}

function MacAddresses()
{
    'use strict';

    var macAddress = function(_mac, _name){ this.mac=_mac; this.name=_name; };
    var macAddressNotFound = function(_mac){ this.mac=_mac; };
    var macAddressRouter = function(_mac){ this.mac=_mac; };

    var found = 0;

    console.group("MAC Addresses");

    if(typeof $ == 'undefined')
    {
        console.error("jQuery not found!");

        console.groupEnd();

        return;
    }

    $("tr", "#devices").each(function()
    {
      $("td", this).each(function(index)
      {
        if(/[a-f0-9]{2}\:[a-f0-9]{2}\:[a-f0-9]{2}\:[a-f0-9]{2}/i.test($.trim($(this).text())))
        {
            found++;

            var mac = $(this).text().toLowerCase();
            var name = "";

            console.log(mac);

            switch(mac)
            {
                case '74:d0:2b:35:a1:0e' : name = 'PC (Ethernet)'; break;
                case '4c:aa:16:f8:c9:4f' : name = 'Tablet'; break;

                case 'fc:52:8d:b3:c8:7d' :
                case 'fe:41:70:96:09:2a' :
                case 'fe:41:70:96:09:2c' :
                case 'fe:41:70:96:09:2d' :
                case 'fe:41:70:96:09:2e' :
                case 'fe:41:70:96:09:2f' :
                case 'fe:41:70:96:09:30' :
                    name = 'ignore'; break;
            }

            if(name==='')
            {
                console.error(new macAddressNotFound(mac));
            }
            else if(name==='ignore')
            {
                console.warn(new macAddressRouter(mac));
            }
            else
            {
                console.info(new macAddress(mac, name));

                $(this).parent().find('td:eq(1)').html('<b>' + name + '</b>');
            }
        }

      });

    });

    if(found===0)
    {
        console.info("No MAC Address found");
    }

    console.groupEnd();
}
