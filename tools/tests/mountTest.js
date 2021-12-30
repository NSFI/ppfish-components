import React from 'react';
import { mount } from 'enzyme';
export default function mountTest(Component) {
    describe("mount and unmount", function () {
        it("component could be updated and unmounted without errors", function () {
            var wrapper = mount(React.createElement(Component, null));
            expect(function () {
                wrapper.setProps({});
                wrapper.unmount();
            }).not.toThrow();
        });
    });
}
