<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Turma_model extends CI_Model {

	public function users($idUser){
		$this->db->select('Turma.idTurma');
		$this->db->where("idUsuario", $idUser);
		$this->db->join('Turma', 'Turma.idFuncionario = Funcionario.idFuncionario');
		$user = $this->db->get("Funcionario");
		return $user;
	}

}

/* End of file turma_model.php */
/* Location: ./application/models/turma_model.php */