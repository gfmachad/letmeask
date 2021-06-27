import React, {useReducer, FC, createContext, ReactNode} from 'react';

import en from '../i18n/en.json';
import ptBR from '../i18n/ptBR.json';

enum LangActionType {
	SET_LANGUAGE = 'SET_LANGUAGE',
}

type LangState = {
	language: string;
};

type LangStateProps = {
	children: ReactNode;
};

type SetLanguageAction = {
	type: typeof LangActionType.SET_LANGUAGE;
	payload: string;
};

type ContextProps = {
	state: LangState;
	dispatch: {
		setLanguage: (lang: string) => void;
		translate: (key: string) => string;
	};
};

const langReducer = (
	state: LangState,
	action: SetLanguageAction
): LangState => {
	switch (action.type) {
		case LangActionType.SET_LANGUAGE:
			return {
				language: action.payload,
			};
		default:
			return state;
	}
};

const localStorageLang = localStorage.getItem('language');

const initialState = {
	language: localStorageLang ? localStorageLang : 'ptBR',
};

export const LangContext = createContext({} as ContextProps);

const LangState: FC<LangStateProps> = ({children}) => {
	const [state, dispatch] = useReducer(langReducer, initialState);

	const setLanguage = (lang: string) => {
		localStorage.setItem('language', lang);
		dispatch({
			type: LangActionType.SET_LANGUAGE,
			payload: lang,
		});
	};

	const translate = (key: string): string => {
		const {language} = state;

		let langData: {[key: string]: string} = {};

		if (language === 'en') {
			langData = en;
		} else {
			langData = ptBR;
		}

		return langData[key];
	};

	return (
		<LangContext.Provider value={{state, dispatch: {setLanguage, translate}}}>
			{children}
		</LangContext.Provider>
	);
};

export default LangState;
