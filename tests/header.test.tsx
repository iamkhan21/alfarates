import { h } from 'preact';
import Header from '@components/core/header';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Header', () => {
    test('should have brand label', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('h1').text()).toBe('TodayRate');
    });
});
