import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HammerGesturesManager } from '../core/touch';
import { IgxList, IgxListHeader, IgxListItem, IgxListModule, IgxListPanState } from './list.component';
import { Component, ViewChild, ContentChildren } from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var Simulator: any;

describe("List", function () {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IgxListModule],
            declarations: [ListTestComponent, ListWithPanningAllowed,
                ListWithLeftPanningAllowed, ListWithRightPanningAllowed]
        }).compileComponents();
    }));

    it('should initialize igx-list with item and header', () => {
        let fixture = TestBed.createComponent(ListTestComponent),
            list = fixture.componentInstance.list;

        expect(list).toBeDefined();
        expect(list instanceof IgxList).toBeTruthy();
        expect(list.items instanceof Array).toBeTruthy();
        expect(list.items.length).toBe(0);
        expect(list.headers instanceof Array).toBeTruthy();
        expect(list.headers.length).toBe(0);

        fixture.detectChanges();
        expect(list.items instanceof Array).toBeTruthy();
        expect(list.items.length).toBe(3);
        expect(list.items[0] instanceof IgxListItem).toBeTruthy();
        expect(list.headers instanceof Array).toBeTruthy();
        expect(list.headers.length).toBe(1);
        expect(list.headers[0] instanceof IgxListHeader).toBeTruthy();
    });

     it('should set/get properly layout properties: width, left, maxLeft', () => {
         let fixture = TestBed.createComponent(ListTestComponent),
             list = fixture.componentInstance.list, item,
             testWidth = 400, testLeft = -100;
             
         fixture.detectChanges();

         fixture.componentInstance.wrapper.nativeElement.style.width = testWidth + "px";

         fixture.detectChanges();
         expect(list.items.length).toBe(3);
         item = list.items[0];
         expect(item instanceof IgxListItem).toBeTruthy();
         expect(item.width).toBe(testWidth);
         expect(item.left).toBe(0);
         expect(item.maxLeft).toBe(-testWidth);
         item.left = testLeft;
         expect(item.left).toBe(testLeft);
     });

    it('should calculate properly item index', () => {
        let fixture = TestBed.createComponent(ListTestComponent),
            list = fixture.componentInstance.list;
        fixture.detectChanges();

        expect(list.children instanceof Array).toBeTruthy();
        expect(list.items instanceof Array).toBeTruthy();
        expect(list.headers instanceof Array).toBeTruthy();

        expect(list.children.length).toBe(4);
        expect(list.items.length).toBe(3);
        expect(list.headers.length).toBe(1);

        for (let i = 0; i < list.children.length; i++) {
            expect(list.children[i].index).toBe(i);
        }

        list.addChild(new IgxListItem(list, null, null));
        fixture.detectChanges();

        expect(list.children.length).toBe(5);
        expect(list.items.length).toBe(4);
        expect(list.headers.length).toBe(1);

        for (let i = 0; i < list.children.length; i++) {
            expect(list.children[i].index).toBe(i);
        }
    });

    it('should add/remove item/header', () => {
        let item, header,
            fixture = TestBed.createComponent(ListTestComponent),
            list = fixture.componentInstance.list;
        fixture.detectChanges();

        expect(list.children.length).toBe(4);
        expect(list.headers.length).toBe(1);
        expect(list.items.length).toBe(3);

        item = new IgxListItem(list, null, null);
        header = new IgxListHeader(list, null);

        list.addChild(header);
        list.addChild(item);    
        expect(list.children.length).toBe(6);
        expect(list.headers.length).toBe(2);
        expect(list.items.length).toBe(4);
        
        list.removeChild(header.index);
        list.removeChild(item.index);
        expect(list.children.length).toBe(4);
        expect(list.headers.length).toBe(1);
        expect(list.items.length).toBe(3);
    });

    it('Should pan right and pan left.', (done) => {
        var fixture, list: IgxList, item: IgxListItem, 
            itemNativeElement, itemHeight, itemWidth;

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ListWithPanningAllowed);
            list = fixture.componentInstance.list;

            fixture.detectChanges();

            item = list.items[0] as IgxListItem;
            itemNativeElement = item.element.nativeElement;
            itemHeight = item.element.nativeElement.offsetHeight;
            itemWidth = item.element.nativeElement.offsetWidth;

            spyOn(list.onLeftPan, "emit");
            spyOn(list.onRightPan, "emit");
            spyOn(list.onPanStateChange, "emit");

            return panRight(itemNativeElement, itemHeight, itemWidth, 200);
        }).then(function() {
            expect(item.panState).toBe(IgxListPanState.RIGHT);
            
            return panLeft(itemNativeElement, itemHeight, itemWidth, 200);            
        }).then(function() {
            expect(item.panState).toBe(IgxListPanState.NONE);
            
            return panLeft(itemNativeElement, itemHeight, itemWidth, 200);
        }).then(function() {
            expect(item.panState).toBe(IgxListPanState.LEFT);

            return panRight(itemNativeElement, itemHeight, itemWidth, 200);
        }).then(function() {
            expect(item.panState).toBe(IgxListPanState.NONE);
            expect(list.onLeftPan.emit).toHaveBeenCalledTimes(1);
            expect(list.onRightPan.emit).toHaveBeenCalledTimes(1);
            expect(list.onPanStateChange.emit).toHaveBeenCalledTimes(4);

            done();
        });
    }, 5000);

    it('Should pan right only.', (done) => {
        var fixture, list: IgxList, item: IgxListItem, 
            itemNativeElement, itemHeight, itemWidth;

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ListWithRightPanningAllowed);
            list = fixture.componentInstance.list;

            fixture.detectChanges();

            item = list.items[0] as IgxListItem;
            itemNativeElement = item.element.nativeElement;
            itemHeight = item.element.nativeElement.offsetHeight;
            itemWidth = item.element.nativeElement.offsetWidth;

            spyOn(list.onRightPan, "emit");
            spyOn(list.onPanStateChange, "emit");

            return panRight(itemNativeElement, itemHeight, itemWidth, 200);
        }).then(function() {
            expect(item.panState).toBe(IgxListPanState.RIGHT);

            return panLeft(itemNativeElement, itemHeight, itemWidth, 200);
        }).then (function() {
            expect(item.panState).toBe(IgxListPanState.NONE);

            return panLeft(itemNativeElement, itemHeight, itemWidth, 200);
        }).then (function() {
            expect(item.panState).toBe(IgxListPanState.NONE);
            expect(list.onRightPan.emit).toHaveBeenCalledTimes(1);
            expect(list.onPanStateChange.emit).toHaveBeenCalledTimes(2);

            done();
        });
    }, 5000);

    it('Should pan left only.', (done) => {
        var fixture, list: IgxList, item: IgxListItem, 
            itemNativeElement, itemHeight, itemWidth;

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ListWithLeftPanningAllowed);
            list = fixture.componentInstance.list;

            fixture.detectChanges();
            
            item = list.items[0] as IgxListItem;
            itemNativeElement = item.element.nativeElement;
            itemHeight = item.element.nativeElement.offsetHeight;
            itemWidth = item.element.nativeElement.offsetWidth;

            spyOn(list.onLeftPan, "emit");
            spyOn(list.onPanStateChange, "emit");

            return panLeft(itemNativeElement, itemHeight, itemWidth, 200);
        }).then(function() {
            expect(item.panState).toBe(IgxListPanState.LEFT);

            return panRight(itemNativeElement, itemHeight, itemWidth, 200);
        }).then (function() {
            expect(item.panState).toBe(IgxListPanState.NONE);

            return panRight(itemNativeElement, itemHeight, itemWidth, 200);
        }).then (function() {
            expect(item.panState).toBe(IgxListPanState.NONE);
            expect(list.onLeftPan.emit).toHaveBeenCalledTimes(1);
            expect(list.onPanStateChange.emit).toHaveBeenCalledTimes(2);

            done();
        });
    }, 5000);

    function panRight(item, itemHeight, itemWidth, duration) {
        var panOptions = { 
            pos: [0, itemHeight * 0.5], 
            duration: duration, 
            deltaX: itemWidth * 0.6,
            deltaY: 0
        };

        return new Promise(function(resolve, reject) {
             Simulator.gestures.pan(item, panOptions, function() {
                resolve();
            });
        });
    }

    function panLeft(item, itemHeight, itemWidth, duration) {
        var panOptions = {
            pos: [itemWidth, itemHeight * 0.5],
            duration: duration,
            deltaX: -(itemWidth * 0.6),
            deltaY: 0
        };

        return new Promise(function(resolve, reject) {
             Simulator.gestures.pan(item, panOptions, function() {
                resolve();
            });
        });
    }
});

