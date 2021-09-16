﻿using ControleFinanceiro.BLL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IUsuarioRepositorio : IRepositorioGenerico<Usuario>
    {
        Task<int> PegarQuantidadeUsuarioRegistrado();

        Task<IdentityResult> CriarUsuario(Usuario usuario, string senha);

        Task IncluirUsuarioEmFuncao(Usuario usuario, string funcao);

        Task LogarUsuario(Usuario usuario, bool lembrar);
    }
}