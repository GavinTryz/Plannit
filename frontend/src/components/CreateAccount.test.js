import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateAccount from './CreateAccount';
configure({adapter: new Adapter()});

describe('testing create account', () => {
    let wrapper;
    test('test title has correct value', () => {
        wrapper = shallow(<CreateAccount />);
        expect(wrapper.find('span[id="signInName"]').text()).toEqual("Plannit Create Account");
    });

    test('test first name input', () => {
        wrapper = shallow(<CreateAccount />);

        wrapper.find('input[id="first"]').simulate('change', {target: {value: 'name'}});
        expect(wrapper.find('input[id="first"]').props().value).toEqual('name');
    });
    test('test last name input', () => {
        wrapper = shallow(<CreateAccount />);

        wrapper.find('input[id="last"]').simulate('change', {target: {value: 'last name'}});
        expect(wrapper.find('input[id="last"]').props().value).toEqual('last name');
    });
    test('test email input', () => {
        wrapper = shallow(<CreateAccount />);

        wrapper.find('input[id="email"]').simulate('change', {target: {value: 'email'}});
        expect(wrapper.find('input[id="email"]').props().value).toEqual('email');
    });
    test('test password input', () => {
        wrapper = shallow(<CreateAccount />);

        wrapper.find('input[id="password"]').simulate('change', {target: {value: 'password'}});
        expect(wrapper.find('input[id="password"]').props().value).toEqual('password');
    });
})