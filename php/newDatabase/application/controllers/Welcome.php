<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Welcome extends REST_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->helper('url');

		$this->load->view('welcome_message');
	}

	public function db_get(){

		$this->load->model('database');
		//$id='1';
		$username = $this->get('username');
		$password= $this->get('password');
		$users = $this->database->users($username, $password)->row_array();

		if($users){
		    $this->response($users, REST_Controller::HTTP_OK);        
		}
		else {
		    $result = [array('username'=> false, 'password'=> false)];
		    $this->response($result, REST_Controller::HTTP_OK);
		}

	}

        public function users_get() {
            $this->response("my first api");
        }	

}
