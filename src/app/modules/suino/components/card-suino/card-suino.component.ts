import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SuinoViewModel } from '../../../../models/Suino/SuinoViewModel';
import { SuinoService } from '../../../../services/suino.service';

@Component({
  selector: 'app-card-suino',
  templateUrl: './card-suino.component.html',
  styleUrl: './card-suino.component.css'
})
export class CardSuinoComponent {
  @Input() suino: SuinoViewModel = {} as SuinoViewModel;
  @Output() onDelete: any = new EventEmitter();

  constructor(private service: SuinoService, private router: Router) { }

  public contextMenuItems: MenuItem[] = [
    { label: 'Excluir', command: _ => this.delete(this.suino.id) },
    { label: 'Editar', command: _ => this.update(this.suino.id) },
    { label: 'Pesar', command: _ => this.pesar(this.suino.id) },
    { label: 'Ver Detalhes', command: _ => this.view(this.suino.id) },
  ]

  public delete(id: string) {
    this.service.delete(id).subscribe(_ => {
      this.onDelete.emit();
    });
  }

  public update(id: string) {
    this.router.navigate([`app/suinos/editar/${id}`]);
  }

  public view(id: string) {
    this.router.navigate([`app/suinos/detalhes/${id}`]);
  }

  public pesar(id: string) {
    this.router.navigate([`app/pesos/novo/${id}`]);
  }

  public calculateAge(dataNascimento: Date): number {
    return this.service.calculateAge(dataNascimento);
  }
}
