import chai from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme()) // Note the invocation at the end

global.expect = expect;
global.sinon = sinon;
global.spy = spy;

global.mount = mount;
global.render = render;
global.shallow = shallow;