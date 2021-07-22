import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import 'regenerator-runtime/runtime'

configure({
    adapter: new Adapter()
});
