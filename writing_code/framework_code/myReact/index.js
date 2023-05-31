import React from './myReact.js'
const App = (props)=>{
    return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      {
        id: 'title',
      },
      'Title',
    ),
    React.createElement(
      'a',
      {
        href: 'xxx',
      },
      'Jump',
    ),
    React.createElement(
      'section',
      null,
      React.createElement('p', null, 'Article'),
    ),
  )
}
  React.render(React.createElement('div',{title:'fiber'},App()), document.getElementById('root'))