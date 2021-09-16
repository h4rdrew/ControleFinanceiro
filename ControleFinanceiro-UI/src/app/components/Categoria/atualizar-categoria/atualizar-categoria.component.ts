import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private tiposService: TiposService,
    private categoriaService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.erros = [];
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
          nome: new FormControl(resultado.nome, [Validators.required, Validators.maxLength(50)]),
          icone: new FormControl(resultado.icone, [Validators.required, Validators.maxLength(15)]),
          tipoId: new FormControl(resultado.tipoId, [Validators.required]),
        });
      });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const categoria = this.formulario.value;
    this.erros = [];
    this.categoriaService
      .AtualizarCategoria(this.categoriaId, categoria)
      .subscribe(
        (resultado) => {
          this.router.navigate(['categorias/listagemcategorias']);
          this.snackBar.open(resultado.mensagem, null, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        (err) => {
          if (err.status === 400) {
            for (const campo in err.error.errors) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      );
  }

  VoltarListagem(): void {
    this.router.navigate(['categorias/listagemcategorias']);
  }
}
