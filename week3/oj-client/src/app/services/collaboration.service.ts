import { Injectable } from '@angular/core';
// import { COLORS } from '../../assets/colors';

declare var io: any;
// declare var ace: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;
  // clientsInfo: Object = {};
  // clientsNum: number = 0;

  constructor() { }

  init(editor:any, sessionID:string): void{

    // this.collaborationSocket = io(window.location.origin,
  	// 								{query: 'message=' + '123'});

  	this.collaborationSocket = io(window.location.origin, {query: 'sessionID=' + sessionID});

    this.collaborationSocket.on("message", (message) => {
      console.log("received: " + message);
    })

  	//change from server
  	this.collaborationSocket.on('change', (changeInEditor: string) => {
  		console.log("Collaboration service: editor changes" + changeInEditor);
  		changeInEditor = JSON.parse(changeInEditor);
  		editor.lastAppliedChange = changeInEditor;
  		editor.getSession().getDocument().applyDeltas([changeInEditor]);
  	});

    // this.collaborationSocket.on('cursorMove', (cursor: string) => {
    //   console.log("Coolaboration service: cursor moves " + cursor);
    //   cursor = JSON.parse(cursor);
    //   let x = cursor["row"];
    //   let y = cursor["column"];
    //   let changeClientID = cursor["socketID"];
    //   let session = editor.getSession();
    //   if(changeClientID in this.clientsInfo){
    //     session.removeMarker(this.clientsInfo[changeClientID]['marker']);
    //   }else{
    //     this.clientsInfo[changeClientID] = {};
    //     let css = document.createElement("style");
    //     css.type = 'text/css';
    //     css.innerHTML = '.editorCursor_'+changeClientID +
    //                     '{position:absolute; background:' + COLORS[this.clientsNum] + ';' +
    //                     'z-index:100; width: 2px !important;}';
    //     document.body.appendChild(css);
    //     this.clientsNum += 1;
    //   }
    //   //draw a new marker
    //   let Range = ace.require('ace/range').Range;
    //   let newMarker = session.addMarker(new Range(x, y, x, y+1),
    //                                     'editorCursor_'+changeClientID,
    //                                     true);
    //   this.clientsInfo[changeClientID]['marker'] = newMarker;
    // });
  }
  change(changeInEditor: string): void{
    this.collaborationSocket.emit('change', changeInEditor);
  }
  // cursorMove(cursor: string): void{
  //   this.collaborationSocket.emit('cursorMove', cursor);
  // }
  // //
  // restoreBuffer(): void{
  //   this.collaborationSocket.emit('restoreBuffer');
  // }
}
