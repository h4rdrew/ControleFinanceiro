import { FormControl, FormGroup } from '@angular/forms';
import { CategoriasService } from './../../../services/categorias.service';
import { TiposService } from './../../../services/tipos.service';
import { Tipo } from './../../../models/Tipo';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.scss'],
})
export class AtualizarCategoriaComponent implements OnInit {
  nomeCategoria: string;
  categoriaId: number;
  categoria: Observable<Categoria>;
  tipos: Tipo[];
  formulario: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tiposService: TiposService,
    private categoriaService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params.id;
    this.tiposService.PegarTodos().subscribe((resultado) => {
      this.tipos = resultado;
    });

    this.categoriaService
      .PegarCategoriaPeloId(this.categoriaId)
      .subscribe((resultado) => {
        this.nomeCategoria = resultado.nome;
        this.formulario = new FormGroup({
          categoriaId: new FormControl(resultado.categoriaId),
          nome: new FormControl(resultado.nome),
          icone: new FormControl(resultado.icone),
          tipoId: new FormControl(resultado.tipoId),
        });
      });
  }

  get propriedade() {
    return this.formulario;
  }

  EnviarFormulario(): void {
    const categoria = this.formulario.value;
    this.categoriaService
      .AtualizarCategoria(this.categoriaId, categoria)
      .subscribe((resultado) => {
        this.router.navigate(['categorias/listagemcategorias']);
      });
  }

  VoltarListagem(): void {
    this.router.navigate(['categorias/listagemcategorias']);
  }
}
