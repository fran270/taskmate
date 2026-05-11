import { Component, Input } from '@angular/core';

/* Esto es un decorador del componente 
que contiene las propiedades que necesita para
ejecutarse*/
@Component({
  selector: 'app-explore-container', // Selector y nombre de la etiqueta HTML del fichero tab1.page.html donde se va a cargar y mostrar el contenido del componente
  templateUrl: './explore-container.component.html', // En esta propiedad indicamos la ruta del html
  styleUrls: ['./explore-container.component.scss'], // En esta propiedad indicamos la ruta del scss
})


export class ExploreContainerComponent {
  @Input() name?: string;
}
