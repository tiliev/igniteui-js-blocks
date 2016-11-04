import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { Modal, ModalModule } from './modal';

describe("Modal", function () {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule],
            declarations: [Alert, CustomDialog]
        }).compileComponents();
    }));

    it("Should set modal title.", () => {
        let fixture = TestBed.createComponent(Alert),
            expectedTitle = "alert";
        
        fixture.detectChanges();
        let titleDebugElement = fixture.debugElement.query(By.css(".ig-modal__window-title"));
        expect(titleDebugElement.nativeElement.textContent.trim()).toEqual(expectedTitle);
    });

    it("Should set modal message.", () => {
        let fixture = TestBed.createComponent(Alert),
            expectedMessage = "message";

        fixture.detectChanges();

        let messageDebugElement = fixture.debugElement.query(By.css(".ig-modal__window-content"));
        expect(messageDebugElement.nativeElement.textContent.trim()).toEqual(expectedMessage);
    });

    it("Should set custom modal message.", () => {
        
    });

    it("Should set action 1 and action 2 properties.", () => {

    });

    it("Should test open method.", () => {

    });

    it("Should test close method.", () => {
        
    });

    it("Should test events.", () => {
        // onClose
        // onOpen
        // onAction1Select
        // onAction2Select
    });

    it("Should test backgroundClick.", () => {

    });
});

@Component({ template: `<ig-modal title="alert" message="message"></ig-modal>` })
class Alert {
}

@Component({ template: `<ig-modal title="dialog" message="message"
                            action1ButtonLabel="action1"
                            action1ButtonType="raised"
                            action1ButtonColor="pink"
                            action1ButtonBackgroundColor="darkblue"
                            action1ButtonRipple="pink"
                            action2ButtonLabel="action2"
                            action2ButtonType="raised"
                            action2ButtonColor="orange"
                            action2ButtonBackgroundColor="darkblue"
                            action2ButtonRipple="orange">
                        </ig-modal>` })
class Dialog {

}

@Component({ template: `<ig-modal title="custom-dialog">
                            <div class="custom-dialog__content">
                                <input class="custom-dialog__content-input" type="text" />
                            </div>
                        </ig-modal>` })
class CustomDialog {
}