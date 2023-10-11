import {
	Provider,
	defaultTheme,
	Grid,
	View,
	Button
} from '@adobe/react-spectrum';




function App() {
    return (
    	<Provider theme={defaultTheme}>
			<Grid areas={[
				'header header',
				'sidebar content',
				'footer footer'
			]}
			columns = { ['1fr', '3fr'] }
			rows = { [ 'size-1000', 'auto', 'size-1000' ] }
			height = 'size-6000'
			gap = 'size-100'>
				<View backgroundColor="celery-600" gridArea="header"></View>
				<View backgroundColor="blue-600" gridArea="sidebar"></View>
				<View backgroundColor="purple-600" gridArea="content"></View>
				<View backgroundColor="magenta-600" gridArea="footer"></View>
			</Grid>

	  </Provider>
  );
}

export default App;
