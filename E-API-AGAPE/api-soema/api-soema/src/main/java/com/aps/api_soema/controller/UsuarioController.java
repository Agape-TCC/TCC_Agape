package com.aps.api_soema.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.api_soema.model.Usuario;
import com.aps.api_soema.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    // POST /usuario → cria novo usuário
    @CrossOrigin(origins = "*")
    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    // GET /usuario → lista todos os usuários
    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }

    // GET /usuario/{id} → busca usuário por ID
    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable("id") Long id_usuario) {
        return repository.findById(id_usuario).orElse(null);
    }

    // PUT /usuario/{id} → atualiza usuário existente
    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable("id") Long id_usuario,
                             @RequestBody Usuario novoUsuario) {
        return repository.findById(id_usuario).map(usuario -> {
            usuario.setEmail(novoUsuario.getEmail());
            usuario.setSenha(novoUsuario.getSenha());
            usuario.setTelefone(novoUsuario.getTelefone());
            usuario.setId_tipo(novoUsuario.getId_tipo());
            return repository.save(usuario);
        }).orElse(null);
    }

    // DELETE /usuario/{id} → exclui usuário por ID
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable("id") Long id_usuario) {
        repository.deleteById(id_usuario);
    }
}