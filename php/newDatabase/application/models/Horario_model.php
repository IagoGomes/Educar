<?php
 defined('BASEPATH') OR exit('No direct script access allowed');
 
 class Horario_model extends CI_Model {
 
  public function getDisciplines($idFuncionario){
   $this->db->select('ht.diaSemana as diaSemana');
   $this->db->select('d.nome as disciplina');
   $this->db->select('ht.idTurma as idTurma');
   $this->db->select('ht.idDisciplina_Grade as idDisciplina_Grade');
   $this->db->select('ue.nome as escola');
   $this->db->select('h.inicio as inicio');
   $this->db->select('h.fim as fim');

   $this->db->from('HorarioTurma ht');
   $this->db->from('Disciplina_Grade dg');
   $this->db->from('Disciplina d');
   $this->db->from('GradeCurricular gc');
   $this->db->from('Curso c');
   $this->db->from('UnidadeEscolar ue');
   $this->db->from('Horario h');

   $this->db->where("ht.idFuncionario", $idFuncionario);
   $this->db->where("ht.idDisciplina_Grade=dg.idDisciplina_Grade");
   $this->db->where("dg.idDisciplina = d.idDisciplina");
   $this->db->where("dg.idGrade = gc.idGrade");
   $this->db->where("gc.idCurso = c.idCurso");
   $this->db->where("c.idUnidadeEscolar = ue.idUnidadeEscolar");
   $this->db->where("ht.idHorario=h.idHorario");

   $this->db->order_by("ht.diaSemana", "asc");

   //$this->db->join('Turma', 'Turma.idFuncionario = Funcionario.idFuncionario');
   $user = $this->db->get();
   return $user;
  }
}
