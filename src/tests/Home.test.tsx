import React from 'react'
import Home from '../components/Home'
import { shallow } from 'enzyme'

test('renders without crashing', () => {
  const wrapper = shallow(<Home />)
})
