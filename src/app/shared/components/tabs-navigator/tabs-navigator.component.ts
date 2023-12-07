import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
    @Input() tabsData: TabData[] = [];
    @Output() tabDeleted = new EventEmitter<string>();

    currentSelected : (string | number ) = 0;

    deleteTab(tabId:string, index: number): void {
        if(this.currentSelected === index) {
            this.currentSelected = 0;
        }
        this.tabDeleted.emit(tabId);
    }

    trackByFn(_: number, item: TabData): (string | number) {
        return item.tabId; 
    }

}
