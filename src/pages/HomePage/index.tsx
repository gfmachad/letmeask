import {useHistory} from 'react-router-dom';
import {FormEvent, useContext, useState, useEffect} from 'react';
import Switch from 'react-switch';

import illustrationImg from '../../assets/images/illustration.svg';
import grayLightLogoImg from '../../assets/images/grayLight-logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import brImg from '../../assets/images/br.svg';
import usImg from '../../assets/images/us.svg';

import {database} from '../../services/firebase';
import {useAuth} from '../../hooks/useAuth';
import {Button} from '../../components/Button';

import {LangContext} from '../../context/LangContext';

import './styles.scss';

export function HomePage() {
	const history = useHistory();
	const {user, signInWithGoogle} = useAuth();
	const [roomCode, setRoomCode] = useState('');
	const {
		state: {language},
		dispatch: {setLanguage, translate},
	} = useContext(LangContext);

	useEffect(() => {
		console.log(language);
	}, [language]);

	function handleChooseLanguage(value: string) {
		if (language == 'ptBR') {
			setLanguage('en');
		} else {
			setLanguage('ptBR');
		}
	}

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}
		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();
		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert('Room does not exists.');
			return;
		}

		if (roomRef.val().endedAt) {
			alert('Room already closed');
			return;
		}

		history.push(`/rooms/${roomCode}`);
	}

	return (
		<div id='page-auth'>
			<aside>
				<img src={illustrationImg} alt='Question and Answers Illustration' />
				<strong>{translate('home_create')}</strong>
				<p>{translate('home_audience')}</p>
				<div className='switch__container'>
					<img src={usImg} alt='BR flag' />
					<Switch
						onChange={() => {
							handleChooseLanguage('test');
						}}
						checked={language == 'ptBR' ? true : false}
						checkedIcon={false}
						onColor={'111'}
						offColor={'111'}
						uncheckedIcon={false}
						height={10}
						width={45}
						handleDiameter={10}
						offHandleColor={'4d4d4d'}
						onHandleColor={'4d4d4d'}
					/>

					<img src={brImg} alt='US flag' />
				</div>
			</aside>
			<main>
				<div className='main-content'>
					<img src={grayLightLogoImg} alt='LetMeAsk' />
					<button onClick={handleCreateRoom} className='create-room'>
						<img src={googleIconImg} alt='Google Icon' />
						{translate('home_image')}
					</button>
					<div className='separator'>{translate('home_separe')}</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type='text'
							placeholder={translate('home_pholder')}
							onChange={(event) => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type='submit'>{translate('home_btn')}</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
