#!/bin/bash

# get txt from pdfs for Brazil portal.in.gov.br
# user args: 1) input of html from portal search, 2) output directory to store the txt outputs
# input html must be saved as complete page
# ought to make scraper script to get these
# example use: $0 input/ output/

indir=$1 
outdir=$2
# allow GNU parallel to use apostrophe
a="'"
# for each htm file
find $indir -type f -iregex ".*[.]htm[l]*$" |\
parallel --gnu '
	# define a place for temp pdf to go before it is converted to txt
	tmppdf=$(mktemp)
	# provide the name of an output dir given the name of the input dir
	out=$( echo '$outdir'/$( dirname {} | sed "s:^[^/]*/::g" ) )
	# make this output dir
	mkdir -p $out 2>/dev/null
	# alias the input html as a var called html
	html={}
	# HTML decoding function using perl
	function html_decode { perl -Mutf8 -MHTML::Entities -ne '$a'print decode_entities($_)'$a'; }
	cat $html |\
	# get URLs that lead to PDFs
	grep -oE "http://pesquisa[.]in[.]gov[.]br/imprensa/jsp/visualiza/index.jsp\?jornal=[0-9]+\&amp;pagina=[0-9]+\&amp;data=[0-9]+/[0-9]+/[0-9]+" |\
	# html decode these URLs
	html_decode |\
	# change them to allow for direct download instead of viewing them in a browser
	sed "s:/jsp/visualiza/index.jsp:/servlet/INPDFViewer:g;s:$:\&captchafield=firistAccess:g" |\
	# add double quotes around the names so that curl can use the URL
 	sed "s:^:\":g;s:$:\":g" |\
	# download the PDF to a temp file
 	xargs curl -s --compressed > $tmppdf
	# convert that PDF to plain text
	pdftotext $tmppdf ${out}/$( basename {} | sed "s:[^.]*$:txt:g" )
	# now remove tmp pdf
	rm $tmppdf
'
