#!/bin/bash

# get URLs to use for cURL to get PDFs
# user args: 1) input html from results of search - looks like http://pesquisa.in.gov.br/imprensa/core/consulta.action
# must be saved as complete page
# TODO - automate getting these

inhtml=$1
cat $inhtml |\
grep -oE '<a href="http://pesquisa[.]in[.]gov[.]br/imprensa/jsp/visualiza/index[.]jsp[?]jornal=[^>]*' |\
sed 's:<a href="::g;s:"$::g' |\
sed 's:/jsp/visualiza/index.jsp:/servlet/INPDFViewer:g;s:$:\&captchafield=firistAccess:g'
