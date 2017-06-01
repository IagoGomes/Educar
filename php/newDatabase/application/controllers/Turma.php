<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Turma extends REST_Controller {

	public function db_get(){

		$this->load->model('turma_model');
		//$id='1';
		$idUsuario = $this->get('idUsuario');
		$user = $this->turma_model->users($idUsuario)->result();

		if($user){
		    $this->response($user, REST_Controller::HTTP_OK);        
		}
		else {
		    //$result = [array('username'=> false, 'password'=> false)];
		    $this->response("Deu ruim!", REST_Controller::HTTP_OK);
		}

	}
}

/* End of file controllername.php */
/* Location: ./application/controllers/controllername.php */