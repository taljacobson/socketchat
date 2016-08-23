import { Component, OnInit, OnDestroy } from '@angular/core';
import { Control } from "@angular/common";

import { ChatService } from "../../service/chat.service";

@Component({
  moduleId:module.id,
  selector: 'chat',
  templateUrl: 'chat.component.html',
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages:any = [];
  message:string;
  connection:any;
  username:string;
  alert:any = false
  constructor( private _ChatService:ChatService) {

  }

  ngOnInit(){
    this.connection = this._ChatService.getMessages().subscribe(message =>{
      console.log(message)
      this.messages.push(message)
    })
    this.username = this._ChatService.getUserName()
  }
  ngOnDestroy(){
    this.connection.unsubscribe()
  }
  sentMessage(){
    this._ChatService.sendMessage(this.message, this.username)
    this.message = '';
  }
  setUserName(){
    this._ChatService.setUserName(this.username);
    this.alert = 'username is set';

  }
}
