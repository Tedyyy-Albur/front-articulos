import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloServiceService } from '../service/articulo-service.service';
import { FormBuilder } from '@angular/forms';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss']
})
export class PartidaComponent {
  idCliente: any;
  datosCliente!: any[];

  displayedColumns: string[] = ['pedido', 'nombre', 'cantidad', 'totalPago' , 'cliente'];
  dataSource = ELEMENT_DATA;

  constructor(private router: ActivatedRoute, private articuloService: ArticuloServiceService, private fb: FormBuilder) {
    this.idCliente = router.snapshot.paramMap.get('id')
    articuloService.obtenerPedido(this.idCliente).subscribe(resp => {
      this.dataSource = resp;
    })
  }


  
}
