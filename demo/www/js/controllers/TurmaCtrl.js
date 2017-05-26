var arrayAlunos = [];//array que armazena todos os alunos dessa turma como itens de md-list --> <md-list-item>
app.controller('TurmaCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('left');

// Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    

    // Set Ink
    ionicMaterialInk.displayEffect();
	
	//preencher o array de alunos
    //preencherArrayAlunos();
showHeaderInfo(1);
preencherArrayAlunos();
});
 
 /**
  * Função para enviar os dados
  */
function showHeaderInfo(id) {
     if(id !== -1){

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","php/turma/turma.php?id="+id,true);
        xmlhttp.send();
     }else{
	document.getElementById("resultado").innerHTML="Nenhum Aluno Matriculado";
     }
}










function preencherArrayAlunos(){
	var totalDeAlunos = 5;
	var itemAluno, aluno, imagemAluno, nomeAluno, emailAluno, h2, p, spanMedia, mediaAluno, spanFaltas, faltasAluno;
	var lista = document.createElement("md-list");
	for(var a = 0; a < totalDeAlunos; a++){
		itemAluno = document.createElement("md-list-item");
		aluno = document.createElement("a");
		aluno.setAttribute("class", "item item-avatar");
		aluno.id="item"+a;
		aluno.value = ""+a;
		aluno.addEventListener("click", function(){ dividirLista(this.value);}); //ao clicar com o mouse sobre o item
		imagemAluno = document.createElement("img");
		//############################ passar para imagemAluno.src a foto do aluno que esta no BD #####
		imagemAluno.src = "img/jon-snow.jpg";
		aluno.appendChild(imagemAluno);
		//############################ passar para a funcao document.createTextNode() abaixo o nome do aluno que esta no BD #####
		nomeAluno = document.createTextNode("Jon Snow");
		h2 = document.createElement("h2"); 
		h2.appendChild(nomeAluno);
		aluno.appendChild(h2);
		//############################ passar para a funcao document.createTextNode() abaixo o email do aluno que esta no BD #####
		emailAluno = document.createTextNode("jonsnow@gmail.com");
		p = document.createElement("p");
		p.appendChild(emailAluno);
		aluno.appendChild(p);
		spanMedia = document.createElement("span");
		spanMedia.setAttribute("class", "badge badge-assertive");
		//############################ passar para a funcao document.createTextNode() abaixo a nota do aluno que esta no BD #####
		mediaAluno = document.createTextNode(""+aluno.value);
		spanMedia.appendChild(mediaAluno);
		aluno.appendChild(spanMedia);
		
		itemAluno.appendChild(aluno);//adicionando <a> ao <md-list-item>
		arrayAlunos.push(itemAluno);//adiciona o aluno ao array de alunos
		lista.appendChild(itemAluno);
	}
	document.getElementById("cardAlunosList0").appendChild(lista);//adicionando o aluno a interface
}

