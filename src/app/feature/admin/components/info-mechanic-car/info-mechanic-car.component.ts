import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-info-mechanic-car',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './info-mechanic-car.component.html',
  styleUrl: './info-mechanic-car.component.css'
})
export class InfoMechanicCarComponent implements OnInit{

  public infoMechanicForm: any;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.infoMechanicForm = this.controlContainer.control;
    this.infoMechanicForm = this.infoMechanicForm.controls('infoMechanicForm');
  }
}
