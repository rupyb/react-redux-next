import React from 'react'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import { initStore, initialCards, addItem } from '../store';
import Main from '../components/Main';

class Index extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(initialCards());
  }

  componentDidMount () {
   
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    console.log('this.props ', this.props);
    return <Main cards={this.props.cards}/>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      initialCards: bindActionCreators(initialCards, dispatch),
      addItem: bindActionCreators(addItem, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
      cards: state.cards,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