function dividirLista(posicao){
	var listaAlunos = document.getElementById("cardAlunosList0");
	var paiLista = listaAlunos.parentNode;
	paiLista.removeChild(listaAlunos);
	listaAlunos = document.getElementById("cardAlunosList1");
	paiLista.removeChild(listaAlunos);
	listaAlunos = document.getElementById("cardAlunosList2");
	paiLista.removeChild(listaAlunos);
	var c0 = document.createElement("div");//card0
	c0.id = "cardAlunosList0";
	c0.setAttribute("class", "card");
	var listaAluno0 = document.createElement("md-list");
	listaAluno0.id = "listaAluno0";
	c0.appendChild(listaAluno0);
	var c1 = document.createElement("div");//card1
	c1.id = "cardAlunosList1";
	c1.setAttribute("class", "card");
	var listaAluno1 = document.createElement("md-list");
	listaAluno1.id = "listaAluno1";
	c1.appendChild(listaAluno1);
	var c2 = document.createElement("div");//card2
	c2.id = "cardAlunosList2";
	c2.setAttribute("class", "card");
	var listaAluno2 = document.createElement("md-list");
	listaAluno2.id = "listaAluno2";
	c2.appendChild(listaAluno2);
	//adicionar os cards a interface
	paiLista.appendChild(c0);
	paiLista.appendChild(c1);
	paiLista.appendChild(c2);
	//separacao dos alunos pra cada card
	var listaDeEdicao = 0;
	var n = parseInt(posicao,posicao.length-1);
	if(n < 0){
		for(var i = 0; i < arrayAlunos.length; i++){
				document.getElementById("listaAluno0").appendChild(arrayAlunos[i]);
			}
	}else{
		if(n > 0){
			for(var i = 0; i < n; i++){
				document.getElementById("listaAluno0").appendChild(arrayAlunos[i]);
			}
			if(n < arrayAlunos.length-1){
				for(var j = n + 1; j < arrayAlunos.length; j++){
					document.getElementById("listaAluno2").appendChild(arrayAlunos[j]);
				}
			}
			listaDeEdicao = 1;
		}else{
			for(var i = 1; i < arrayAlunos.length; i++){
				document.getElementById("listaAluno1").appendChild(arrayAlunos[i]);
			}
		}
		document.getElementById("cardAlunosList"+listaDeEdicao).setAttribute("class","code-wrapper");
		//estrutura do card de edicao das notas
	//HEAD
		var divHead = document.createElement("div");
		divHead.setAttribute("class","item item-avatar");
		divHead.appendChild(arrayAlunos[n].children[0].children[0].cloneNode(true));	
		divHead.appendChild(arrayAlunos[n].children[0].children[1].cloneNode(true));
		var pHead = document.createElement("p");
		var pText = document.createTextNode("Inserir Notas");
		pHead.appendChild(pText);
		divHead.appendChild(pHead);
		document.getElementById("cardAlunosList"+listaDeEdicao).appendChild(divHead);//adicionando o head ao card
	//BODY
		var divBody = document.createElement("div");
		divBody.setAttribute("class","item item-body");
		var divContent = document.createElement("ion-content");
		divContent.setAttribute("class","has-header padding");
		var divList = document.createElement("div");
		divList.setAttribute("class","list");
		//----input1
		var labelNota1 = document.createElement("label");
		labelNota1.setAttribute("class","item item-input item-stacked-label");
		var input1 = document.createElement("input");
		input1.type = "number";
		input1.placeholder = "0.00";
		input1.step="0.01";
		labelNota1.appendChild(input1);
		divList.appendChild(labelNota1);
		//----input2
		var labelNota2 = document.createElement("label");
		labelNota2.setAttribute("class","item item-input item-stacked-label");
		var input2 = document.createElement("input");
		input2.type = "number";
		input2.placeholder = "0.00";
		input2.step="0.01";
		labelNota2.appendChild(input2);
		divList.appendChild(labelNota2);
		//----input3
		var labelNota3 = document.createElement("label");
		labelNota3.setAttribute("class","item item-input item-stacked-label");
		var input3 = document.createElement("input");
		input3.type = "number";
		input3.placeholder = "0.00";
		input3.step="0.01";
		labelNota3.appendChild(input3);
		divList.appendChild(labelNota3);
		//add a lista
		divContent.appendChild(divList);
		divBody.appendChild(divContent);
		document.getElementById("cardAlunosList"+listaDeEdicao).appendChild(divBody);//adicionando o body ao card
	//FOOT
		var divFoot = document.createElement("div");
		divFoot.setAttribute("class","item tabs tabs-secondary tabs-icon-left");
		var pMedia = document.createElement("p");
		var mediaNota = document.createTextNode("media: "+0.00);
		pMedia.appendChild(mediaNota);
		var butOK = document.createElement("a");
		butOK.id = "button-OK";
		butOK.value = -1;
		butOK.addEventListener("click", function(){ dividirLista(this.value);}); //ao clicar com o mouse sobre o item
		divFoot.appendChild(butOK);
		divFoot.appendChild(pMedia);
		document.getElementById("cardAlunosList"+listaDeEdicao).appendChild(divFoot);
	}
}
