import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloServiceService } from '../service/articulo-service.service';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clientes } from '../interfaces/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  valor!: any[];
  idCliente: any;
  datosCliente: Clientes = {
    idCliente: 0,
    nombre: '',
    apellidos: '',
    rfc: '',
  };
  state: boolean = false;

  miFormulario: FormGroup =this.fb.group({
    nombre:[, [Validators.required, Validators.minLength(3)]],
    apellidos:[, [Validators.required,]],
    rfc:[, [Validators.required,this.rfcValidator]],
    
  })

  rfcValidator(control: FormControl) {
    const rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]$/; // Expresión regular para validar RFC
    const rfc = control.value;

    if (!rfcPattern.test(rfc)) {
      return { invalidRFC: true };
    }

    return null;
  }

  constructor(private router: Router, private articuloService: ArticuloServiceService, private fb:FormBuilder){
    this.articuloService.obtenerClientes().subscribe( resp => {
      this.valor = resp.informacion.clientes;
     });

     
  }
 

  seleccionado(event: MatSelectionListChange){
    this.idCliente = event.options[0].value;
    let index = this.valor.findIndex(cliente => cliente.idCliente == this.idCliente);
    this.datosCliente = this.valor[index];
    this.state = true;

    this.miFormulario.setValue({
      nombre: this.datosCliente.nombre,
      apellidos: this.datosCliente.apellidos,
      rfc: this.datosCliente.rfc
    })
    
    
  }
  campoEsValido(campo:string){
    //CON ESTO Y EL CONTROLS PODEMOS VER ALGUNAS DE LAS FUNCIONES QUE TIENE Y PODERLAS USAR
    return this.miFormulario.controls[campo].errors && 
          this.miFormulario.controls[campo].touched
  }
  
  guardar(){
    this.datosCliente = {
      idCliente: 0,
      nombre: this.miFormulario.value.nombre,
      apellidos: this.miFormulario.value.apellidos,
      rfc: this.miFormulario.value.rfc,
     }
     this.articuloService.guardarClientes(this.datosCliente).subscribe(resp => {
        if (resp.informacion.exito == 1) {
          this.articuloService.obtenerClientes().subscribe( resp => {
            this.valor = resp.informacion.clientes;
           });
        }
     });
  }
  actualizar(id: number){
     this.datosCliente = {
      idCliente: id,
      nombre: this.miFormulario.value.nombre,
      apellidos: this.miFormulario.value.apellidos,
      rfc: this.miFormulario.value.rfc,
     }
     this.articuloService.editarClientes(this.datosCliente).subscribe(resp => {
      if (resp.informacion.exito == 1) {
        window.location.reload()
      }
    
     })
  }

  borrar(id: number){
    
    this.articuloService.borrarClientes(id).subscribe(resp => {
      if (resp.informacion.exito == 1) {
        window.location.reload()
      }

  })
}

}
