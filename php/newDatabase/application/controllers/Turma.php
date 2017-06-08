<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Turma extends REST_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->helper('url');

		$this->load->view('welcome_message');
	}

	public function turmaInfos_get(){

		$this->load->model('turma_model');
		
		$idTurma = $this->get('idTurma');
		$idDisciplina= $this->get('idDisciplina');

		$turma = $this->turma_model->turma_infos($idTurma, $idDisciplina)->row_array();

		if($turma){
		    $this->response($turma, REST_Controller::HTTP_OK);        
		}
		else {
		    $result = [array('sala'=> false, 'nome'=>false, 'disciplina'=>false, 'unidadeEscolar'=>false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}

	}

	public function quantAlunos_get(){

		$this->load->model('turma_model');
		
		$idTurma = $this->get('idTurma');
		$idDisciplina= $this->get('idDisciplina');

		$quantAlunos = $this->turma_model->get_quant_alunos($idTurma, $idDisciplina);

		if($quantAlunos){
		    $this->response($quantAlunos, REST_Controller::HTTP_OK);        
		}

		else {
		    $result = 0;
		    $this->response($result, REST_Controller::HTTP_OK);
		}

	}

	public function getAlunos_get(){

		$this->load->model('turma_model');
		
		$idTurma = $this->get('idTurma');
		$idDisciplina= $this->get('idDisciplina');

		$alunos = $this->turma_model->get_alunos($idTurma, $idDisciplina)->result_array();


		if($alunos){
		    $this->response($alunos, REST_Controller::HTTP_OK);        
		}
		
		else {
		    $result = [array('idTurma'=> false, 'idDisciplina'=>false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}

	}

        public function getNotas_get(){
 		$this->load->model('turma_model');
		
		$idTurma = $this->get('idTurma');
		$idDisciplina= $this->get('idDisciplina');

		$alunos = $this->turma_model->get_notas_alunos($idTurma, $idDisciplina)->result_array();


		if($alunos){
		    $this->response($alunos, REST_Controller::HTTP_OK);        
		}
		
		else {
		    $result = [array('idTurma'=> false, 'idDisciplina'=>false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}               
        }

	public function mudarNota_get(){
		$this->load->model('turma_model');
		
		$idDisciplinaAvaliacao = $this->get('idDisciplinaAvaliacao');
		$nota= $this->get('nota');

		$result = $this->turma_model->mudar_nota_aluno($idDisciplinaAvaliacao, $nota);


		if($result){
		    $this->response($result, REST_Controller::HTTP_OK);        
		}
		
		else {
		    $result = [array('idTurma'=> false, 'idDisciplina'=>false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}               		
	}
}
