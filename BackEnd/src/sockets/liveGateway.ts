import { Server } from "node:http";
import { WebSocketServer,WebSocket } from "ws";


let wss:WebSocketServer
const clients = new Set<WebSocket>();

export function initLiveGateway(server:Server){
    wss = new WebSocketServer({server})


    wss.on('connection',(ws)=>{
        clients.add(ws)
        console.log('🔌 Client connected to live gateway');

        ws.on('clsoe',()=>{
            clients.delete(ws)
        })
    })
}


export function broadcastLiveUpdate(payload:unknown){
    const message = JSON.stringify(payload)
    clients.forEach(client=>{
        if(client.readyState === WebSocket.OPEN){
            client.send(message)
        }
    })
}