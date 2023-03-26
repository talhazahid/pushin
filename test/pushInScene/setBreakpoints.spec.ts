import { setupJSDOM } from '../setup';
import { PushInScene } from '../../src/pushInScene';
import { SceneSettings } from '../../src/types';
import { PUSH_IN_DEFAULT_BREAKPOINTS } from '../../src/constants';

describe('setBreakpoints', () => {
  let mockPushInScene: PushInScene;

  beforeEach(() => {
    setupJSDOM(`
        <!DOCTYPE html>
            <body>
                <div class="pushin">
                    <div class="pushin-scene"></div>
                </div>
            </body>
        </html>`);

    mockPushInScene = Object.create(PushInScene.prototype);
    mockPushInScene['container'] = <HTMLElement>document.querySelector('.pushin-scene');
    mockPushInScene['settings'] = <SceneSettings>{
      breakpoints: [],
      inpoints: [],
    };
  });

  it('Should set the default breakpoints', () => {
    mockPushInScene['setBreakpoints']();
    const result = mockPushInScene['settings'].breakpoints;
    const expected = [0, ...PUSH_IN_DEFAULT_BREAKPOINTS];
    expect(result).toEqual(expected);
  });

  it('Should set the breakpoints provided by data-attributes', () => {
    mockPushInScene['container'].setAttribute('data-pushin-breakpoints', '1,2,3');
    mockPushInScene['setBreakpoints']();
    const result = mockPushInScene['settings'].breakpoints;
    const expected = [0, 1, 2, 3];
    expect(result).toEqual(expected);
  });
});
