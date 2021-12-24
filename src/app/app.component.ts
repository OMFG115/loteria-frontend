import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { CardRepository } from './repositories/cards.repository';
import { Card } from './models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  modalAction: any;
  closeResult = '';
  quantity: number = 0;
  arrayTable: Array<number[]> = [];
  cards: Card[] = [];
  page = 1;
  collection = 1;
  show: boolean = false;
  
  constructor(
    private modalService: NgbModal,
    private cR: CardRepository
  ) {}

  @ViewChild('content') modal: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.open(this.modal);
  }

  open(content: any) {
    this.modalAction = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static'});
    this.modalAction.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  createTable(): number[]{
    return Array.from({length: 16 }, () => Math.floor(Math.random()*54)+1);
  }

  validateArray( array: number[] ): boolean{
    if(this.arrayTable.length != 0){
      for (let x = 0; x < this.arrayTable.length; x++) {
        let aux1 = this.arrayTable[x].sort();
        let aux2 = array.sort();
        if(aux1 === aux2){
          return false;
        }
      }
    }
    return true;
  }

  createTableArray( tableTotal: number ){
    let flag: number = 0;
    let table = [];
    let checkTable: number;
    do {
      table = this.createTable();
      checkTable = new Set(table).size;
      if(checkTable===table.length){
        if( this.validateArray( table )){
          this.arrayTable.push(table);
          flag++;
        }
      }
    } while (flag != tableTotal);
    console.log("ARRAY", this.arrayTable);
  }

  getAllCards(){
    if(this.cards.length==0){
      this.cR.getAllCards().subscribe(
        response => {
          this.cards = response;
        }, error => { console.log(error); }
      );
    }
    this.arrayTable=[];
    this.createTableArray(this.quantity);
    this.page=1;
    this.modalAction.close();
    this.show = true;
  }

  changeQuantity(content: any){
    this.open(content);
    this.show = false;
  }
}
