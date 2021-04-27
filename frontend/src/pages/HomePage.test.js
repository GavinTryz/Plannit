import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HomePage from './HomePage';
import MenuBar from '../components/MenuBar';
import CreateAccount from '../components/CreateAccount';

configure({adapter: new Adapter()});

describe('testing home page components all render', () => {
    let wrapper = mount(<HomePage />);
    test('menu bar loads', () => {
        expect(wrapper.find(MenuBar)).toHaveLength(1);
    });

    test('menu bar loads', () => {
        expect(wrapper.find(CreateAccount)).toHaveLength(1);
    });
})