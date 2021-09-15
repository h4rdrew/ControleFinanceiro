import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.scss'],
})
export class ListagemCategoriasComponent implements OnInit {
  categorias = new MatTableDataSource<any>();
  displayedColumns: string[];

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoriasService.PegarTodos().subscribe((resultado) => {
      this.categorias.data = resultado;
    });

    this.displayedColumns = this.ExibirColunas();
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
}

@Component({
  selector: 'app-dialog-exclusao-categorias',
  templateUrl: 'dialog-exclusao-categorias.html',
})
export class DialogExclusaoCategoriaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private categoriasService: CategoriasService
  ) {}

  ExcluirCategoria(categoriaId): void {
    this.categoriasService
      .ExcluirCategoria(categoriaId)
      .subscribe((resultado) => {});
  }
}
