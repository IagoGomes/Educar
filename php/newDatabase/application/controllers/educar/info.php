<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Info extends REST_Controller {

	public function disciplinas_get()
	{
		$this->load->model('disciplinas');
		$idUser = $this->get('idUsuario');

		
		$horario = $this->disciplinas->horario($idUser)->result();
		$this->response($horario, REST_Controller::HTTP_OK); 
	}

}

/* End of file info.php */
/* Location: ./application/controllers/educar/info.php */