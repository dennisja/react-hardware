/**
 * Potentiometer + LED example.
 * Insert an LED into Pin 9 and Potentiometer into 'A1' on an Arduino Uno.
 */

import {getPort} from '../port';
import ReactHardware from '../../src';
import React, {Component} from 'react';

const {Container, Led, Potentiometer} = ReactHardware;

class PotentiometerDemo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {value: 0};
    this.onChange = this.onChange.bind(this);
  }

  onChange({value}) {
    // fudge numbers with rounding for my potentiometer
    const POT_LOW = 15;
    const POT_HIGH = 960;
    value = (value - POT_LOW) / POT_HIGH * 255;
    if (value < 10) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }

    this.setState({value});
  }

  render(): ReactElement {
    return (
      <Container>
        <Potentiometer
          pin={'A3'}
          onChange={this.onChange}
        />
        <Led pin={9} mode={'PWM'} value={this.state.value} />
      </Container>
    );
  }
}

ReactHardware.render(
  <PotentiometerDemo />,
  getPort(),
  (inst) => {
    console.log('Rendered <PotentiometerDemo />');
  }
);


