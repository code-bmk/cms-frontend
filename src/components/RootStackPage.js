import React from 'react';
import { StackNavigator } from 'react-navigation';
import Display from './Display';
import DetailDisplay from './DetailDisplay';

const RootStack = StackNavigator(
	{
	  Display: {
		screen: Display,
	  },
	  DetailDisplay: {
		screen: DetailDisplay,
	  },
	},
	{
	  initialRouteName: 'Display',
	}
  );
  
export default class RootStackPage extends React.Component {
	render() {
	  return <RootStack />;
	}
}