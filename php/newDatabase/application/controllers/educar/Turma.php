<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Controllername extends REST_Controller {

	public function db_get(){

		$this->load->model('turma_model');
		//$id='1';
		$idUsuario = $this->get('idUsuario');
		$user = $this->database->users($idUsuario)->row_array();

		if($users){
		    $this->response($users, REST_Controller::HTTP_OK);        
		}
		else {
		    $result = [array('username'=> false, 'password'=> false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}

	}
}

/* End of file controllername.php */
/* Location: ./application/controllers/controllername.php */