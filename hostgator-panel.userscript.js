// ==UserScript==
// @name         HostGator
// @namespace    https://www.charles.art.br/userscripts/hostgator-panel
// @version      0.1
// @description  Adiciona funcionalidades ao painel do HostGator
// @author       Charles Cavalcante
// @match        https://financeiro.hostgator.com.br/index.php?m=ssl_addon&action=request&type_ssl=free_ssl
// @require     http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
  
  if(location=='https://financeiro.hostgator.com.br/index.php?m=ssl_addon&action=request&type_ssl=free_ssl') {

    console.log('Certificado SSL');

    setTimeout(function() {

      console.log('Ordenação dos Domínios');

			var domains = [];

      $('#primary_domain option').each(function(i, item) {
        if (i > 0) {
        	domains.push({ text: $(item).text(), value: $(item).val() });
        }
      });

      domains.sort(function(a,b) {
    		return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
			});
      
      $('#primary_domain option').each(function(i, item) {
        if (i > 0) {
          $(item).val(domains[i + 1].value);
          $(item).text(domains[i + 1].text);
        }
      });

    }, 3000);
	}

})();
