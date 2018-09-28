import React, { Component } from 'react';





class RequestCardFill extends Component {
  constructor(props) {
      super(props);
  }

  resetMode = () => {
    this.props.reset();
  }

  render() {

    return (
      <div>
          jghifhfh
        <button onClick={this.resetMode}>Reset</button>
      </div>
    )

  }
}

export default RequestCardFill;
