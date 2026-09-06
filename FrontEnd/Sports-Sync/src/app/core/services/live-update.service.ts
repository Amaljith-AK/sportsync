import { Injectable, signal } from "@angular/core";
import { LiveUpdate, SOCKET_URL } from "./service.model";

@Injectable({providedIn:'root'})

export class LiveUpdateService {

    private socket:WebSocket | null = null
    private readonly _liveUpdates = signal<Map<number,LiveUpdate>>(new Map)

    readonly liveUpdates = this._liveUpdates.asReadonly()

    connect():void{
        if(this.socket && this.socket.readyState === WebSocket.OPEN){
            return ;
        }

        const wsUrl = SOCKET_URL

        this.socket = new WebSocket(wsUrl)

        this.socket.onopen = ()=>{
            console.log('✅ Connected to live updates')
        }

        this.socket.onmessage = (event)=>{
            try{
                const data:LiveUpdate = JSON.parse(event.data)
                this._liveUpdates.update((map)=>{
                    const updated = new Map(map)
                    updated.set(data.matchId,data)
                    return updated
                })
            }catch(err){
                console.error('Failed to parse live update', err);
            }
        }

        this.socket.onerror = (err)=>{
            console.error('❌ WebSocket error', err);
        }

        this.socket.onclose = ()=>{
            console.log('🔌 Disconnected from live updates — will retry in 5s');
            this.socket = null
            setTimeout(()=>this.connect(),5000)
        }
        
    }

    disconnect(){
        this.socket?.close()
        this.socket = null
    }

    getUpdateFormMatch(matchId:number):LiveUpdate | undefined{
        return this._liveUpdates().get(matchId)
    }
}