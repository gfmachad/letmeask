import {FormEvent, useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import grayLightLogoImg from '../../assets/images/grayLight-logo.svg';

import {LangContext} from '../../context/LangContext';
import {useAuth} from '../../hooks/useAuth';
import {Button} from '../../components/Button';
import {database} from '../../services/firebase';

import './styles.scss';

export function NewRoom() {
	const {user} = useAuth();
	const history = useHistory();
	const {
		dispatch: {translate},
	} = useContext(LangContext);

	const [newRoom, setNewRoom] = useState('');

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();
		console.log(newRoom);

		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/admin/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id='page-auth'>
			<aside>
				<img src={illustrationImg} alt='Question and Answers Illustration' />
				<strong>{translate('newH_create')}</strong>
				<p>{translate('newH_audience')}</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={grayLightLogoImg} alt='LetMeAsk' />
					<h2>{translate('newH_createNew')}</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type='text'
							placeholder={translate('newH_pholder')}
							onChange={(event) => setNewRoom(event.target.value)}
							value={newRoom}
						/>
						<Button type='submit'>{translate('newH_btn')}</Button>
					</form>
					<p>
						{translate('newH_p')} <Link to='/'>{translate('newH_link')}</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
