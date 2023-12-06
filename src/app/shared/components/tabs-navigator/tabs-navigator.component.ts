import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabData } from 'app/shared/interfaces/tab-data.interface';

@Component({
    selector: 'app-tabs-navigator',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: 'tabs-navigator.component.html',
    styleUrls: ['./tabs-navigator.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsNavigatorComponent {
    @Input() tabsNames: TabData[] = [];
    @Output() tabChosen = new EventEmitter<string>();
    @Output() tabDeleted = new EventEmitter<string>();

    currentSelected = 0;

    tabSelected(link:string, index:number) :void {
        this.currentSelected = index;  
        this.tabChosen.emit(link)
    }

    deleteTab(link:string, index: number): void {
        if(this.currentSelected === index) {
            this.currentSelected = 0;
        }
        this.tabDeleted.emit(link);
    }

}
