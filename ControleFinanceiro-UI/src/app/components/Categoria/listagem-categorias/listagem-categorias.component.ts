import { FormControl } from '@angular/forms';
import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.scss'],
})
export class ListagemCategoriasComponent implements OnInit {
  categorias = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = [];
  nomesCategorias: Observable<string[]>;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoriasService.PegarTodos().subscribe((resultado) => {
      resultado.forEach((categoria) => {
        this.opcoesCategorias.push(categoria.nome);
      });

      this.categorias.data = resultado;
      this.categorias.paginator = this.paginator;
      this.categorias.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['nome', 'icone', 'tipo', 'acoes'];
  }

  AbrirDialog(categoriaId, nome): void {
    this.dialog
      .open(DialogExclusaoCategoriaComponent, {
        data: {
          categoriaId: categoriaId,
          nome: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.categoriasService.PegarTodos().subscribe((dados) => {
            this.categorias.data = dados;
          });

          this.displayedColumns = this.ExibirColunas();
        }
      });
  }

  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.categoriasService
        .FiltrarCategorias(nome.toLowerCase())
        .subscribe((resultado) => {
          this.categorias.data = resultado;
        });
    } else {
      if (nome === '') {
        this.categoriasService.PegarTodos().subscribe((resultado) => {
          this.categorias.data = resultado;
        });
      }
    }

    return this.opcoesCategorias.filter((categoria) =>
      categoria.toLowerCase().includes(nome.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-dialog-exclusao-categorias',
  templateUrl: 'dialog-exclusao-categorias.html',
})
export class DialogExclusaoCategoriaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirCategoria(categoriaId): void {
    this.categoriasService
      .ExcluirCategoria(categoriaId)
      .subscribe((resultado) => {
        this.snackBar.open(resultado.mensagem, null, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }
}
