<?php
 defined('BASEPATH') OR exit('No direct script access allowed');
 
 class Horario_model extends CI_Model {
 
  public function getDisciplines($idFuncionario){
   $this->db->select('idTurma');
   $this->db->where("idFuncionario", $idFuncionario);
   //$this->db->join('Turma', 'Turma.idFuncionario = Funcionario.idFuncionario');
   $user = $this->db->get("Turma");
   return $user;
  }
}