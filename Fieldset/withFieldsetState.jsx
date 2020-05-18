// TODO: Type with flow
import React from 'react';
import callbacks from './callbacks';

export const withFieldsetState = (rawState, name = 'state') => {
  const namedProps = {
    state: name,
    setState: `set${name.replace(/./, x => x.toUpperCase())}`,
    validate: `validate${
      name !== 'state' ? name.replace(/./, x => x.toUpperCase()) : ''
    }`,
  };
  return Component => class extends React.Component<> {
      state = callbacks.updateFieldset(rawState);

      updateState = (partialState) => {
        this.setState(prevState => callbacks.updateFieldset(partialState, prevState));
      };

      validate = () => {
        this.setState(prevState => callbacks.validateFieldset(prevState)[0]);
      };

      render() {
        return (
          <Component
            {...{
              [namedProps.state]: this.state,
              [namedProps.setState]: this.updateState,
              [namedProps.validate]: this.validate,
            }}
            {...this.props}
          />
        );
      }
  };
};

export default withFieldsetState;
