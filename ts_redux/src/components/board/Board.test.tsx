import { mount } from 'enzyme'
import React from 'react'
import Board from './Board'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { AppState } from '../../common/types'
import { createMockState } from '../../common/testhelpers'

describe('<Board />', () => {
  it('renders a 5x5 board', () => {
    const mockStore = configureStore<AppState>()
    const store = mockStore({
      ...createMockState(),
    })

    const component = mount(
      <Provider store={store}>
        <Board />
      </Provider>,
    )
    expect(component.find('Board')).toMatchSnapshot()
  })
})
