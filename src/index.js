import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {
	Provider,
	defaultTheme
} from '@adobe/react-spectrum';

import './index.css';
import Toolbox from './Toolbox';
import Assign from './Assign';

import reportWebVitals from './reportWebVitals';

function App () {
	let [ toolSelected, setToolSelected ] = useState("toolbox");
	const handleToolSelected = (value) => {
		console.log(value);
		setToolSelected(value);
	}

	let rendered;

	// toolSelectedの更新によってrenderされるtoolコンポーネントを切り替える
	//
	if ( toolSelected === "toolbox" ) {
		rendered = <Toolbox handleToolSelected={handleToolSelected}/>
	} else if ( toolSelected === "assign.tool" ) {
		rendered = <Assign/>
	} else {
		rendered = <Toolbox handleToolSelected={handleToolSelected}/>
	}

	return (
    	<Provider theme={defaultTheme}>
			{rendered}
	  	</Provider>
	);

	// TODO リロードとブラウザバックのアラート処理
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	  <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
