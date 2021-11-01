import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { VaccinneDetailsModel } from 'src/app/model/user/vaccinne-details';
import { VaccinneListModel } from 'src/app/model/user/vaccinne-list';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss']
})
export class VaccineListComponent implements OnInit, AfterContentInit {
  public model: VaccinneListModel;
  public selectedModel: VaccinneDetailsModel
  public isReady = false;

  constructor(private modelService: UserService, 
    private messageService: MessageService,
    private router: Router) { 
      this.model = {
        notActive: [],
        active: [],
        testList: []
      }
      this.selectedModel = {
      }
    }

  ngOnInit(): void {
    this.modelService.getVaccineListModel().subscribe(
      (response) => { this.model = {...response}},
      (error)=>{
        if (error && error instanceof Array)
        {
          error.forEach(item =>{
            const message: Message = { severity: 'error', summary: 'Error', detail: item as string};
            this.messageService.add(message);
          })
        }
      }
    )
  }

  ngAfterContentInit(): void {
    this.isReady = true;
  }

  public get statusIcon(): string{
    return this.model?.isProtect ? 'assets/check.svg' : 'assets/attention.svg';
  }
  
  public get hasInactiveVaccine(): boolean {
    if (!this.model?.notActive){
      return false;
    }
    return this.model?.notActive?.length > 0;
  }

  public get hasActiveVaccine(): boolean {
    if (!this.model?.active){
      return false;
    }
    return this.model?.active?.length > 0;
  }

  public clickVaccine(guid: string|undefined) {
    this.modelService.getVaccineDetailsModel(guid ?? '').subscribe(
      (response) => {
        this.selectedModel = { ...response }
      },
      (error)=>{
        if (error && error instanceof Array)
        {
          error.forEach(item =>{
            const message: Message = { severity: 'error', summary: 'Error', detail: item as string};
            this.messageService.add(message);
          })
        }
      }
    )
  }

  public okClick(){
    if (this.hasSelectedModel) {
      this.selectedModel = {};
    }
    else {
      this.router.navigate(['/check-in']);
    }
  }

  public get hasSelectedModel():boolean{
    return this.selectedModel.guid !== undefined;
  }

  public toggle(id: string){
    const element = document.getElementById(id);
    if (element?.classList.contains('open')){
      element.classList.remove('open')
    } else {
      element?.classList.add('open');
    }
  }

  public getTestIcon(isActive: boolean|undefined){
    return isActive ? 'assets/check.svg' : 'assets/attention.svg'
  }
}
