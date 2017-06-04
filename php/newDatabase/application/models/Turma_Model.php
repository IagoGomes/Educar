<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Turma_Model extends CI_Model {

    public function turma_infos($idTurma, $idDisciplina){
		$this->db->select('t.descricao as nome');
		$this->db->select('t.numMatriculados as quantAlunos');
		$this->db->select('s.numero as sala');
		$this->db->select('d.nome as disciplina');
		$this->db->select('u.nome as unidadeEscolar');

        $this->db->from('Turma  t');
        $this->db->from('Sala  s');
        $this->db->from('SalaTurma st');
        $this->db->from('Disciplina  d');
        $this->db->from('Disciplina_Grade dg');
        $this->db->from('UnidadeEscolar  u');
		
		$this->db->where("t.idTurma", $idTurma);
		$this->db->where("st.idTurma", $idTurma);
		$this->db->where("st.idSala = s.idSala");
		$this->db->where("t.idGrade = dg.idGrade");
		$this->db->where("d.idDisciplina",$idDisciplina);
		$this->db->where("dg.idDisciplina", $idDisciplina);
		$this->db->where("s.idUnidadeEscolar = u.idUnidadeEscolar");

		$turma = $this->db->get("Turma");
		return $turma;
    }

    public function get_alunos($idTurma, $idDisciplina){
    	$this->db->select('a.idAluno as idAluno');
    	$this->db->select('a.nome as nomeAluno');
    	$this->db->select('a.matricula as matriculaAluno');
    	$this->db->select('a.email as emailAluno');
    	    	
    	$this->db->from('Aluno a');
    	$this->db->from('Matricula m');

    	$this->db->where("a.idAluno = m.idAluno");
    	$this->db->where("m.idTurma", $idTurma);
    	$this->db->distinct();

    	$alunos = $this->db->get("Aluno");
    	return $alunos;
    }

    public function get_quant_alunos($idTurma, $idDisciplina){
    	$this->db->select('m.idAluno');

    	$this->db->from('Matricula m');

    	$this->db->where('m.idTurma', $idTurma);
        
    	$quantidade = $this->db->count_all_results();
          
    	return $quantidade;
    }
}

/* End of file database.php */
/* Location: ./application/models/database.php */