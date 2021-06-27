import {BrowserRouter as Router} from 'react-router-dom';

import LangState from './context/LangContext';

import Routes from './routes';

function App() {
	return (
		<>
			<LangState>
				<Router>
					<Routes />
				</Router>
			</LangState>
		</>
	);
}

export default App;
