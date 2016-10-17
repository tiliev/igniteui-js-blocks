import { Component } from "@angular/core";
import { TabBarModule } from "../../src/tabbar/tab";
import { IgRippleModule } from '../../src/directives/ripple';

@Component({
    selector: "tabbar-sample",
    template: `
        <h3>TabBar</h3>
        <ig-tab-bar igRipple igRippleTarget="ul" alignment="bottom">
            <ig-tab label="Tab 1" icon="library_music">
            <h1>Tab 1 Content</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius sapien ligula. Donec consectetur accumsan suscipit. Praesent rutrum tellus blandit bibendum cursus. Vestibulum urna arcu, bibendum nec molestie ac, varius congue massa. Mauris porttitor viverra lacus. Donec efficitur purus id urna dapibus, vitae pharetra orci pellentesque. Vestibulum id lacus a magna euismod volutpat id in mi. Etiam a nunc ut tellus dictum porta. Donec in ligula a arcu sollicitudin finibus. Vivamus id lorem pulvinar, accumsan justo vitae, vehicula diam. Mauris vel quam at velit venenatis vulputate in quis nisl.</p>
            </ig-tab>
            <ig-tab label="Tab 2" icon="video_library">
            <h1>Tab 2 Content</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae malesuada odio. Praesent ante lectus, porta a eleifend vel, sodales eu nisl. Vivamus sit amet purus eu lectus cursus rhoncus quis non ex. Cras ac nulla sed arcu finibus volutpat. Vivamus risus ipsum, pharetra a augue nec, euismod fringilla odio. Integer id velit rutrum, accumsan ante a, semper nunc. Phasellus ultrices tincidunt imperdiet. Nullam vulputate mauris diam. Nullam elementum, libero vel varius fermentum, lorem ex bibendum nulla, pretium lacinia erat nibh vel massa. In hendrerit, sapien ac mollis iaculis, dolor tellus malesuada sem, a accumsan lectus nisl facilisis leo. Curabitur consequat sit amet nulla at consequat. Duis volutpat tristique luctus.</p>
            </ig-tab>
            <ig-tab label="Tab 3" icon="library_books">
            <h1>Tab 3 Content</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae malesuada odio. Praesent ante lectus, porta a eleifend vel, sodales eu nisl. Vivamus sit amet purus eu lectus cursus rhoncus quis non ex. Cras ac nulla sed arcu finibus volutpat. Vivamus risus ipsum, pharetra a augue nec, euismod fringilla odio. Integer id velit rutrum, accumsan ante a, semper nunc. Phasellus ultrices tincidunt imperdiet. Nullam vulputate mauris diam. Nullam elementum, libero vel varius fermentum, lorem ex bibendum nulla, pretium lacinia erat nibh vel massa. In hendrerit, sapien ac mollis iaculis, dolor tellus malesuada sem, a accumsan lectus nisl facilisis leo. Curabitur consequat sit amet nulla at consequat. Duis volutpat tristique luctus.</p>
            </ig-tab>
        </ig-tab-bar>
    `
})
export class TabBarSampleComponent { }
