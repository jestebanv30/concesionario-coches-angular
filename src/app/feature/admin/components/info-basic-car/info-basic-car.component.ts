import {Component, Input, input, OnInit} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {BrandCarDto} from "../../../../core/dto/brandCarDto";
import {BrandCarService} from "../../../../core/service/brand-car.service";
import {NgForOf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-info-basic-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './info-basic-car.component.html',
  styleUrl: './info-basic-car.component.css'
})
export class InfoBasicCarComponent implements OnInit{

  @Input() public infoBasicForm: FormGroup;

  public listCarBrand: BrandCarDto[];

  constructor(private controlContainer: ControlContainer, private brandCarService: BrandCarService) {}

  ngOnInit(): void {
    this.brandCarService.getAllBrandsCar().subscribe({
      next: value => {
        this.listCarBrand = value;
      }
    })
  }
}
