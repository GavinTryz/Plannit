import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import VerifyEmailPage from './VerifyEmailPage';
import axios from 'axios';

import {BrowserRouter} from 'react-router-dom';

configure({adapter: new Adapter()});
jest.mock('axios');
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/api/verifyEmail?token=adfsadflkdsfasdf"
      })
}));

describe('testing verify email page', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve());
    let wrapper = mount(<BrowserRouter><VerifyEmailPage /></BrowserRouter>);
    test('page loads', async () => {
        expect(wrapper.find('h1').text()).toEqual("");
    });
})