function Trim(str){return str.replace(/^\s+|\s+$/g,"");}

function FormataData(campo,teclapres) {
 var tecla = teclapres.keyCode;
 vr = campo.value;
 vr = vr.replace( ".", "" );
 vr = vr.replace( "/", "" );
 /*vr = vr.replace( "/", "" );*/
 tam = vr.length + 1;
 if ( tecla != 9 && tecla != 8 ){
  if ( tam > 2 && tam < 5 )
   campo.value = vr.substr( 0, tam - 2 ) + '/' + vr.substr( tam - 2, tam );
  /*if ( tam >= 5 && tam <= 10 )*/
  if ( tam >= 5)
   campo.value = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 );
  }
}

function VerificaData(digData) 
{
    var bissexto = 0;
    var data = digData; 
	var datamsg = data.substr(8,2)+'/'+data.substr(5,2)+'/'+data.substr(0,4);
    var tam = data.length;
    if (tam == 10) 
    {
        var dia = data.substr(8,2)
        var mes = data.substr(5,2)
        var ano = data.substr(0,4)
        if ((ano > 1900)||(ano < 2100))
        {
            switch (mes) 
            {
                case '01':
                case '03':
                case '05':
                case '07':
                case '08':
                case '10':
                case '12':
                    if  (dia <= 31) 
                    {
                        return true;
                    }
                    break
                
                case '04':        
                case '06':
                case '09':
                case '11':
                    if  (dia <= 30) 
                    {
                        return true;
                    }
                    break
                case '02':
                    /* Validando ano Bissexto / fevereiro / dia */ 
                    if ((ano % 4 == 0) || (ano % 100 == 0) || (ano % 400 == 0)) 
                    { 
                        bissexto = 1; 
                    } 
                    if ((bissexto == 1) && (dia <= 29)) 
                    { 
                        return true;                 
                    } 
                    if ((bissexto != 1) && (dia <= 28)) 
                    { 
                        return true; 
                    }            
                    break                        
            }
        }
    }    
    alert("A Data "+datamsg+" é inválida!");
    return false;
}

/** FUNÇÕES PARA MÁSCARA* */
function mascara(o, f) {
	v_obj = o;
	v_fun = f;
	setTimeout("execmascara()", 1);
	// eval("v_obj.value = v_fun(v_obj.value);");
}
function execmascara() {
	v_obj.value = v_fun(v_obj.value);
}

/** somente números e barras */
function numerosEBarras(v) {

	// Remove tudo o que não é dígito ou barra
	v = v.replace(/[^0-9|\/]/g, "");

	return v;
}

/** SOMENTE NÚMEROS* */
function numeros(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");

	return v;
}

/** números com marcação de milhar */
function numMilhar(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");

	// Coloca os pontos
	var comparacao = '';

	while (comparacao != v) {

		comparacao = v;
		v = v.replace(/(\d+)((?:\d{3}\.)*\d{3})$/g, "$1.$2");
	}

	return v;
}

/** SOMENTE DIAS* */
function dias(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");

	if (parseInt(v) > 31)
		v = v.substr(0, 1);

	if (v == "0")
		v = "";

	return v;
}

/** ANO MÊS* */
function mesAno(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca a Barra
	v = v.replace(/(\d{2})$/, "/$1");
	return v;
}

/** HORA* */
function hora(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca o :
	v = v.replace(/(\d{2})$/, ":$1");
	return v;
}

/* DATA COMPLETA* */

function data(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca a Barra
	v = v.replace(/(\d{4})$/, "/$1");
	// coloca a outra
	v = v.replace(/(\d{2}\/\d{4})$/, "/$1");
	
	
	var max = false;
	
	while(v.length > 10){
		v = v.substr(0, v.length - 1);
		max = true;
	}
	
	if(max){
		v = data(v);
	}
	
	return v;
}

/** MOEDA* */
function mreais(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca a virgula
	v = v.replace(/(\d{2})$/, ",$1");

	// Coloca os pontos
	var comparacao = '';

	while (comparacao != v) {

		comparacao = v;
		v = v.replace(/(\d+)((?:\d{3}\.)*\d{3},\d{2})$/g, "$1.$2");
	}

	return v;
}

/** CPF* */
function cpf(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca o hifen
	v = v.replace(/(\d{2})$/, "-$1");
	// Coloca o primeiro ponto
	v = v.replace(/(\d+)(\d{3}-\d{2})$/g, "$1.$2");
	// Coloca o segundo ponto
	v = v.replace(/(\d+)(\d{3}\.\d{3}-\d{2})$/g, "$1.$2");
	
	var max = false;
	while(v.length > 14){
		v = v.substr(0, v.length - 1);
		max = true;
	}
	
	if(max){
		v = cpf(v);
	}

	return v;
}

/** CNPJ* */
function cnpj(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca o hifen
	v = v.replace(/(\d{2})$/, "-$1");
	// Coloca a barra
	v = v.replace(/(\d+)(\d{4}-\d{2})$/g, "$1/$2");
	// Coloca o primeiro ponto
	v = v.replace(/(\d+)(\d{3}\/\d{4}-\d{2})$/g, "$1.$2");
	// Coloca o segundo ponto
	v = v.replace(/(\d+)(\d{3}\.\d{3}\/\d{4}-\d{2})$/g, "$1.$2");

	var max = false;
	
	while(v.length > 18){
		v = v.substr(0, v.length - 1);
		max = true;
	}
	
	if(max){
		v = cnpj(v);
	}
	
	return v;
}

/** CEP* */
function cep(v) {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca o hifen
	v = v.replace(/(\d{3})$/, "-$1");
	// Coloca o ponto
	v = v.replace(/(\d+)(\d{3}-\d{3})$/g, "$1.$2");

	return v;
}

/** DDD* */
function ddd(v) {

	var casoEspecialBackSpace = false;
	if (v.indexOf("(") != -1 && v.indexOf(")") == -1)
		casoEspecialBackSpace = true;

	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");

	if (casoEspecialBackSpace)
		v = v.substr(0, v.length - 1);

	if (v.length == 0)
		return "";

	// Coloca os parênteses
	v = v.replace(/(\d*)$/, "($1)");
	
	
	var max = false;
	
	while(v.length > 4){
		v = v.substr(0, v.length - 1);
		max = true;
	}
	
	if(max){
		v = ddd(v);
	}

	return v;
}

/** DDI* */
function ddi(v) {

	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");

	// Coloca os parênteses
	v = v.replace(/(\d+)$/, "+$1");
	
	var max = false;
	
	while(v.length > 3){
		v = v.substr(0, v.length - 1);
		max = true;
	}
	
	if(max){
		v = ddi(v);
	}

	return v;
}

/** telefone sem ddd* */
function telefoneSemDdd(v) {

	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");
	// Coloca o hífen
	v = v.replace(/(\d+)(\d{4})$/, "$1-$2");

	return v;
}

/** telefone com ddd* */
function telefoneComDdd(v) {

	var casoEspecialBackSpace = false;
	if (v.indexOf("(") != -1 && v.indexOf(")") == -1)
		casoEspecialBackSpace = true;

	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, "");

	if (casoEspecialBackSpace)
		v = v.substr(0, v.length - 1);

	if (v.length == 0)
		return "";

	// Coloca os parênteses
	v = v.replace(/^(\d{1,2})/, "($1)");

	// Coloca o hífen
	v = v.replace(/(\(\d{2}\))(\d{3,4})(\d{4})$/, "$1 $2-$3");

	return v;
}