import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloServiceService } from '../service/articulo-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Pedidos } from '../interfaces/pedidos';
import { PartidaPedido } from '../interfaces/partida-pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

  valor!: any[];
  articulos!: any[];
  idCliente: any = 0;
  idPedido: any = 0;
  idArticulo: any = 0;
  pedidos!: Pedidos;
  mostrarPedidos!: Pedidos[];
  guardarPartida!: PartidaPedido;



  miFormulario: FormGroup = this.fb.group({
    descripcion: [, [Validators.required, Validators.minLength(3)]],

  })
  constructor(private router: Router, private articuloService: ArticuloServiceService, private fb: FormBuilder) {
    this.articuloService.obtenerClientes().subscribe(resp => {
      this.valor = resp.informacion.clientes;
    });
  }
  campoEsValido(campo: string) {
    //CON ESTO Y EL CONTROLS PODEMOS VER ALGUNAS DE LAS FUNCIONES QUE TIENE Y PODERLAS USAR
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
  }

  seleccionado(event: MatSelectionListChange) {
    this.idCliente = event.options[0].value;
    this.idPedido = 0;
    this.articuloService.obtenerPedidos(this.idCliente).subscribe(resp => {
      this.mostrarPedidos = resp.informacion.exito;
    })

  }
  seleccionadoPedido(event: MatSelectionListChange) {

    this.idPedido = event.options[0].value;
    if (this.idPedido != 0) {
      this.articuloService.obtenerArticulo().subscribe(resp => {
        this.articulos = resp.informacion.articulos;
      });
    }

  }
  seleccionadoArticulo(event: MatSelectionListChange) {
 
    this.idArticulo = event.options[0].value;
  }
  guardar() {
    if (this.idCliente != null) {
      this.pedidos = {
        idPedido: 0,
        idCliente: this.idCliente,
        descripcion: this.miFormulario.value.descripcion
      }

      this.articuloService.guardarPedidos(this.pedidos).subscribe(resp => {
        if (resp.informacion.exito == 1) {
          window.location.reload();
        }
      })
    }
  }

  guardarPartidaform: FormGroup = this.fb.group({
    cantidad: [, [Validators.required, Validators.min(1)]],

  })
  campoEsValidoPartida(campo: string) {
    //CON ESTO Y EL CONTROLS PODEMOS VER ALGUNAS DE LAS FUNCIONES QUE TIENE Y PODERLAS USAR
    return this.guardarPartidaform.controls[campo].errors &&
      this.guardarPartidaform.controls[campo].touched
  }
  pdfUrl: string | ArrayBuffer | null = null;
  guardarPartidaPedido() {
    this.guardarPartida = {
      idPartida: 0,
      idPedido: this.idPedido,
      idArticulo: this.idArticulo,
      cantidad: this.guardarPartidaform.value.cantidad
    }
    this.articuloService.guardarPartidaPedido(this.guardarPartida).subscribe(resp => {

      if (resp.informacion.exito == 1) {
        this.router.navigate(['partida', this.idCliente]);

        this.articuloService.imprimirPedido(this.idCliente).subscribe(resp => {
          
          const byteCharacters = atob(resp.base64);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // Abre el PDF en una nueva ventana o pestaña del navegador
          const url = window.URL.createObjectURL(blob);
          window.open(url);


        })

      }
    }
    )

  }

}
