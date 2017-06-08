<?php
 defined('BASEPATH') OR exit('No direct script access allowed');
 
 class Horario_model extends CI_Model {
 
  public function getDisciplines($idUser){
   $this->db->select('Turma.idTurma');
   $this->db->where("idUsuario", $idUser);
   $this->db->join('Turma', 'Turma.idFuncionario = Funcionario.idFuncionario');
   $user = $this->db->get("Funcionario");
   return $user;
  }
}