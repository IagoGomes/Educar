<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Turma_Model extends CI_Model {

    public function turma_infos($idTurma, $idDisciplina){
        /*
            SELECT t.descricao as nome, s.numero as sala, d.nome as disciplina, u.nome as unidadeEscolar 
            FROM Turma t, Sala s, SalaTurma st, Disciplina d, Disciplina_Grade dg, UnidadeEscolar u
            WHERE t.idTurma=4 and st.idTurma=4 and st.idSala=s.idSala and t.idGrade=dg.idGrade and 
            dg.idDisciplina_Grade = 2 and dg.idDisciplina = d.idDisciplina and s.idUnidadeEscolar = u.idUnidadeEscolar

        */
		$this->db->select('t.descricao as nome');
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
		$this->db->where("dg.idDisciplina_Grade", $idDisciplina);
		$this->db->where("dg.idDisciplina = d.idDisciplina");
		$this->db->where("s.idUnidadeEscolar = u.idUnidadeEscolar");

		$turma = $this->db->get("Turma");
		return $turma;
    }

    public function get_alunos($idTurma, $idDisciplina){
    	$this->db->select('a.idAluno as idAluno');
    	$this->db->select('a.nome as nomeAluno');
    	$this->db->select('a.matricula as matriculaAluno');
    	$this->db->select('a.email as emailAluno');
    	$this->db->select('a.sexo as sexo');
    	    	
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

    public function get_notas_alunos($idTurma, $idDisciplina){

        /**

SELECT a.ordem as ordem,da.idDisciplinaAvaliacao as idDisciplinaAvaliacao, al.idAluno as idAluno, m.idMatricula as matricula, da.nota as nota FROM Avaliacao a, Matricula m, Aluno al, MatriculaDisciplina md, DisciplinaAvaliacao da WHERE m.idTurma=2 and m.idAluno = al.idAluno and md.idDisciplina_Grade=2 and md.idMatricula = m.idMatricula and da.idMatriculaDisciplina = md.idMatriculaDisciplina and da.idAvaliacao = a.id
        */
    	$this->db->select('a.ordem as ordem');
    	$this->db->select('da.idDisciplinaAvaliacao as idDisciplinaAvaliacao');
    	$this->db->select('al.idAluno as idAluno');
  	$this->db->select('m.idMatricula as matricula');
  	$this->db->select('da.nota as nota');

    	$this->db->from('Avaliacao a');
    	$this->db->from('Matricula m');
    	$this->db->from('Aluno al');
    	$this->db->from('MatriculaDisciplina md');
    	$this->db->from('DisciplinaAvaliacao da');

    	$this->db->where("m.idTurma", $idTurma);
    	$this->db->where("m.idAluno = al.idAluno");
    	$this->db->where("md.idDisciplina_Grade", $idDisciplina);
    	$this->db->where("md.idMatricula = m.idMatricula");
    	$this->db->where("da.idMatriculaDisciplina = md.idMatriculaDisciplina");
    	$this->db->where("da.idAvaliacao = a.id");

        $this->db->order_by("m.idMatricula", "asc");

        $notas = $this->db->get(); 

        return $notas;
    }

    public function mudar_nota_aluno($idDisciplinaAvaliacao, $nota){
	$this->db->set('nota', $nota, FALSE);

	$this->db->where('idDisciplinaAvaliacao', $idDisciplinaAvaliacao);

	$this->db->update('DisciplinaAvaliacao'); 

        return $nota;
    }
}

/* End of file database.php */
/* Location: ./application/models/database.php */
