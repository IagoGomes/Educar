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

	public function db_get(){

		$this->load->model('turma_model');
		//$id='1';
		$idTurma = $this->get('idTurma');
		$turma = $this->turma_model->turma_infos($idTurma)->row_array();

		if($turma){
		    $this->response($turma, REST_Controller::HTTP_OK);        
		}
		else {
		    $result = [array('idTurma'=> false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}

	}

}
