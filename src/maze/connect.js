import React from 'react';
import { Consumer } from './context';

const connect = mapStateToProps => Component => {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = mapStateToProps(this.props.get());
    }

    set = (key, value) => {
      const { get, set } = this.props;
      set(key, value);
      this.setState(mapStateToProps(get()));
    };

    render = () => {
      return <Component {...this.state} set={this.set} />;
    };
  }

  const returnComponent = () => (
    <Consumer>{props => <EnhancedComponent {...props} />}</Consumer>
  );

  return returnComponent;
};

export default connect;
