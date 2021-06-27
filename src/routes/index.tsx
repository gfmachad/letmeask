import {useContext} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {HomePage} from '../pages/HomePage/index';
import {NewRoom} from '../pages/NewRoom/index';
import {Room} from '../pages/Room/index';
import {AdminRoom} from '../pages/AdminRoom/index';

import {AuthContextProvider} from '../context/AuthContext';
import LangState from '../context/LangContext';

import '../styles/global.scss';

function Routes() {
	return (
		<BrowserRouter>
			<LangState>
				<AuthContextProvider>
					<Switch>
						<Route path='/' exact component={HomePage} />
						<Route path='/rooms/new' exact component={NewRoom} />
						<Route path='/rooms/:id' component={Room} />
						<Route path='/admin/rooms/:id' component={AdminRoom} />
					</Switch>
				</AuthContextProvider>
			</LangState>
		</BrowserRouter>
	);
}

export default Routes;
