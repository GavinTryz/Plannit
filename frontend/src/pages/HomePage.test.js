import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {MemoryRouter} from 'react-router-dom';
import HomePage from './HomePage';
import MenuBar from '../components/MenuBar';
import CreateAccountButton from '../components/CreateAccountButton';

configure({adapter: new Adapter()});

describe('testing home page components all render', () => {
    global.window = { location: { pathname: null } };
    let wrapper = mount(<MemoryRouter><HomePage /></MemoryRouter>);
    test('menu bar loads', () => {
        expect(wrapper.find(MenuBar)).toHaveLength(1);
    });

    test('menu bar loads', () => {
        expect(wrapper.find(CreateAccountButton)).toHaveLength(1);
    });

    test('create account button changes pages', () => {
        wrapper.find('.createAccountButton').simulate('click');
        expect(global.window.location.pathname).toEqual('/createaccount');
    });
})