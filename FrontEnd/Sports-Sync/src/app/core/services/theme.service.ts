import { Injectable } from "@angular/core";
import { THEME_CLASSES } from "./service.model";

@Injectable({ providedIn: 'root' })

export class ThemeService {
    setTheme(sport:'football' | 'f1' | 'tennis' | 'nba'):void{
        this.playWipeAnimation()

        setTimeout(()=>{
            THEME_CLASSES.forEach((cls)=>{
                document.body.classList.remove(cls)
                if(sport != 'football'){
                    document.body.classList.add(`theme-${sport}`)
                }
            })
        },150)
    }

    playWipeAnimation():void{
        const overlay = document.createElement('div')
        overlay.className = 'theme-wipe-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('animationend',()=>{
            overlay.remove()
        })
    }
}