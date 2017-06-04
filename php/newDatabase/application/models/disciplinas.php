<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Disciplinas extends CI_Model {

	public function horario($idUser){
		$this -> db -> join('setores', 'setores.id_regiao = regioes.id_regiao', 'left');
	}
	

}

/* End of file disciplinas.php */
/* Location: ./application/models/disciplinas.php */