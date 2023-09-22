import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloServiceService } from '../service/articulo-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulos } from '../interfaces/articulos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent {
  articulos!: any[];
  datosCliente: Articulos = {
    idArticulo: 0,
    nombre: '',
    descripcion: '',
    precio: '',
  };
  miFormulario: FormGroup =this.fb.group({
    nombre:[, [Validators.required, Validators.minLength(3)]],
    descripcion:[, [Validators.required,]],
    precio:[, [Validators.required,]],
    
  })
  constructor(private router: Router, private articuloService: ArticuloServiceService, private fb:FormBuilder){
    this.articuloService.obtenerArticulo().subscribe( resp => {
      this.articulos = resp.informacion.articulos;
     });
  }
  campoEsValido(campo:string){
    //CON ESTO Y EL CONTROLS PODEMOS VER ALGUNAS DE LAS FUNCIONES QUE TIENE Y PODERLAS USAR
    return this.miFormulario.controls[campo].errors && 
          this.miFormulario.controls[campo].touched
  }
  editar(item: Articulos){
    this.datosCliente = item;
    this.miFormulario.setValue({
      nombre: this.datosCliente.nombre,
      descripcion: this.datosCliente.descripcion,
      precio: this.datosCliente.precio
    })
  }

  guardar(){
    this.datosCliente = {
      idArticulo: 0,
      nombre: this.miFormulario.value.nombre,
      descripcion: this.miFormulario.value.descripcion,
      precio: this.miFormulario.value.precio,
     }
     this.articuloService.guardarArticulo(this.datosCliente).subscribe(resp => {
      if (resp.informacion.exito == 1) {
        this.articuloService.obtenerArticulo().subscribe( resp => {
          this.articulos = resp.informacion.articulos;
          window.location.reload();
         });
      }
     });
     
  }

  actualizar(id: number){
    this.datosCliente = {
     idArticulo: id,
     nombre: this.miFormulario.value.nombre,
     descripcion: this.miFormulario.value.descripcion,
     precio: this.miFormulario.value.precio,
    }
    this.articuloService.editarArticulos(this.datosCliente).subscribe(resp => {
      
      if (resp.informacion.exito == 1) {
        window.location.reload()
      }
    });
    
   
 }
  borrar(id: number){
    this.articuloService.borrarArticulo(id).subscribe(resp => {
      if (resp.informacion.exito == 1) {
        window.location.reload()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El articulo sigue en existencia.',
        })
      }
    });
  
}

}
