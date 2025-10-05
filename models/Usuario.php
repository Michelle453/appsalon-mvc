<?php

namespace Model;

class Usuario extends ActiveRecord{
    // DB 
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'contrasena', 'telefono', 'admin', 'confirmado', 'token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $contrasena;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = []){
        $this->id = $args['id']??null;
        $this->nombre = $args['nombre']??'';
        $this->apellido = $args['apellido']??'';
        $this->email = $args['email']??'';
        $this->contrasena = $args['contrasena']??'';
        $this->telefono = $args['telefono']??'';
        $this->admin = $args['admin']??0;
        $this->confirmado = $args['confirmado']??0;
        $this->token = $args['token']??'';
    }

    // mensajes de validacion para la creacion de una cuenta
    public function validaruevaCuenta(){
        if(!$this->nombre){
            self::$alertas['error'][] = 'El nombre es obligatorio';
        }
        if(!$this->apellido){
            self::$alertas['error'][] = 'El apellido es obligatorio';
        }
        if(!$this->telefono){
            self::$alertas['error'][] = 'El telefono es obligatorio';
        }
        if(!$this->email){
            self::$alertas['error'][] = 'El email es obligatorio';
        }
        if(!$this->contrasena){
            self::$alertas['error'][] = 'El password es obligatorio';
            
        }
        if(strlen($this->contrasena)<6){
            self::$alertas['error'][] = 'El password debe tener al menos 6 caracteres';
        }
        return self::$alertas;
    }

    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = 'El email es obligatorio';
        }
        if(!$this->contrasena){
            self::$alertas['error'][] = 'El password es obligatorio';
        }
        return self::$alertas;
    }

    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = 'El email es obligatorio';
        }
        return self::$alertas;
    }

    public function validarPassword(){
        if(!$this->contrasena){
            self::$alertas['error'][] = 'El Password es obligatorio';
        }
        if(strlen($this->contrasena)<6){
            self::$alertas['error'][] = 'El Password debe tener al menos 6 carácteres';
        }
        return self::$alertas;
    }

    // revisa si el usuario ya existe
    public function existeUsuario(){
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";

        $resultado = self::$db->query($query);
        if($resultado->num_rows){
            self::$alertas['error'][] = 'El usuario ya se encuentra registrado';
        }
        return $resultado;
    }

    public function hashPassword(){
        $this->contrasena = password_hash($this->contrasena, PASSWORD_BCRYPT);
    }

    public function crearToken(){
        $this->token = uniqid();
    }

    public function comprobarPasswordAndVerificado($password){
        $resultado = password_verify($password, $this->contrasena);
        if(!$resultado || !$this->confirmado){
            self::$alertas['error'][] = "Password incorrecto o tu cuenta no ha sido confirmada";
        }else{
            return true;
        }
    }
}