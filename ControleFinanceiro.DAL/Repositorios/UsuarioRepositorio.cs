using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class UsuarioRepositorio : RepositorioGenerico<Usuario>, IUsuarioRepositorio
    {
        private readonly Contexto _contexto;
        private readonly UserManager<Usuario> _gerenciadorUsuarios;
        private readonly SignInManager<Usuario> _gerenciadorLogin;

        public UsuarioRepositorio(
            Contexto contexto,
            UserManager<Usuario> gerenciadorUsuarios,
            SignInManager<Usuario> gerenciadorLogin
            ) : base(contexto)
        {
            _contexto = contexto;
            _gerenciadorUsuarios = gerenciadorUsuarios;
            _gerenciadorLogin = gerenciadorLogin;
        }

        public async Task<IdentityResult> CriarUsuario(Usuario usuario, string senha)
        {
            try
            {
                return await _gerenciadorUsuarios.CreateAsync(usuario, senha);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task IncluirUsuarioEmFuncao(Usuario usuario, string funcao)
        {
            try
            {
                await _gerenciadorUsuarios.AddToRoleAsync(usuario, funcao);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task LogarUsuario(Usuario usuario, bool lembrar)
        {
            try
            {
                await _gerenciadorLogin.SignInAsync(usuario, false);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> PegarQuantidadeUsuarioRegistrado()
        {
            try
            {
                return await _contexto.Usuarios.CountAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<Usuario> PegarUsuarioPeloEmail(string email)
        {
            try
            {
                return await _gerenciadorUsuarios.FindByEmailAsync(email);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
