<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_Model extends CI_Model {

	public function users($username, $password){
		$this->db->select('Funcionario.idFuncionario');
		$this->db->where("nomeUsuario", $username);
		$this->db->where("senha", $password);
		$this->db->join('Funcionario', 'Usuario.idUsuario = Funcionario.idUsuario');
		$users = $this->db->get("Usuario");
		return $users;
	}

    public function usuarios(){
	        $users = $this->db->get("users");
	        return $users;
    }	    	

}

/* End of file database.php */
/* Location: ./application/models/database.php */
