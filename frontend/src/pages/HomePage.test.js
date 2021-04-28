import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {MemoryRouter} from 'react-router-dom';
import HomePage from './HomePage';
import MenuBar from '../components/MenuBar';
import CreateAccountButton from '../components/CreateAccountButton';
import Login from '../components/Login';

configure({adapter: new Adapter()});

describe('testing home page components all render', () => {
    let wrapper = mount(<MemoryRouter><HomePage /></MemoryRouter>);
    test('menu bar loads', () => {
        expect(wrapper.find(MenuBar)).toHaveLength(1);
    });

    test('Create account button loads', () => {
        expect(wrapper.find(CreateAccountButton)).toHaveLength(1);
    });

    test('create account button text displays', () => {
        expect(wrapper.find('.createAccountButton').text()).toEqual("Create free account");
    });

    test('Sign In Button exists', () => {
        expect(wrapper.find('button[id="signin"]').text()).toEqual("Sign In");
    });
})