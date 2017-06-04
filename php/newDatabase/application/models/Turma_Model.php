<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Turma_Model extends CI_Model {

    public function turma_infos($idTurma){
		$this->db->select('t.descricao as nome');
		$this->db->select('t.numMatriculados as quantAlunos');
		$this->db->select('tn.horaInicial');
		$this->db->select('tn.horaFinal');
		$this->db->select('s.numero as sala');
		$this->db->select('d.nome as disciplina');
		$this->db->select('u.nome as unidadeEscolar');
                $this->db->from('Turma as t');
                $this->db->from('Turno as tn');
                $this->db->from('Sala as s');
                $this->db->from('SalaTurma as st');
                $this->db->from('Disciplina as d');
                $this->db->from('Disciplina_Grade as dg');
                $this->db->from('UnidadeEscolar as u');
		$this->db->where("t.idTurma", $idTurma);
		$this->db->where("t.idTurno = tn.idTurno");
		$this->db->where("st.idTurma", $idTurma);
		$this->db->where("st.idSala = s.idSala");
		$this->db->where("t.idGrade = dg.idGrade");
		$this->db->where("dg.idDisciplina = d.idDisciplina");
		$this->db->where("s.idUnidadeEscolar = u.idUnidadeEscolar");
		$turma = $this->db->get("Turma");
		return $turma;
    }
}

/* End of file database.php */
/* Location: ./application/models/database.php */