@Component({
    template: `<div #wrapper>
                    <igx-list>
                        <igx-list-header>Header</igx-list-header>
                        <igx-list-item>Item 1</igx-list-item>
                        <igx-list-item>Item 2</igx-list-item>
                        <igx-list-item>Item 3</igx-list-item>
                    </igx-list>
                </div>`
})
class ListTestComponent {
     @ViewChild(IgxList) list: IgxList;
     @ViewChild("wrapper") wrapper;
}

@Component({
    template: `<div #wrapper>
                    <igx-list [allowRightPanning]="true" [allowLeftPanning]="true">
                        <igx-list-item [options]="{}">Item 1</igx-list-item>
                        <igx-list-item [options]="{}">Item 2</igx-list-item>
                        <igx-list-item [options]="{}">Item 3</igx-list-item>
                    </igx-list>
                </div>`
})
class ListWithPanningAllowed { 
    @ViewChild(IgxList) list: IgxList;
}

@Component({
    template: `<div #wrapper>
                <igx-list [allowRightPanning]="true" [allowLeftPanning]="false">
                    <igx-list-item [options]="{}">Item 1</igx-list-item>
                    <igx-list-item [options]="{}">Item 2</igx-list-item>
                    <igx-list-item [options]="{}">Item 3</igx-list-item>
                </igx-list>
            </div>`
})
class ListWithRightPanningAllowed {
    @ViewChild(IgxList) list: IgxList;
}

@Component({
    template: `<div #wrapper>
                <igx-list [allowLeftPanning]="true" [allowRightPanning]="false">
                    <igx-list-item [options]="{}">Item 1</igx-list-item>
                    <igx-list-item [options]="{}">Item 2</igx-list-item>
                    <igx-list-item [options]="{}">Item 3</igx-list-item>
                </igx-list>
            </div>`
})
class ListWithLeftPanningAllowed {
    @ViewChild(IgxList) list: IgxList;
}