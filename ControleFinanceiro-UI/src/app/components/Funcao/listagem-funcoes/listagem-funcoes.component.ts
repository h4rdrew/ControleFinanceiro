import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FuncoesService } from './../../../services/funcoes.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listagem-funcoes',
  templateUrl: './listagem-funcoes.component.html',
  styleUrls: ['./listagem-funcoes.component.scss'],
})
export class ListagemFuncoesComponent implements OnInit {
  funcoes = new MatTableDataSource<any>();
  displayedColumns: string[];
  autocompleteInput = new FormControl();
  opcoesFuncoes: string[] = [];
  nomesFuncoes: Observable<string[]>;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  constructor(
    private funcoesService: FuncoesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.funcoesService.PegarTodos().subscribe((resultado) => {
      resultado.forEach((funcao) => {
        this.opcoesFuncoes.push(funcao.name);
      });

      this.funcoes.data = resultado;
      this.funcoes.paginator = this.paginator;
      this.funcoes.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesFuncoes = this.autocompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['nome', 'descricao', 'acoes'];
  }

  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.funcoesService
        .FiltrarFuncoes(nome.toLowerCase())
        .subscribe((resultado) => {
          this.funcoes.data = resultado;
        });
    } else {
      if (nome === '') {
        this.funcoesService.PegarTodos().subscribe((resultado) => {
          this.funcoes.data = resultado;
        });
      }
    }

    return this.opcoesFuncoes.filter((funcao) =>
      funcao.toLowerCase().includes(nome.toLowerCase())
    );
  }

  AbrirDialog(funcaoId, nome): void {
    this.dialog
      .open(DialogExclusaoFuncoesComponent, {
        data: {
          funcaoId: funcaoId,
          nome: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.funcoesService.PegarTodos().subscribe((dados) => {
            this.funcoes.data = dados;
            this.funcoes.paginator = this.paginator;
          });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-funcoes',
  templateUrl: 'dialog-exclusao-funcoes.html',
})
export class DialogExclusaoFuncoesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcoesService: FuncoesService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirFuncao(funcaoId): void {
    this.funcoesService.ExcluirFuncao(funcaoId).subscribe((resultado) => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
