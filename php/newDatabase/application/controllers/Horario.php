<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Horario extends REST_Controller {

	public function index()
	{
		
	}

	public function disciplinas_get(){
		$idFuncionario = $this->get('idFuncionario');
		$this->load->model("horario_model");
		$result = $this->horario_model->getDisciplines($idFuncionario)->result_array();

		if($result){
			$this->response($result, REST_Controller::HTTP_OK);
		}
		else{
			$this->response("Deu Ruim", REST_Controller::HTTP_OK);
		}

	}

}

/* End of file Horario.php */
/* Location: ./application/controllers/Horario.php */